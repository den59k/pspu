import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ModalWrapper } from 'components/modal-window'
import reportWebVitals from './reportWebVitals';

import 'styles/style.sass'
import { RouterProvider } from 'components/router';

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider>
      <ModalWrapper>
          <App />
      </ModalWrapper>
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
