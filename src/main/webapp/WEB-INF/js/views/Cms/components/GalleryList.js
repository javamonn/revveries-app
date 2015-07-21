import React from 'react';
import Immutable  from 'immutable';
import mui from 'material-ui';

const CmsActions = require('actions/CmsActions');

const {
  Card,
  CardTitle,
  CardActions,
  IconButton,
  FontIcon,
  FlatButton
} = mui;

var GalleryList = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin
  ],

  propTypes: {
    galleries: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  render() {
    var cardList = this.props.galleries.map((gallery, i) => {
      return (
        <Card className="gallery-card">
          <CardTitle 
            title={gallery.name} 
            subtitle={gallery.description} 
            style={{
              paddingBottom: '4',
              paddingTop: '6'
            }}
          />
          <CardActions className="card-actions">
            <div className="actions-container">
              <div className="left-actions">
                <FlatButton 
                  label="0 images"
                  disabled={true}>
                </FlatButton>
              </div>
              <div className="right-actions">
                <IconButton 
                  tooltip="Move Up" 
                  tooltipPosition="top-center" 
                  onTouchTap={this._onMoveUp.bind(this, i)}
                  style={{paddingLeft: '6', paddingRight: '6'}}>
                    <FontIcon className="material-icons">keyboard_arrow_up</FontIcon> 
                </IconButton>
                <IconButton 
                  tooltip="Move Down" 
                  tooltipPosition="top-center" 
                  onTouchTap={this._onMoveDown.bind(this, i)}
                  style={{paddingLeft: '6', paddingRight: '6'}}>
                    <FontIcon className="material-icons">keyboard_arrow_down</FontIcon> 
                </IconButton>
                <IconButton 
                  tooltip="Delete" 
                  tooltipPosition="top-center" 
                  style={{paddingLeft: '6', paddingRight: '6'}}>
                    <FontIcon className="material-icons">delete</FontIcon> 
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
      );
    });

    return (
      <div id="gallery-list">
        {cardList} 
      </div>
    );
  },

  _onMoveUp(galleryIndex) {
    if (galleryIndex > 0) {
      CmsActions.galleryMoved(galleryIndex, galleryIndex - 1);
    }
  },

  _onMoveDown(galleryIndex) {
    if (galleryIndex < this.props.galleries.size - 1) {
      CmsActions.galleryMoved(galleryIndex, galleryIndex + 1);
    }
  },

  _onDelete(galleryIndex) {

  }
});

module.exports = GalleryList;
