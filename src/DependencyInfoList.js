import React from 'react';
import PropTypes from 'prop-types';

function DependencyInfoList(props) {
    console.log("Rendering list");
    return (
    <button className="square" onClick={() => alert('click')}>
        {props.value}
    </button>
    );
}

DependencyInfoList.propTypes = {
  dependencyName: PropTypes.string.isRequired
};

export default DependencyInfoList;