import Reflux from 'reflux';

var CmsActions = Reflux.createActions([
  "galleryCreated",
  "galleryEdited",
  "galleryDeleted",
  "galleryMoved"
]);

module.exports = CmsActions;
