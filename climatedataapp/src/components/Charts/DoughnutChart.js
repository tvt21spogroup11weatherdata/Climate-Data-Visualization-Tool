import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';

////////////////////////////////////////////////////
//RIKKI, KESKEN JNE
export default function DoughnutChart(props){
    const [subChart, setSub] = useState(false)
    const [subChartIndex, setSubIndex] = useState(0)
    const [subSectorOpt, setSubOptions] = useState({})

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    var dataPoints = [];
    var subData = []
    var subDataPoints = [];
    var chart;
    
    for(var i = 0; i < props.data.set[0].points.length; i++){
        
        dataPoints[i] = {y: props.data.set[0].points[i].y, label: props.data.set[0].points[i].x}
    }
    
    console.log(props.data.set[1].points)
    subDataPoints = [];
    for(var i = 0; i < props.data.set[1].points.length; i++){
        subDataPoints[i] = {y: props.data.set[1].points[i].y, label: props.data.set[1].points[i].x}
    }
    subData[0] = subDataPoints;

    
    subDataPoints = [];
    for(var i = 0; i < props.data.set[2].points.length; i++){
        subDataPoints[i] = {y: props.data.set[2].points[i].y, label: props.data.set[2].points[i].x}
    }
    subData[1] = subDataPoints;
    subDataPoints = [];
    for(var i = 0; i < props.data.set[3].points.length; i++){
        subDataPoints[i] = {y: props.data.set[3].points[i].y, label: props.data.set[3].points[i].x}
    }
    subData[2] = subDataPoints;
    subDataPoints = [];
    for(var i = 0; i < props.data.set[4].points.length; i++){
        subDataPoints[i] = {y: props.data.set[4].points[i].y, label: props.data.set[4].points[i].x}
    }
    subData[3] = subDataPoints;
    


    function goBack(){
        setSub(false)
    }

    function drilldownHandler(e) {
        console.log(e.dataPointIndex)
        setSub(true)

        setSubOptions({
            animationEnabled: true,
            axisY: {
                title:  "Share of global greenhouse gas emissions (%)",
                suffix: "%"
            },
            title:{
                text: "CO2 emissions in " + e.dataPoint.label,
            },
            data: [{
                type: "column",
                color: "#E7823A",
                dataPoints: subData[e.dataPointIndex]
            }]
            
        })
        chart = <CanvasJSChart options = {subSectorOpt}/>;
		//chart.render();
		//$("#backButton").toggleClass("invisible");
	}


    var options = {
        animationEnabled: true,
        title:{
            text: props.data.title,
        },
        data: [{
            type: "doughnut",
            click: drilldownHandler,
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            dataPoints: dataPoints
            
        }]
    }

    var backButton;

    if(!subChart) {
        chart = <CanvasJSChart options = {options}/>;
        backButton = (<button className="btn invisible" id="backButton">&lt; Back</button>)
    }
    else {
        chart = <CanvasJSChart options = {subSectorOpt}/>;
        backButton = (<button className="btn btn-primary" onClick={() => goBack()} id="backButton">&lt; Back</button>)
    }


        //var chart = <CanvasJSChart options = {options}/>;
        return(
        <div>
            {backButton}
            {chart}
        </div>)
    
}