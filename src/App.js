import React from 'react';
import Dependencies from './Dependencies';
import RepositoryTypes from './RepositoryTypes'
import MainPage from './MainPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/Typography";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
   
      <Router>
         <AppBar position="static">
             <Typography variant="h6" color="inherit">
              Repository Analysis
            </Typography>
      </AppBar>
        <Route path="/dependencies/:dependencyName?" component={Dependencies} />
        <Route path="/repositorytypes/" component={RepositoryTypes} />
        <Route path="/" exact component={MainPage} />
      </Router>
      </>
    );
  }
}

export default App;