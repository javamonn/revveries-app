import { Record, List } from 'immutable';

var Gallery = Record({
  // id of gallery in db
  galleryId: undefined,
  // position of gallery in sidenav
  galleryOrder: undefined,
  // name of gallery
  name: undefined,
  // description of gallery
  description: undefined,
  // list of picture records contained in this gallery
  pictures: List([])
});

module.exports = Gallery
