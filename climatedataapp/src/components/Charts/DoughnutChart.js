import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Spinner } from 'react-bootstrap';

export default function DoughnutChart(props){
    const [loading, setLoading] = useState(true)
    const [subChart, setSub] = useState(false)
    const [subSectorOpt, setSubOptions] = useState({})
    const [accessibleD, setPoint] = useState(null)  // Accessible datapoint for TTS (not in use)
    const [accessibleS, setSeries] = useState(null) // Accessible series name for TTS (not in use)

    var dataPoints = [];
    var subData = []
    var subDataPoints = [];
    var chart;

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    /* Set datapoints */
    for(var i = 0; i < props.data.set[0].points.length; i++){
        dataPoints[i] = {y: props.data.set[0].points[i].y, label: props.data.set[0].points[i].x}
    }
    
    /* Set subsector datapoints */
    for(var j = 1; j < props.data.set.length; j++){
        subDataPoints = [];
        for(var i = 0; i < props.data.set[j].points.length; i++){
            subDataPoints[i] = {y: props.data.set[j].points[i].y, label: props.data.set[j].points[i].x}
        }
        subData[j - 1] = subDataPoints;
    }

    /* Dynamically set tooltip content */
    function tooltipContent(e){
        var set = props.data.set[e.entries[0].index]
        var content = ""
        content = props.data.xPrefix + " " + e.entries[0].dataPoint.label + " " + props.data.xSuffix + " " + e.entries[0].dataPoint.y + " " + set.suffix
        return content
    }

    /* Handle drilldown when clicked on sector */
    function drilldownHandler(e) {
        setSub(true)
        //accessibility(e)
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
                dataPoints: subData[e.dataPointIndex],
                //mouseover: accessibility
            }]
        })
	}

    //Accessibility feature; does not work, prevents chart from rendering right
    /*
    function accessibility(e){
        var set = props.data.set[e.dataSeriesIndex]
        var accessibleDatapoint = e.dataPoint.label + " " + e.dataPoint.y + set.suffix
        setPoint(accessibleDatapoint)
    }
    */

    var options = {
        animationEnabled: true,
        toolTip:{
            shared: false,
            content: tooltipContent
        },
        data: [{
            type: "doughnut",
            click: drilldownHandler,
            //mouseover: accessibility,
            startAngle: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            dataPoints: dataPoints
            
        }]
    }

    /* Handle "back" button when handling sector drilldown */
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
    
    /* Render */
    chart = <CanvasJSChart options = {usedOptions}/>;
    setTimeout(() => {setLoading(false)}, "500");

    if(!loading){
        return(
            <div>
                <div>{backButton}</div>
                <div>{chart}</div>
                <div className="accessibleDiv" aria-live="assertive">{accessibleD}</div>
                <div className="accessibleDiv" aria-live="assertive">{accessibleS}</div>
            </div>)
    }
    else {
        return (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    
}