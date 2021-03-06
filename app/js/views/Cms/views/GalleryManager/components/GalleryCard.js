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
    this.props.onDelete(this.props.galleryIndex);
  },

  _onEdit() {
    this.props.onEdit();
  },

  _onTransition() {
    this.transitionTo('pictures', { galleryId: this.props.gallery.galleryId });
    StateActions.transitionToPictures(this.props.gallery.name);
  },

  render() {
    var imageLabel = this.props.gallery.get('pictures').size === 1
      ? '1 image'
      : `${this.props.gallery.get('pictures').size} images`

    var visibilityLabel
    if (this.props.gallery.get('name') === 'Landing') {
      visibilityLabel = 'Landing image'
    } else if (this.props.gallery.get('name') === 'About') {
      visibilityLabel = 'About page'
    } else {
      visibilityLabel = 'Gallery'
    }

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
                label={imageLabel}
                disabled
              />
              <FlatButton
                label={visibilityLabel}
                disabled
              />
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
                tooltip="Edit"
                tooltipPosition="top-center"
                onTouchTap={this._onEdit}
                style={{paddingLeft: '6', paddingRight: '6'}}>
                <FontIcon className="material-icons">mode_edit</FontIcon>
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
