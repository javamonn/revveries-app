jest.dontMock('../stores/__mocks__/fetch');
jest.dontMock('babel/polyfill');
require('babel/polyfill');
fetch = require('../stores/__mocks__/fetch');

