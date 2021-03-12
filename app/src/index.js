import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/style.sass'

import { DataProvider } from 'components/data'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SideMenuProvider } from 'components/side-menu';
import { RoomInfoProvider } from 'components/room-info'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <SideMenuProvider>
        <RoomInfoProvider>
          <App />
        </RoomInfoProvider>
      </SideMenuProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
