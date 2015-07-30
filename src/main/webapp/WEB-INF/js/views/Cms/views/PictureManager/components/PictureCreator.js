import React from 'react';
import Immutable  from 'immutable';
import PictureActions from 'actions/PictureActions';
import AWS from 'aws-sdk';
import cuid from 'cuid';
import env from '.config';
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
      { text: 'Cancel', onTouchTap: this._clearDialog },
      { text: 'Create', onTouchTap: this._onPictureCreate, ref: 'create' }
    ];
    var flash, imagePreview;
    if (this.state.flash) {
      flash = (
        <Toolbar className="flash" style={{backgroundColor: (this.state.flash.state) == 'error' ? '#f44336': '#00bcd4' }}>
          <ToolbarGroup float="left">
            <ToolbarTitle 
              text={this.state.flash.message}  
              style={{fontSize: '14', color: '#FFF'}}
            />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton 
              iconClassName='material-icons' 
              iconStyle={{color: '#FFF'}}
              onTouchTap={this._onHideFlash}>
                highlight_off
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      );
    }
    if (this.state.imageSelected) {
      imagePreview = (
        <div className="image-preview">
          <img src={this.state.imageSelected} />
          <IconButton 
            className="remove-preview" 
            iconClassName="material-icons"
            iconStyle={{color: '#FFF'}}
            onTouchTap={this._onRemovePreview}>
              highlight_off
          </IconButton>
        </div>
      );
    } else {
      imagePreview = (
        <div className="empty-image-preview">
          <RaisedButton
            secondary={true}
            label={this.state.imageSelected ? 'Choose New Image' : 'Choose an Image'}>
            <input 
              ref='pictureField' 
              type='file' 
              onChange={this._onFileSelect}
              style={fileInputStyle} />
          </RaisedButton>
        </div>
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
          actionFocus="create"
          autoScrollBodyContent={true}>
          {flash}
          <section className="create-content">
            {imagePreview}
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
    AWS.config.region = env.AWS_REGION
    AWS.config.update({
      accessKeyId: env.AWS_AKID,
      secretAccessKey: env.AWS_SK
    });
    return {
      flash: null,
      S3: new AWS.S3()
    };
  },

  _onFileSelect(e) {
    var file = e.target.files[0];
    if (file.type.includes('image')) {
      this._onHideFlash();
      this.setState({
        imageSelected: URL.createObjectURL(file)
      });
      this.refs.createPictureDialog.dismiss();
      this.refs.createPictureDialog.show();
    } else {
      this.setState({
        flash: {
          message: 'Selected file must be an image.',
          state: 'error'
        }
      });
    }
  },
  _onPictureCreate() {
    var files = this.refs.pictureField.getDOMNode();
    if (!this.refs.pictureField.value) {
      this.setState({
        flash: {
          message: 'You must select an image to upload.',
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
    // img name is key
    this.state.S3.putObject({
      Bucket: env.AWS_BUCKET,
      Key: `images/${cuid()}`,
      Body: file,
      ContentType: file.type
    }, (err, data) => {
      if (err) console.log(err);
      else {
        console.log(data);
      }
    });
    this._clearDialog();
  },

  _onDialogShow() {
    this.refs.createPictureDialog.show();
  },

  _clearDialog() {
    this.refs.createPictureDialog.dismiss();
    this._onRemovePreview();
    this.refs.titleField.clearValue();
    this.refs.descriptionField.clearValue();
    this._onHideFlash();
  },

  _onRemovePreview() {
    this.setState({
      imageSelected: null    
    });
  },

  _onHideFlash() {
    this.setState({
      flash: null
    });
  }
});

module.exports = PictureCreator;
