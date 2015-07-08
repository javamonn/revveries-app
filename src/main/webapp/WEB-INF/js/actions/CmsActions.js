import Reflux from 'reflux';

var PictureActions = Reflux.createActions([
  "pictureCreated",
  "pictureEdited",
  "pictureDeleted"
]);

module.exports = PictureActions
