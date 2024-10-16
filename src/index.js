import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import './index.css';
import Insert from "./pages/Insert";
import Search from "./pages/Search";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="insert" element={<Insert />} />
      <Route path="search" element={<Search />} />
      <Route path="update" element={<Update />} />
      <Route path="delete" element={<Delete />} />
    </Routes>

  </HashRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
