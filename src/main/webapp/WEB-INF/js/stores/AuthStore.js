import Reflux from 'reflux';
import AuthActions from 'actions/AuthActions';

var _authState = {
  authenticated: false,
  secret: null
};

var AuthStore = Reflux.createStore({
  listenables: AuthActions,

  onAuthenticate(secret) {
    fetch('/api/auth/', {
      method: 'post',
      body: secret
    }).then(res => {
      if (res.status == 200) {
        _authState = {
          authenticated: true,
          secret: secret
        };
      }
      this.trigger(_authState);
    });
  }
});

module.exports = AuthStore;
