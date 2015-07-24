import Reflux from 'reflux';
import { List } from 'immutable';

const PictureActions = require('../actions/PictureActions');
const Picture = require('./records/PictureRecord');

var _pictures = List([]);
