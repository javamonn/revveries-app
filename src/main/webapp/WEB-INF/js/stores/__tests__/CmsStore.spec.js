jest.dontMock('../CmsStore');

import Reflux from 'reflux';
import { List } from 'immutable';

const Gallery = require('../records/GalleryRecord');

describe('CmsStore', () => {
  const CmsStore = require('../CmsStore');
  
  describe('.getInitialState', () => {
    it('returns an immutable list of galleries', () => {
      CmsStore.getInitialState().then(val => {
        return val.forEach(gal => {
          expect(gal instanceof Gallery).toBe(true);
        });
      });
    });
  });

  describe('.onGalleryCreated', () => {
    var galleries = [];
    var galleryTitle = 'Test Gallery Title';
    var galleryDescription = 'Test Gallery Description';

    CmsStore.listen(_galleries => galleries = _galleries);

    it('creates a gallery', () => {
      var lengthBefore = galleries.size;
      CmsStore.onGalleryCreated(galleryTitle, galleryDescription)
        .then(() => {
          expect(galleries.size).toBeGreaterThan(lengthBefore);
        });
    });

    it('assigns the correct gallery order', () => {
      CmsStore.onGalleryCreated(galleryTitle, galleryDescription)
        .then(() => {
          expect(galleries.last().galleryOrder).toBe(galleries.size() - 1)
        });
    });

    it('assigns the correct gallery title', () => {
      CmsStore.onGalleryCreated(galleryTitle, galleryDescription)
        .then(() => {
          expect(galleries.last().name).toBe(galleryTitle);
        });
    });

    it('assigns the correct gallery description', () => {
      CmsStore.onGalleryCreated(galleryTitle, galleryDescription)
        .then(() => {
          expect(galleries.last().description).toBe(galleryDescription);
        });
    });
  });
});
