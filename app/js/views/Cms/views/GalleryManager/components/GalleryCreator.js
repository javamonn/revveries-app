import React, { PropTypes } from 'react';
import cmsActions from 'actions/CmsActions';
import mui, {
  FloatingActionButton,
  FontIcon
} from 'material-ui';

var GalleryCreator = React.createClass({

  propTypes: {
    onCreate: PropTypes.func.isRequired
  },

  render() {
    return (
      <div id="gallery-creator">
        <FloatingActionButton
          className="create-button"
          onTouchTap={() => this.props.onCreate()}
          style={{
            position: 'absolute',
            bottom: '24',
            right: '24',
          }}>
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
});

module.exports = GalleryCreator;
