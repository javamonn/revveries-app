jest.dontMock('../CmsStore');

import Reflux from 'reflux';
import { List } from 'immutable';

const Gallery = require('../records/GalleryRecord');

describe('CmsStore', () => {
  const CmsStore = require('../CmsStore');
  
  describe('.getInitialState', () => {
    it('returns an immutable list of galleries', () => {
      CmsStore.getInitialState().forEach(gal => {
        expect(gal instanceof Gallery).toBe(true);
      });
    });
  });
});
