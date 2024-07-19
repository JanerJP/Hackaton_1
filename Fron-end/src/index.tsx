import React from 'react';
import ReactDOM from 'react-dom';
import CaseList from './CaseList';
import CaseForm from './CaseForm';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <CaseList />
      <CaseForm />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);