import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import projectChargeCalculatorApp  from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {setUser} from './actions';
import {auth} from './firebase';

let store = createStore(projectChargeCalculatorApp);

ReactDOM.render(
		<Provider store={store}>
  			<App />
		</Provider>,
  document.getElementById('root')
);

auth.onAuthStateChanged((user) => {
	store.dispatch(setUser(user));
});
