import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';

export default function LineChart(props){
    const [loading, setLoading] = useState(true)
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var data = [];
    var postedData; //METADATA THAT WILL BE POSTED TO A COLLECTION TABLE

    //Toggle series when clicking legend
    function toggleSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}
        e.chart.render();
    }
    
    for(var i = 0; i < props.data.set.length; i++){
        data[i] = {
            type: "line",
            name: props.data.set[i].yTitle,
            toolTipContent: props.data.set[i].prefix + " {x}: {y}" + props.data.set[i].suffix,
            showInLegend: true,
            dataPoints: props.data.set[i].points
        }
    }

    function dynamicLoad(e){
        if(e.trigger === "pan") return;

        e.chart.options.axisX.interval = props.interval

        if(e.trigger === "reset") return;

        var diff = e.axisX[0].viewportMaximum - e.axisX[0].viewportMinimum;
        var newInterval;
        if(diff < 500) newInterval = 10;
        if(diff < 200) newInterval = 1;
        e.chart.options.axisX.interval = newInterval
    }

/*
    //IF REQUIRES HUMAN EVOLUTION SERIES
    if(props.human){
        data[4] = {
            type: "scatter",
            color: "#1100ff",
            name: props.data.set[4].yTitle,
            toolTipContent: props.data.set[4].prefix + " {x}: {y}" + props.data.set[4].suffix,
            showInLegend: true,
            dataPoints: props.data.set[4].points
        }
    }

    //FOR UNCERTAINTY VALUES IN SET V2
    if(props.v2error){
        data[7] = {
            type: "error",
            color: "#34eb6e",
            name: props.data.set[7].yTitle,
            toolTipContent: props.data.set[7].prefix + " {x}: {y}" + props.data.set[7].suffix,
            showInLegend: true,
            dataPoints: props.data.set[7].points
        }

        data[8] = {
            type: "rangeArea",
            color: "#8446f0",
            name: props.data.set[8].yTitle,
            toolTipContent: props.data.set[8].prefix + " {x}: {y}" + props.data.set[8].suffix,
            showInLegend: true,
            dataPoints: props.data.set[8].points
        }
    }

*/

    //Chart options
    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: props.data.title,
            fontFamily: "Calibri" //MOVE TO ENV VAR
        },
        axisY: {
            title:  props.data.yTitle,
            suffix: props.data.set[0].suffix,
            prefix: props.data.set[0].prefix
        },
        axisX: {
            title: props.data.xTitle,
            prefix: props.data.xPrefix,
            suffix: props.data.xSuffix,
            reversed: props.reversed,
            interval: props.interval
        },
        rangeChanging: dynamicLoad,
        legend: {
            cursor: "pointer",
            itemclick: toggleSeries
        },
        data: data
    }

    //Define chart
    var chart = <CanvasJSChart options = {options}/>

    //Set enabled series when loading user collection
    if(props.seriesEnabled !== undefined){
        for(var i = 0; i < props.data.set.length; i++){
            chart.props.options.data[i].visible = props.seriesEnabled[i];
        }
    }

    setTimeout(() => {setLoading(false)}, "500");

    if(!loading){
        return( <div>{chart}</div> ) 
    }
    else {
        return <img src="https://i.imgur.com/Pdr7Mvk.gif"/>
    }
}