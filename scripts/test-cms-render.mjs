// Exercises every editable field through the production build, then restores all files.
// Run with no concurrent content edits: npm run test:cms
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';
const config = yaml.load(fs.readFileSync('.pages.yml','utf8'));
const originals = new Map(), probes = [], imageSlots = [];
const photoPath = 'src/assets/cms-verification.jpg';
assert(!fs.existsSync(photoPath), 'Temporary verification filename already exists');
const entries = items => items.flatMap(item => item.type === 'group' ? entries(item.items) : [item]);
let serial=0;
function modify(fields, value, location) {
  for (const field of fields) {
    const f = field.component ? {...config.components[field.component], ...field} : field;
    const key = field.name, fieldPath = `${location}.${key}`;
    if (f.type === 'object') { modify(f.fields, value[key], fieldPath); continue; }
    if (f.type === 'image') { value[key] = '/'+photoPath; imageSlots.push(fieldPath); continue; }
    if (key === 'position') { value[key] = '25% 35%'; continue; }
    if (key === 'mobilePosition') { value[key] = '75% 65%'; continue; }
    const marker=`CMSPROBE${++serial}END`;
    value[key] = f.pattern ? `/contact/?probe=${marker}#estimate` : `${value[key]} ${marker}`.trim();
    probes.push({marker, fieldPath});
  }
}
const html = () => fs.readdirSync('dist',{recursive:true}).filter(p=>p.endsWith('.html')).map(p=>fs.readFileSync('dist/'+p,'utf8')).join('\n');
const build = () => execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
let result;
try {
  fs.copyFileSync('src/assets/client/home-lawn-care.jpg',photoPath);
  for (const entry of entries(config.content)) {
    const source=fs.readFileSync(entry.path,'utf8'); originals.set(entry.path,source);
    if(entry.name==='business')continue;
    const value=JSON.parse(source);modify(entry.fields,value,entry.path);fs.writeFileSync(entry.path,JSON.stringify(value,null,2)+'\n');
  }
  execFileSync(process.execPath,['scripts/validate-cms.mjs'],{stdio:'pipe'});
  build();
  const output=html();
  const missing=probes.filter(p=>!output.includes(p.marker));
  assert.deepEqual(missing,[], 'Every editable text, link and alt field must reach the rendered HTML');
  const renderedPhotos = [...output.matchAll(/<img\b[^>]*data-cms-image[^>]*>/g)].map(match => match[0]);
  assert(renderedPhotos.length >= imageSlots.length, 'Every photo slot must render');
  // Vite deduplicates identical uploaded bytes, so it may retain the source filename.
  for (const img of renderedPhotos) assert(/src="[^"]*(cms-verification|home-lawn-care)[^"]*\.webp"/.test(img), 'Every displayed photo must use the replacement image');
  assert(output.includes('--cms-position:25% 35%')&&output.includes('--cms-mobile-position:75% 65%'), 'Both crop settings must reach image styles');
  assert(!output.includes('src="/src/assets/'), 'Original asset paths must not leak into rendered img sources');
  // Restore page fields before testing shared details independently.
  for(const [file,source]of originals)fs.writeFileSync(file,source);
  const businessPath='src/content/business.json',business=JSON.parse(originals.get(businessPath));
  business.primaryPhone='(555) 010-1000';business.secondaryPhone='(555) 010-2000';business.email='cms-verification@example.invalid';business.hours='CMS verification hours';business.communities.item2='CMS verification town';
  fs.writeFileSync(businessPath,JSON.stringify(business,null,2)+'\n');build();
  for(const route of ['index.html','about/index.html','services/index.html','contact/index.html','our-work/index.html',...fs.readdirSync('src/content/services').map(s=>'services/'+s.replace('.json','')+'/index.html')]){
    const page=fs.readFileSync('dist/'+route,'utf8');
    for(const expected of ['tel:+15550101000','(555) 010-1000','cms-verification@example.invalid','CMS verification hours'])assert(page.includes(expected),`${route}: missing shared ${expected}`);
  }
  assert(html().includes('CMS verification town'),'Service area must update');
  result=`Passed: ${probes.length} editable text/link/alt fields reached rendered HTML; ${imageSlots.length} photo slots accepted an uploaded replacement; desktop/mobile crops and shared business details updated.`;
} finally {
  for(const [file,source] of originals)fs.writeFileSync(file,source);
  if(fs.existsSync(photoPath))fs.unlinkSync(photoPath);
  build();
  assert(!html().includes('CMSPROBE'),'Test markers remain in the restored build');
}
console.log(result);
console.log('All original content and the production build restored.');
