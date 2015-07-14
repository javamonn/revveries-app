import Reflux from 'reflux';

var CmsActions = Reflux.createActions([
  "pictureCreated",
  "pictureEdited",
  "pictureDeleted",
  "galleryCreated",
  "galleryEdited",
  "galleryDeleted",
  "galleryMoved"
]);

module.exports = CmsActions;
