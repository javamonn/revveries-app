import { Record } from 'immutable';

var Gallery = Record({
  // id of gallery in db
  gallery_id: undefined,
  // position of gallery in sidenav
  order: undefined,
  // name of gallery
  name: undefined,
  // description of gallery
  description: undefined,
  // list of picture records contained in this gallery
  pictures: undefined
});

module.exports = Gallery
