jest.dontMock('../CmsStore');
jest.dontMock('../__mocks__/fetch');

fetch = require('../__mocks__/fetch');

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

  describe('.onGalleryMoved', () => {
    CmsStore.listen(_galleries => galleries = _galleries);
    var galleries = [];
    var galleryTitle = 'Test Gallery Title';
    var galleryDescription = 'Test Gallery Description';

    var movePromise = CmsStore
      .onGalleryCreated(galleryTitle + ' 1', galleryDescription + ' 1')
      .then(() => CmsStore.onGalleryCreated(galleryTitle + ' 2', galleryDescription + ' 2'))
      .then(() => CmsStore.onGalleryMoved(0, 1));

    it('moves the gallery at oldIndex to newIndex', () => {
        movePromise.then(() => {
          expect(galleries.get(1).galleryId).toBe(1);
        });
    });

    it('moves the gallery at newIndex to oldIndex', () => {
        movePromise.then(() => {
          expect(galleries.get(0).galleryId).toBe(2);
        })
    });

  });
});
