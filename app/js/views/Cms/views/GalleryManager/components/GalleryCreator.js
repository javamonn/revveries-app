import React from 'react';
import cmsActions from 'actions/CmsActions';
import mui, {
  FloatingActionButton,
  Dialog,
  TextField,
  FontIcon
} from 'material-ui';

var GalleryCreator = React.createClass({
  
  render() {
    let dialogActions = [
      { text: 'Cancel' },
      { text: 'Create', onTouchTap: this._onGalleryCreate, ref: 'create' }
    ];
    return (
      <div id="gallery-creator">
        <FloatingActionButton 
          className="create-button" 
          onTouchTap={this._onDialogShow}
          style={{
            position: 'absolute',
            bottom: '24',
            right: '24',
          }}>
        <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
        <Dialog
          ref="createGalleryDialog"
          title="Create a Gallery"
          actions={dialogActions}
          actionFocus="create">
          <section className="create-content">
            <TextField 
              floatingLabelText="Title" 
              ref="titleField"
            />
            <TextField 
              floatingLabelText="Description (optional)" 
              multiline={true} 
              ref="descriptionField"
            />
          </section>
        </Dialog>
      </div>
    );
  },
  _onGalleryCreate() {
    if (this.refs.titleField.getValue()) {
      cmsActions.galleryCreated( 
        this.refs.titleField.getValue(),
        this.refs.descriptionField.getValue()
      );
      this.refs.createGalleryDialog.dismiss();
      this.refs.titleField.clearValue();
      this.refs.descriptionField.clearValue();
      this.refs.titleField.setErrorText('');
    } else {
      this.refs.titleField.setErrorText('Gallery title is required');
    }
  },
  _onDialogShow() {
    this.refs.createGalleryDialog.show();
  }
});

module.exports = GalleryCreator;
