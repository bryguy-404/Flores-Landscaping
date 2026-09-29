import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';

const config = yaml.load(fs.readFileSync('.pages.yml', 'utf8'));
const contentRoot = path.resolve('src/content');
const knownTokens = new Set(['businessName', 'phone', 'secondaryPhone', 'email', 'experienceYears', 'city', 'state', 'communities', 'cityUpper', 'areaDots', 'communitiesAmp']);
const names = new Set(), paths = new Set(), photos = new Set();
let fieldCount = 0;
function checkFields(fields, value, location) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${location}: expected a fixed object`);
  assert.deepEqual(Object.keys(value).sort(), fields.map(field => field.name).sort(), `${location}: content fields differ from the CMS schema`);
  for (const field of fields) {
    assert(!field.list && !['block', 'code', 'rich-text'].includes(field.type), `${location}: layout/code editing is not allowed`);
    const definition = field.component ? { ...config.components[field.component], ...field } : field;
    const child = value[field.name], label = `${location}.${field.name}`;
    if (definition.type === 'object') { checkFields(definition.fields, child, label); continue; }
    fieldCount++;
    assert.equal(typeof child, 'string', `${label}: expected text`);
    if (definition.required) assert(child.trim(), `${label}: required field is empty`);
    if (definition.pattern && child) {
      const pattern = typeof definition.pattern === 'string' ? definition.pattern : definition.pattern.regex;
      assert(new RegExp(pattern).test(child), `${label}: invalid value`);
    }
    for (const [,token] of child.matchAll(/\{\{([^}]+)\}\}/g)) assert(knownTokens.has(token), `${label}: unknown shared detail ${token}`);
    if (definition.type === 'image') {
      assert(/^\/src\/assets\/[\w./-]+\.(jpg|jpeg|png|webp|avif)$/i.test(child) && !child.includes('..'), `${label}: select a local website photo`);
      assert(fs.existsSync(child.slice(1)), `${label}: image is missing: ${child}`);
      photos.add(child);
    }
  }
}
function checkEntries(entries) {
  for (const entry of entries) {
    assert(!names.has(entry.name), `Duplicate CMS entry ${entry.name}`); names.add(entry.name);
    if (entry.type === 'group') { checkEntries(entry.items); continue; }
    assert.equal(entry.type, 'file', 'Only fixed files may be edited');
    assert.deepEqual(entry.operations, { create: false, rename: false, delete: false }, `${entry.name}: content operations must stay disabled`);
    assert(entry.fields?.length, `${entry.name}: raw file editors are not allowed`);
    assert(path.resolve(entry.path).startsWith(contentRoot + path.sep), `${entry.name}: must stay inside src/content`);
    assert(!paths.has(entry.path), `Duplicate content file ${entry.path}`); paths.add(entry.path);
    checkFields(entry.fields, JSON.parse(fs.readFileSync(entry.path, 'utf8')), entry.path);
  }
}
checkEntries(config.content);
const actual = fs.readdirSync('src/content', { recursive: true }).filter(file => file.endsWith('.json')).map(file => 'src/content/' + file).sort();
assert.deepEqual([...paths].sort(), actual, 'Every content file must have an editor');
assert.equal(config.settings.hide, true, 'Settings must remain hidden');
assert.equal(config.settings.content.merge, true, 'Preserve unmanaged content keys on CMS saves');
assert.equal(config.media[0].input, 'src/assets');
assert.equal(config.media[0].output, '/src/assets');
console.log(`CMS content valid: ${paths.size} fixed files, ${fieldCount} text/image fields, ${photos.size} existing photo assets.`);
