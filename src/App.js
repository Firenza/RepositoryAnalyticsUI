import React from 'react';

import DependencyNameAutoComplete from './DependencyNameAutoComplete';
import DependencyInfoList from './DependencyInfoList';

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDependencyName: null,
    };

    this.updateSelectedDependencyName = this.updateSelectedDependencyName.bind(this);
  }

  updateSelectedDependencyName(name){
    this.setState ({
      selectedDependencyName: name
    });
  }

  render() {
    return (
      <>
      <DependencyNameAutoComplete onDependencySelected = {this.updateSelectedDependencyName}/>
      <DependencyInfoList dependencyName = {this.state.selectedDependencyName}/>
      </>
    );
  }
}

export default IntegrationAutosuggest;