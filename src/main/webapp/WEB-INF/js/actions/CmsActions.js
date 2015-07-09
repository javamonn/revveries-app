import Reflux from 'reflux';

var CmsActions = Reflux.createActions([
  "pictureCreated",
  "pictureEdited",
  "pictureDeleted",
  "galleryCreated",
  "galleryEdited",
  "galleryDeleted"
]);

module.exports = CmsActions;
