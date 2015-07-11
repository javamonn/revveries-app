// Setup global mock for fetch polyfill.
jest.dontMock('../stores/__mocks__/fetch');
fetch = require('../stores/__mocks__/fetch');
