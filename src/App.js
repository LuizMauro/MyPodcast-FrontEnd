import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
<<<<<<< HEAD
import history from './services/history'
import SideBar from './sidebar';

import { store, persistor } from './store'

import GlobalStyle from './styles/global'
=======
import history from './services/history';
>>>>>>> master

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
<<<<<<< HEAD
  return (
    <Provider store={store}>

      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
        </Router>
        <GlobalStyle />
        <SideBar />
        <ToastContainer autoClose={3000} />
      </PersistGate>
 
    </Provider>
  );
=======
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Router history={history}>
					<Routes />
				</Router>
				<GlobalStyle />
				<ToastContainer autoClose={3000} />
			</PersistGate>
		</Provider>
	);
>>>>>>> master
}

export default App;
