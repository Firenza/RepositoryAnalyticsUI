import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class DependencyInfoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      dependencyInfos: []
    };
  }

  async componentDidUpdate(prevProps){

    if(this.props.dependencyName !== prevProps.dependencyName){
       
      const response = await axios.get(`http://localhost:33283/api/dependencies/${this.props.dependencyName}`)
      
      this.setState({
        dependencyInfos : response.data
      });
    }
  }

  render() {

    console.log("Rendering Info List");

    return (
      
      <button className="square" onClick={() => alert('click')}>
          {this.props.value}
      </button>
      );
  }
  
}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string.isRequired
};

export default DependencyInfoList;