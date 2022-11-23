import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';

export default function DoughnutChart(props){
    const [loading, setLoading] = useState(true)
    const [subChart, setSub] = useState(false)
    const [subSectorOpt, setSubOptions] = useState({})

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    var dataPoints = [];
    var subData = []
    var subDataPoints = [];
    var chart;
    
    for(var i = 0; i < props.data.set[0].points.length; i++){
        dataPoints[i] = {y: props.data.set[0].points[i].y, label: props.data.set[0].points[i].x}
    }
    
    for(var j = 1; j < props.data.set.length; j++){
        subDataPoints = [];
        for(var i = 0; i < props.data.set[j].points.length; i++){
            subDataPoints[i] = {y: props.data.set[j].points[i].y, label: props.data.set[j].points[i].x}
        }
        subData[j - 1] = subDataPoints;
    }

    function drilldownHandler(e) {
        setSub(true)

        setSubOptions({
            animationEnabled: false,
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
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            dataPoints: dataPoints
            
        }]
    }

    var buttonClass = "btn invisible";
    var usedOptions;
    if(!subChart) {
        usedOptions = options
        buttonClass = "btn invisible";
    }
    else {
        usedOptions = subSectorOpt
        buttonClass = "btn btn-primary";
    }

    var backButton = (<button className={buttonClass} onClick={() => setSub(false)} id="backButton">&lt; Back</button>)
    chart = <CanvasJSChart options = {usedOptions}/>;
    setTimeout(() => {setLoading(false)}, "500");

    if(!loading){
        return(
            <div>
                {backButton}
                {chart}
            </div>)
    }
    else {
        return <img src="https://i.imgur.com/Pdr7Mvk.gif"/>
    }
    
}