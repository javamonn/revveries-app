import React from 'react'
import cmsActions from 'actions/CmsActions';
import mui, {
  FloatingActionButton,
  Dialog,
  TextField,
  FontIcon
} from 'material-ui';

var GalleryDialog = React.createClass({
  getInitialState () {
    return {
      galleryId: '',
      context: ''
    }
  },

  display (context, gallery) {
    if (context === 'edit') {
      this.setState({
        galleryId: gallery.galleryId
      })
    }
    this.refs.createGalleryDialog.show()
    this.setState({ context }, () => {
      if (context === 'edit') {
        // Have to delay this setter as the fields need time to
        // mount in order to build the ref.
        this.refs.titleField.setValue(gallery.name)
        if (gallery.description) {
          this.refs.descriptionField.setValue(gallery.description)
        }
      }
    })
  },

  _onGallerySubmit () {
    if (this.refs.titleField.getValue()) {
      if (this.state.context === 'create') {
        cmsActions.galleryCreated(
          this.refs.titleField.getValue(),
          this.refs.descriptionField.getValue()
        );
      } else {
        cmsActions.galleryEdited(
          this.state.galleryId,
          this.refs.titleField.getValue(),
          this.refs.descriptionField.getValue()
        )
      }
      this.refs.createGalleryDialog.dismiss();
      this.refs.titleField.clearValue();
      this.refs.descriptionField.clearValue();
      this.refs.titleField.setErrorText('');
    } else {
      this.refs.titleField.setErrorText('Gallery title is required');
    }
  },

  render () {
    let dialogActions = [
      { text: 'Cancel' },
      {
        text: this.state.context === 'create' ? 'Create' : 'Update',
        onTouchTap: this._onGallerySubmit,
        ref: 'submit'
      }
    ];
    return (
      <Dialog
        ref="createGalleryDialog"
        title={`${this.state.context === 'create' ? 'Create' : 'Edit'} a Gallery`}
        actions={dialogActions}
        actionFocus="submit">
        <section className="create-content">
          <TextField
            floatingLabelText="Title"
            ref="titleField"
            style={styles.textField}
          />
          <TextField
            floatingLabelText="Description (optional)"
            multiLine={true}
            ref="descriptionField"
            style={styles.textField}
          />
        </section>
      </Dialog>
    );
  }
})

var styles = {
  textField: {
    width: 356
  }
}

export default GalleryDialog
