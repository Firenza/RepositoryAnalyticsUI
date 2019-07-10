import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles  } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
  },
});

function DependencyInfoList(props) {

  const [dependencyInfos, setDependencyInfos] = useState(null);

  useEffect(() => {
    if (props.dependencyName) {
      async function fetchData(){
        const response = await axios.get(`${window._env_.API_URL}/api/dependencies/${props.dependencyName}`);
    
        setDependencyInfos(response.data);
      }
  
      fetchData();
    }
  }, [props.dependencyName] /* Only run this effect once */);

  const classes = useStyles();

  return (
    <>
      {dependencyInfos && dependencyInfos.length > 0 && dependencyInfos.map(di =>
        <div key={`${di.repositoryDependency.name}|${di.repositoryDependency.version}`} className={classes.root}>

          <List component="nav" aria-label="Main mailbox folders" className={classes.root}>
            <ListItem button className={classes.root}> 
              <Grid container className={classes.root} justify="center">
                <Grid item xs={8}>
                  <Typography>{di.repositoryDependency.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{di.repositoryDependency.version}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{di.count}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </div>
      )}
    </>
  );
}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string.isRequired
};

export default DependencyInfoList;