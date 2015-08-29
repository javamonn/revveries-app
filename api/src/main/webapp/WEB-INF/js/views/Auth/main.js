import React from 'react';
import Cookie from 'react-cookie';
import Reflux from 'reflux';
import AuthActions from 'actions/AuthActions';
import AuthStore from 'stores/AuthStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui, {
  TextField,
  RaisedButton
} from 'material-ui';
const ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

var Auth = React.createClass({
  mixins: [
    Reflux.listenTo(AuthStore, 'onAuthChanged')
  ],

  childContextTypes: {
    muiTheme: React.PropTypes.Object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  onAuthChanged(authState) {
    if (authState.authenticated) {
      Cookie.save('authSecret', authState.secret);
      window.location.href = '/cms';
    } else {
      this.refs.secretField.setErrorText('Incorrect Secret');
    }
  },

  _onSubmit() {
    AuthActions.authenticate(this.refs.secretField.getValue());
    this.refs.secretField.clearValue();
  },

  render() {
    return (
      <section id="auth-container">
        <TextField ref="secretField" hintText="secret" type="password" />
        <RaisedButton 
          label="submit" 
          style={{marginLeft: '20'}}
          onTouchTap={this._onSubmit}>
        </RaisedButton>
      </section>
    );
  }

});

React.render(<Auth/>, document.getElementById('auth'));
