import React from "react";
import Dependencies from "./Dependencies";
import RepositoryTypes from "./RepositoryTypes";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import JssProvider from "react-jss/lib/JssProvider";

function App() {
  return (
    // Using this component to get around the CSS styling issues when doing a production build
    <JssProvider>
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
    </JssProvider>
  );
}

export default App;