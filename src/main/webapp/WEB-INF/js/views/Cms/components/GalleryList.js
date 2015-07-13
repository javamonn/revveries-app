import React from 'react';
import Immutable  from 'immutable';
import mui from 'material-ui';

let {
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
              paddingBottom: '4'
            }}
          />
          <CardActions className="card-actions" style={{padding: '0'}}>
            <div className="actions-container">
              <div className="left-actions">
                <FlatButton 
                  label="0 images"
                  disabled={true}>
                </FlatButton>
              </div>
              <div className="right-actions">
                <IconButton tooltip="Move Up" tooltipPosition="top-center" onTouchTap={this._onMoveUp(i)}>
                  <FontIcon className="material-icons">keyboard_arrow_up</FontIcon> 
                </IconButton>
                <IconButton tooltip="Move Down" tooltipPosition="top-center" onTouchTap={this._onMoveDown(i)}>
                  <FontIcon className="material-icons">keyboard_arrow_down</FontIcon> 
                </IconButton>
                <IconButton tooltip="Delete" tooltipPosition="top-center" onTouchTap={this._onDelete(i)}>
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

  },

  _onMoveDown(galleryIndex) {

  },

  _onDelete(galleryIndex) {

  }
});

module.exports = GalleryList;
