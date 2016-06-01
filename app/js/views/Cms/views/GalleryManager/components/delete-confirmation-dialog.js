import React, { Component, PropTypes } from 'react'
import mui, {
  Dialog,
  FlatButton
} from 'material-ui'

class DeleteConfirmationDialog extends Component {

  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  };

  constructor () {
    super()
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this._onCancel = this._onCancel.bind(this)
    this._onConfirm = this._onConfirm.bind(this)
  }

  show () {
    if (this.refs.confirmationDialog) {
      this.refs.confirmationDialog.show()
    }
  }

  hide () {
    if (this.refs.confirmationDialog) {
      this.refs.confirmationDialog.hide()
    }
  }

  _onCancel () {
    this.hide()
    this.props.onCancel()
  }

  _onConfirm () {
    this.hide()
    this.props.onConfirm()
  }

  render () {
    return (
      <Dialog
        ref='confirmationDialog'
        title='Are you sure?'
        actionFocus='cancel'
        actions={[
          <FlatButton
            label='Cancel'
            onTouchTap={this._onCancel}
            secondary
          />,
          <FlatButton
            label='Delete'
            onTouchTap={this._onConfirm}
            primary
          />
        ]}
      >
      Are you sure that you want to delete the gallery? 
      </Dialog>
    )
  }
}

export default DeleteConfirmationDialog
