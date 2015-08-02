import Reflux from 'reflux';
import AuthActions from 'actions/AuthActions';

var AuthStore = Reflux.createStore({
  listenables: AuthActions,

  onAuthenticate(secret) {
    fetch('/api/auth/', {
      method: 'post',
      body: secret
    }).then(res => {
      console.log(res);
    });
  }
});

module.exports = AuthActions;
