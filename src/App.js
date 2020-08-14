import React  from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Schemas from './components/Schemas';
import Nav from './Nav';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';

const App = () => (

  <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Schemas} />
          <Route path="/components/schemas" component={Schemas} />
          <Route path="/components/fileUpload" component={FileUpload} />
        </Switch>
      </div>
    </Router>
    
  );


export default App;
