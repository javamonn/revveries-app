import React from 'react';
import Immutable  from 'immutable';
import { Navigation } from 'react-router';
import CmsActions from 'actions/CmsActions';
import StateActions from 'actions/StateActions';
import GalleryRecord from 'stores/records/GalleryRecord';
import mui, {
  Card,
  CardTitle,
  CardActions,
  IconButton,
  FontIcon,
  FlatButton,
} from 'material-ui';

var GalleryCard = React.createClass({
  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Navigation
  ],

  propTypes: {
    gallery: React.PropTypes.instanceOf(GalleryRecord).isRequired,
    galleryIndex: React.PropTypes.number,
    galleryCount: React.PropTypes.number
  },

  _onMoveUp() {
    if (this.props.galleryIndex > 0) {
      CmsActions.galleryMoved(this.props.galleryIndex, this.props.galleryIndex - 1);
    }
  },

  _onMoveDown() {
    if (this.props.galleryIndex < this.props.galleryCount - 1) {
      CmsActions.galleryMoved(this.props.galleryIndex, this.props.galleryIndex + 1);
    }
  },

  _onDelete() {
    CmsActions.galleryDeleted(this.props.galleryIndex);
  },

  _onTransition() {
    this.transitionTo('pictures', {galleryId: this.props.gallery.galleryId});
    StateActions.transitionToPictures(this.props.gallery.name);
  },

  render() {
    return (
      <Card className="gallery-card">
        <CardTitle 
          title={this.props.gallery.name} 
          subtitle={this.props.gallery.description} 
          style={{
            paddingBottom: '4',
            paddingTop: '6'
          }}
          onTouchTap={this._onTransition}
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
                className={this.props.galleryIndex == 0 ? 'hidden-button' : ''}
                tooltip="Move Up" 
                tooltipPosition="top-center" 
                onTouchTap={this._onMoveUp}
                style={{paddingLeft: '6', paddingRight: '6'}}>
                  <FontIcon className="material-icons">keyboard_arrow_up</FontIcon> 
              </IconButton>
              <IconButton 
                className={this.props.galleryIndex == this.props.galleryCount - 1 ? 'hidden-button' : ''}
                tooltip="Move Down" 
                tooltipPosition="top-center" 
                onTouchTap={this._onMoveDown}
                style={{paddingLeft: '6', paddingRight: '6'}}>
                  <FontIcon className="material-icons">keyboard_arrow_down</FontIcon> 
              </IconButton>
              <IconButton 
                tooltip="Delete" 
                tooltipPosition="top-center" 
                onTouchTap={this._onDelete}
                style={{paddingLeft: '6', paddingRight: '6'}}>
                  <FontIcon className="material-icons">delete</FontIcon> 
              </IconButton>
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
});

module.exports = GalleryCard;
