import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as URQLProvider, createClient } from 'urql';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './store/Auth';

const client = createClient({
  url: 'http://localhost:5000/graphql',
});

ReactDOM.render(
  <AuthProvider>
    <URQLProvider value={client}>
      <App />
    </URQLProvider>
  </AuthProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
