import React  from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

const App = () => (
    <div className="container mt-4">
      <h2 className="display-4 text-center mb-4">Upload New Schema</h2>
      <FileUpload/>
    </div>
  );


export default App;
