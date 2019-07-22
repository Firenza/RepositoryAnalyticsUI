import React , { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-google-charts";

function RepositoryTypes()  {

  const [repositoryTypeInfo, setRepositoryTypeInfo] = useState(null);
  const [selectedPieSlice, setSelectedPieSlice] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`${window._env_.API_URL}/api/repositories/types`)  
   
      setRepositoryTypeInfo(response.data);
    }

    fetchData();
  }, [] /* Only run this effect once */);

  const chartEvents = [
    {
      eventName: 'select',
      callback: ({chartWrapper}) => {
        // Expand the currently clicked pie slice
        const chart = chartWrapper.getChart()
        const selection = chart.getSelection()

        if (selection.length === 1) {
          const [selectedItem] = selection
          const { row } = selectedItem
          
          let slice = {}
          let currentlySeletedRow = selectedPieSlice && Object.keys(selectedPieSlice)[0];

          if(currentlySeletedRow != row){
            slice[row] = {offset: .2};
          }
  
          setSelectedPieSlice(slice);
        }
      },
    },
  ];

  const pieOptions = {
    title: "REPOSITORY TYPES",
    animation:{
      startup: true,
      duration: 1000,
      easing: 'linear',
    },
    slices: selectedPieSlice,
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

  let createChartDataArray = () => {
    let data = [["Name", "Count"]];
  
    repositoryTypeInfo.map((value) => {
        data.push([value.name, value.count]);
        return null;
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
        options={pieOptions}
        chartEvents={chartEvents}/>
      }
    </div>
  )
}

export default RepositoryTypes;