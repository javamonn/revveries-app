import Reflux from 'reflux';

var PictureActions = Reflux.createActions([
  'pictureCreated',
  'pictureMoved',
  'pictureDeleted'
]);

module.exports = PictureActions;
