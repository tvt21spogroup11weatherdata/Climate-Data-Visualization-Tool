import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';

//RIKKI
export default function DoughnutChart(props){
    const [subSector, toggleSubSector] = useState(false);
    const [subSubSector, toggleSubSubSector] = useState(false);

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    var chart;
    var subchart;
    var subsubchart;

    var dataPoints = [];
    var subDataPoints = [];
    var subSubDataPoints = [];

    for(var i = 0; i < props.data.set[0].points.length; i++){
        dataPoints[i] = {y: props.data.set[0].points[i].y, indexLabel: props.data.set[0].points[i].x}
    }

    for(var i = 0; i < props.data.set[0].points.length; i++){
        subDataPoints[i] = {y: props.subSectors[i].set[0].points[i].y, indexLabel: props.subSectors[i].set[0].points[i].x}
    }


    
   // subSubDataPoints[0] = {y: props.subSubSectors[0].set[0].points[0].y, indexLabel: props.subSubSectors[0].title} 

    /*for(var i = 0; i < props.subSubSectors.set[0].points.length; i++){
        subSubDataPoints[i] = {y: props.subSubSectors[i].set[0].points[i].y, indexLabel: props.subSubSectors[i].set[0].points[i].x}
    }*/
    
    

    function toggleSub(e){
        console.log("toggle subsector");
        console.log(e);
        subSectorOptions.subtitles[0].text = "uusi";
        console.log(subSectorOptions.subtitles[0].text)
        toggleSubSector(true);
    }

    function toggleSubSub(e){
        toggleSubSector(false);
        console.log("toggle subsubsector");
        console.log(e.dataPointIndex);
        options = subSubSectorOptions;
        toggleSubSubSector(true);
    }

    
    var options = {
        animationEnabled: true,
        theme: "light2",
        subtitles: [{text: "Subtitle"}],
        title:{ text: props.data.title },
          data: [{
           type: "doughnut",
           dataPoints: dataPoints,
           click: function(e){
                toggleSub(e)
           }
         }]
    }

    var subSectorOptions = {
        animationEnabled: true,
        theme: "light2",
        title:{ text: props.data.title },
        subtitles: [{text: "Subtitle"}],

          data: [{
           type: "doughnut",
           dataPoints: subDataPoints,

         }]
    }

    var subSubSectorOptions = {
        animationEnabled: true,
        theme: "light2",
        title:{ text: props.data.title },
        subtitles: [{text: "Subtitle"}],
          data: [{
           type: "doughnut",
           dataPoints: subSubDataPoints,
         }]
    }


    var chart = <CanvasJSChart options = {options}/>;
    var subchart = <CanvasJSChart options = {subSectorOptions}/>;
    var subsubchart = <CanvasJSChart options = {subSubSectorOptions}/>;

    if(subSector){
        return(
            <div>
            {subchart}
        </div>
        )
    }
    else if(subSubSector){
        return(
            <div>
            {subsubchart}
        </div>
        )
    }
    else return (
        <div>
            {chart}
        </div>
    )
}