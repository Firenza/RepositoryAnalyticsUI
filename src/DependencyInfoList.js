import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class DependencyInfoList extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      dependencyInfos: []
    };
  }

  async componentDidUpdate(prevProps) {

    if (this.props.dependencyName !== prevProps.dependencyName) {

      const response = await axios.get(`${window._env_.API_URL}/api/dependencies/${this.props.dependencyName}`)

      console.log(response);

      this.setState({
        dependencyInfos: response.data
      });
    }
  }

  render() {

    console.log("Rendering Info List");

    const { classes } = this.props;

    return (
      <div>
        {this.state.dependencyInfos.length > 0 && this.state.dependencyInfos.map(di =>
          <div className={classes.root}>
            <Paper>
              <Grid container className={classes.root} justify="center">
                <Grid>
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h2">{di.repositoryDependency.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{di.repositoryDependency.version}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{di.count}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </div>
    );
  }

}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string.isRequired
};

export default withStyles(styles)(DependencyInfoList);