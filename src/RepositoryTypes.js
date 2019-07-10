import React , { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-google-charts";

const pieOptions = {
  title: "HEY I'M A TITLE",
  // legend: {
  //   position: "bottom",
  //   alignment: "center",
  //   textStyle: {
  //     color: "233238",
  //     fontSize: 14
  //   }
  // },
  // tooltip: {
  //   showColorCode: true
  // },
  // chartArea: {
  //   left: 0,
  //   top: 0,
  //   width: "100%",
  //   height: "80%"
  // },
  fontName: "Roboto"
};

function RepositoryTypes()  {

  const [repositoryTypeInfo, setRepositoryTypeInfo] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`${window._env_.API_URL}/api/repositories/types`)  
   
      console.log(response);
  
      setRepositoryTypeInfo(response.data);
    }

    fetchData();
  }, [] /* Only run this effect once */);
  
  let createChartDataArray = () => {
    let data = [["Name", "Count"]];
  
    repositoryTypeInfo.map((value) => {
        data.push([value.name, value.count]);
    });

    return data;
  };

  return (
    <div>
      {repositoryTypeInfo != null && 
        <Chart
        chartType="PieChart"
        data={createChartDataArray()}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        options={pieOptions}/>
      }
    </div>
  )
}

export default RepositoryTypes;