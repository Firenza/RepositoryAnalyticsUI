import React , { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import RepositoryTypes from './RepositoryTypes';
import RepositoryImplementations from './RepositoryImplmentations';

function Categorizations(props){

    const [selectedRepositoryType, setSelectedRepositoryType] = useState(null);
  
    // useEffect(() => {
    //   if(props.match.params.dependencyName){
    //     updateSelectedDependencyName(props.match.params.dependencyName)
    //   }
    // }, [] /* Only need to trigger this when the page is loaded to do a search based on a provided url param */);
    
    // let updateSelectedDependencyName = (name) => {
    //   props.history.push(`/dependencies/${name}`)
    
    //   setSelectedDependencyName(name);
    // }
  
    return(
      <Grid container justify="center">
        <Grid item xs={10} >
          <RepositoryTypes updateSelectedRepositoryType={setSelectedRepositoryType}/>
          <RepositoryImplementations selectedRepositoryType={selectedRepositoryType}/>
        </Grid>
      </Grid>
    )
  }
  
  
  export default Categorizations;