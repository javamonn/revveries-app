import React from 'react';
import mui from 'material-ui';

const FloatingActionButton = mui.FloatingActionButton;
const Dialog = mui.Dialog;


var GalleryCreator = React.createClass({
  
  render() {
    let dialogActions = [
      { text: 'Cancel' },
      { text: 'Create', onTouchTap: this._onGalleryCreate, ref: 'create' }
    ];
    return (
      <div>
        <FloatingActionButton 
          className="create-button" 
          iconClassName="fa fa-plus" 
          onTouchTap={this._onDialogShow}>
        </FloatingActionButton>
        <Dialog
          ref="createGalleryDialog"
          title="Create a Gallery"
          actions={dialogActions}
          actionFocus="create">
          test
        </Dialog>
      </div>
    )
  },
  _onGalleryCreate() {
    console.log('on gallery Create');
  },
  _onDialogShow() {
    console.log('show');
    this.refs.createGalleryDialog.show();
  }
});

module.exports = GalleryCreator;
