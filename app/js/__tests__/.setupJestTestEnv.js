jest.dontMock('../stores/__mocks__/fetch');
jest.dontMock('../stores/__mocks__/aws-sdk');
jest.dontMock('babel/polyfill');
require('babel/polyfill');
fetch = require('../stores/__mocks__/fetch');
jest.setMock('aws-sdk', require('../stores/__mocks__/aws-sdk'));

