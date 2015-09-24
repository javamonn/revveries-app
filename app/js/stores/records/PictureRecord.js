import { Record } from 'immutable'

var Picture = Record({
  // Integer, ID of picture record in DB
  pictureId: undefined,
  // String, title of picture (optional)
  title: undefined,
  // String, description of picture (optional)
  description: undefined,
  // URI, image url in S3
  url: undefined,
  // Integer, ID of the gallery this picture belongs to
  galleryId: undefined,
  // Integer, 0 indexed, representing the order of this image in the gallery
  pictureOrder: undefined,
  // Integer, natural width of the image
  width: undefined,
  // Integer, natural height of the image
  height: undefined
})

module.exports = Picture
