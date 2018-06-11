import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import './index.css';
import App from './components/App/App';
import AlertTemplate from './components/AlertTemplate/AlertTemplate';
import registerServiceWorker from './registerServiceWorker';

const options = {
  position: 'bottom center',
  timeout: 2500
}


ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...options}>
		<App />
	</AlertProvider>,
	document.getElementById('root')
);


registerServiceWorker();