import React from 'react';
import AuthActions from 'actions/AuthActions';
import mui, {
  TextField,
  RaisedButton
} from 'material-ui';

var Auth = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.Object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _onSubmit() {
    AuthActions.authenticate(this.refs.secretField.getValue());
  },

  render() {
    return (
      <section id="auth-container">
        <TextField ref="secretField" hintText="secret" />
        <RaisedButton label="submit" onTouchTap={this._onSubmit} />
      </section>
    );
  }

});

module.exports = Auth;
