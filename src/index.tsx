import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core'

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark', fontFamily: 'Roboto' }} withGlobalStyles>
      <App />
    </MantineProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
