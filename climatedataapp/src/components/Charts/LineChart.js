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
            id: i,
            type: "line",
            name: props.data.set[i].yTitle,
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

    function setHumanEvolutionPoints(){
        if(loading) return
        var set = []
        var events = []

        for(var i = 0; i < props.data.set[4].points.length; i++){
            var multiple = false;
            for(var p = 0; p < i; p++){
                if(props.data.set[4].points[i].x === props.data.set[4].points[p].x) {
                    multiple = true;
                }
            }
            
            if(multiple) {
                events.push(props.data.set[4].points[i].y)
            }
            else {
                events = []
                events[0] = props.data.set[4].points[i].y;
            }
            set.push({x: props.data.set[4].points[i].x, y: 3, events: events})
        }
        return set;
    }

    function tooltipContent(e){
        var id = e.entries[0].dataSeries.id;
        var content = ""
        for(var i = 0; i < props.data.set.length; i++){
            if(id === data[i].id + 1) {
               content = props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[id - 1].suffix
            }
        }
        console.log(props.data.xPrefix)
        if(props.data.set[id - 1].listDesc){
            var eventContent = "<ul>"
                for(var i = 0; i < e.entries[0].dataPoint.events.length; i++){
                    eventContent += "<li>" + e.entries[0].dataPoint.events[i] + "</li>"
                }
                eventContent += "</ul>"
                content = props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + eventContent + " " + props.data.set[id - 1].suffix
        }
        return content
    }

    //IF REQUIRES HUMAN EVOLUTION SERIES
    if(props.human){
        data[4] = {
            id: 5,
            type: "scatter",
            color: "#1100ff",
            name: props.data.set[4].yTitle,
            showInLegend: true,
            markerSize: 15,
            markerType: "triangle",
            axisYType: "secondary",
            dataPoints: setHumanEvolutionPoints(),
            toolTip: {
                shared: false,
                content: "{x}: {events}"
            }
        }
    }

/*
    

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
        axisY2: {
            title: "",
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){return " ";}
        },
        toolTip: {
            shared: false,
            content: tooltipContent
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