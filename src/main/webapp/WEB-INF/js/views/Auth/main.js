import React from 'react';
import AuthActions from 'actions/AuthActions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui, {
  TextField,
  RaisedButton
} from 'material-ui';
const ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

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
        <RaisedButton 
          label="submit" 
          style={{marginLeft: '20'}}
          type="password"
          onTouchTap={this._onSubmit}>
        </RaisedButton>
      </section>
    );
  }

});

React.render(<Auth/>, document.getElementById('auth'));
