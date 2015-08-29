jest.dontMock('../PictureStore');

import Reflux from 'reflux';
import { List } from 'immutable';
import Picture from '../records/PictureRecord';

// TODO: figure out how to mock aws-sdk
xdescribe('PictureStore', () => {
  const PictureStore = require('../PictureStore');

  xdescribe('.getInitialState', () => {
    it('returns an immutable list of pictures', () => {
      PictureStore.getInitialState().then(val => {
        return val.forEach(picture => {
          expect(picture instanceof Picture).toBe(true);
        });
      });
    });
  });

  xdescribe('.onPictureCreated', () => {
    var pictures = [];
    var pictureFile = {};
    var picturesTitle = 'Test Picture Title';
    var picturesDescription = 'Test Picture Description';

    var picturePromise;
    PictureStore.listen(_pictures => pictures = _pictures);
    PictureStore.getInitialState(1).then(() => {
      picturePromise = PictureStore.oGalleryCreate(pictureFile, pictureTitle, pictureDescription)
    });

    it('assigns the correct picture order', () => {
      picturePromise.then(() => expect(pictures.last().pictureOrder).toBe(pictures.size() - 1));
    });

    it('assigns the correct picture title', () => {
      picturePromise.then(() => expect(pictures.last().name).toBe(pictureTitle));
    });

    it('assigns the correct picture description', () => {
      picturePromise.then(() => expect(pictures.last().description).toBe(pictureDescription));
    });
  });
});
