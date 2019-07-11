import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DependencyNameAutoComplete from './DependencyNameAutoComplete';
import DependencyInfoList from './DependencyInfoList';

function Dependencies(props){
  const [selectedDependencyName, setSelectedDependencyName] = useState(null);

  useEffect(() => {
    if(props.match.params.dependencyName){
      updateSelectedDependencyName(props.match.params.dependencyName)
    }
  }, [] /* Only need to trigger this when the page is loaded to do a search based on a provided url param */);
  
  let updateSelectedDependencyName = (name) => {
    props.history.push(`/dependencies/${name}`)
  
    setSelectedDependencyName(name);
  }

  return(
    <Grid container justify="center">
      <Grid item xs={10} >
        <DependencyNameAutoComplete onDependencySelected={updateSelectedDependencyName} initialValue={selectedDependencyName} />
        <DependencyInfoList dependencyName={selectedDependencyName} />
      </Grid>
    </Grid>
  )
}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string
};

export default Dependencies;