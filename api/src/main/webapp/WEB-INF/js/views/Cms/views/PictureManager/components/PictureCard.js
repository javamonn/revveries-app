import React from 'react';
import Immutable  from 'immutable';
import PictureActions from 'actions/PictureActions';
import PictureRecord from 'stores/records/PictureRecord';
import mui, {
  Card,
  CardTitle,
  CardActions,
  CardMedia,
  IconButton,
  FontIcon,
  FlatButton,
} from 'material-ui';

var PictureCard = React.createClass({
  mixins: [
    require('react/addons').addons.PureRenderMixin
  ],

  propTypes: {
    picture: React.PropTypes.instanceOf(PictureRecord).isRequired,
    pictureIndex: React.PropTypes.number,
    pictureCount: React.PropTypes.number
  },

  _onMoveUp() {
    if (this.props.pictureIndex > 0) {
      PictureActions.pictureMoved(this.props.pictureIndex, this.props.pictureIndex - 1);
    }
  },

  _onMoveDown() {
    if (this.props.pictureIndex < this.props.pictureCount - 1) {
      PictureActions.pictureMoved(this.props.pictureIndex, this.props.pictureIndex + 1);
    }
  },

  _onDelete() {
    PictureActions.pictureDeleted(this.props.pictureIndex);
  },

  render() {
    var cardTitle;
    if (this.props.picture.title || this.props.picture.description) {
      cardTitle = (
        <CardTitle 
          title={this.props.gallery.name} 
          subtitle={this.props.gallery.description} 
          style={{
            paddingBottom: '4',
            paddingTop: '6'
          }}
        />
      );
    }
    return ( 
      <Card className="picture-card">
        {cardTitle}
        <CardMedia className="media-container">
          <img src={this.props.picture.url} />
        </CardMedia>
        <CardActions className="card-actions">
          <div className="actions-container">
              <IconButton 
                className={this.props.pictureIndex == 0 ? 'hidden-button' : ''}
                tooltip="Move Up" 
                tooltipPosition="top-center" 
                onTouchTap={this._onMoveUp}
                style={{paddingLeft: '6', paddingRight: '6'}}>
                  <FontIcon className="material-icons">keyboard_arrow_up</FontIcon> 
              </IconButton>
              <IconButton 
                className={this.props.pictureIndex == this.props.pictureCount - 1 ? 'hidden-button' : ''}
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
        </CardActions>
      </Card>
    );
  }
});

module.exports = PictureCard
