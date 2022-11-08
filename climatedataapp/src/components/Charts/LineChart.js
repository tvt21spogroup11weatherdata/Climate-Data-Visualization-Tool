import { useEffect } from 'react';
import CanvasJSReact from '../../canvasjs.react';

export default function LineChart(props){
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var data = [];

    //Toggle series
    function toggleSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}
        e.chart.render();
    }

    //Set datapoints
    for(var i = 0; i < props.data.set.length; i++){
        data[i] = {
            type: "line",
            name: props.data.set[i].yTitle,
            toolTipContent: props.data.set[i].prefix + " {x}: {y}" + props.data.set[i].suffix,
            showInLegend: true,
            dataPoints: props.data.set[i].points
        }
    }

    const options = { // cant be named anything else than options
        theme: "light2",
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
            interval: 10 //NOT DEFINED
        },
        
        legend: {
            cursor: "pointer",
            itemclick: toggleSeries
        },
        //width: chartSize, // FIND A WAY TO FORCE REFRESH DIV SIZE TO TRIGGER CHART RESIZE
        data: data
    }

    return(
        <div>
            <CanvasJSChart  options = {options}/>
        </div>
    )
}