import lawn7804 from '../assets/video-posters/project-7804.jpg';
import lawn5880 from '../assets/video-posters/project-5880.jpg';
import cleanup6622 from '../assets/video-posters/project-6622.jpg';
import snow6879 from '../assets/video-posters/project-6879.jpg';
import lawn7712 from '../assets/video-posters/project-7712.jpg';
import lawn7713 from '../assets/video-posters/project-7713.jpg';
import lawn5903 from '../assets/video-posters/project-5903.jpg';
import leaves6618 from '../assets/video-posters/project-6618.jpg';

export const workVideos = [
  { id: '7804', title: 'A fresh-cut perspective.', category: 'Lawn care', duration: '0:07', poster: lawn7804, description: 'A sweep across a freshly striped lawn, with homes and mature trees in the background.' },
  { id: '5880', title: 'Care in every direction.', category: 'Lawn care', duration: '0:07', poster: lawn5880, description: 'Crossing mowing stripes frame a green backyard bordered by trees and a wooden fence.' },
  { id: '6622', title: 'Room to enjoy fall.', category: 'Fall cleanup', duration: '0:02', poster: cleanup6622, description: 'A look around the lawn and walkway after fallen leaves have been cleared.' },
  { id: '6879', title: 'Here through the seasons.', category: 'Snow plowing', duration: '0:11', poster: snow6879, description: 'A winter look at a snowy lot, with a plow truck moving between parked trailers.' },
  { id: '7712', title: 'A lawn worth a closer look.', category: 'Lawn care', duration: '0:08', poster: lawn7712, description: 'Even mowing stripes stretch across an open lawn toward a white fence and a line of trees.' },
  { id: '7713', title: 'From corner to corner.', category: 'Lawn care', duration: '0:06', poster: lawn7713, description: 'A walk alongside a home shows fresh mowing stripes beside shrubs and a raised deck.' },
  { id: '5903', title: 'Your own stretch of green.', category: 'Lawn care', duration: '0:04', poster: lawn5903, description: 'A short view across a mowed backyard bordered by neighboring homes and a wooden fence.' },
  { id: '6618', title: 'Before the cleanup.', category: 'Fall cleanup · Before', duration: '0:03', poster: leaves6618, description: 'Fallen leaves cover the backyard around a mature tree before the fall cleanup.' },
].map(video => ({ ...video, src: `/videos/project-${video.id}.mp4` }));
