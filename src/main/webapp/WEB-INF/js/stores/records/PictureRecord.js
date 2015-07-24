import Record from 'immutable';

var Picture = Record({
  // Integer ID of picture record in DB 
  pictureId: undefined,
  // String title of picture (optional)
  title: undefined,
  // String description of picture (optional)
  description: undefined,
  // URI of image in S3
  url: undefined,
  // Integer ID of the gallery this picture belongs to
  galleryId: undefined,
  // Integer, 0 indexed, representing the order of this image in the gallery
  pictureOrder: undefined
});

module.exports = Picture;
