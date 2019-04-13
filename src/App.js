import React from 'react';
import Dependencies from './Dependencies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route path="/dependencies/:dependencyName?" component={Dependencies} />
      </Router>
    );
  }
}

export default App;