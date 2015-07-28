import React from 'react';
import Immutable  from 'immutable';
import PictureActions from 'actions/PictureActions';
import mui, {
  FloatingActionButton,
  Dialog,
  TextField,
  FontIcon,
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  IconButton
} from 'material-ui';


var PictureCreator = React.createClass({
  render() {
    let fileInputStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: '0',
      left: '0',
      width: '100%',
      opacity: '0'
    };
    let dialogActions = [
      { text: 'Cancel' },
      { text: 'Create', onTouchTap: this._onPictureCreate, ref: 'create' }
    ];
    var flash;
    if (this.state.flash) {
      flash = (
        <Toolbar className="flash" style={{backgroundColor: (this.state.flash.state) == 'error' ? '#f44336': '#00bcd4' }}>
          <ToolbarGroup float="left">
            <ToolbarTitle text={this.state.flash.message}  style={{fontSize: '14', color: '#FFF'}}/>
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton iconClassName='material-icons' iconStyle={{color: '#FFF'}}>highlight_off</IconButton>
          </ToolbarGroup>
        </Toolbar>
      );
    }
    return (
      <div id='picture-creator'>
        <FloatingActionButton 
          className='create-button'
          onTouchTap={this._onDialogShow}
          style={{
            position: 'absolute',
            bottom: '24',
            right: '24',
          }}>
        <FontIcon className='material-icons'>add</FontIcon>
        </FloatingActionButton>
        <Dialog
          ref='createPictureDialog'
          title='Upload a Picture'
          actions={dialogActions}
          actionFocus="create">
          {flash}
          <section className="create-content">
            <RaisedButton
              secondary={true}
              label='Choose an Image'>
              <input ref='pictureField' type='file' style={fileInputStyle}></input>
            </RaisedButton>
            <TextField 
              floatingLabelText='Title (optional)'
              ref='titleField'
            />
            <TextField 
              floatingLabelText='Description (optional)'
              multiline={true} 
              ref='descriptionField'
            />
          </section>
        </Dialog>
      </div>
    );
  },

  getInitialState() {
    return {
      flash: null
    };
  },
  _onPictureCreate() {
    if (!this.refs.pictureField.value) {
      this.setState({
        flash: {
          message: 'You must select an image to upload',
          state: 'error'
        }
      });
      return;
    }
    PictureActions.pictureCreated(
      this.refs.pictureField.value,
      this.refs.titleField.getValue(),
      this.refs.descriptionField.getValue()
    );
    this.refs.titleField.clearValue();
    this.refs.descriptionField.clearValue();
    this.refs.pictureField.value = null;
  },
  _onDialogShow() {
    this.refs.createPictureDialog.show();
  }
});

module.exports = PictureCreator;
