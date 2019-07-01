import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DependencyNameAutoComplete from './DependencyNameAutoComplete';
import DependencyInfoList from './DependencyInfoList';

class Dependencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDependencyName: null,
      initialSelectedDependencyName: this.props.match && this.props.match.params && this.props.match.params.dependencyName
    };

    this.updateSelectedDependencyName = this.updateSelectedDependencyName.bind(this);
  }

  componentDidMount() {
    // Update the list of an intial value was passed in.  
    // Should probably just have the search component trigger this if it's given a default value
    if (this.state.initialSelectedDependencyName) {
      this.updateSelectedDependencyName(this.state.initialSelectedDependencyName);
    }
  }

  updateSelectedDependencyName(name) {
    this.props.history.push(`/dependencies/${name}`)
  
    this.setState({
      selectedDependencyName: name
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={10} >
          <DependencyNameAutoComplete onDependencySelected={this.updateSelectedDependencyName} initialValue={this.state.initialSelectedDependencyName} />
          <DependencyInfoList dependencyName={this.state.selectedDependencyName} />
        </Grid>
      </Grid>
    )
  }
}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string
};

export default Dependencies;