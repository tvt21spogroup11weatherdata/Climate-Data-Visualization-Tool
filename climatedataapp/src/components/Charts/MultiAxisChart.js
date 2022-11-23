import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';

export default function MultiAxisChart(props){
    const [loading, setLoading] = useState(true)

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var postedData ; //METADATA THAT WILL BE POSTED TO A COLLECTION TABLE
    
    //Toggle series when clicking legend
    function toggleSeries(e) {
        
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}

        e.chart.options.axisX.interval = 100000

        
        
        if(e.dataSeries.id === 0 && !e.dataSeries.visible) {
            e.chart.options.axisX.interval = 10000
        }
        if(e.dataSeries.id === 1 && e.dataSeries.visible) {
            if(!e.chart.data[0].visible) e.chart.options.axisX.interval = 10000
        }

        e.chart.render();
    }

   // console.log(props.data.set[2])
    
    function dynamicLoad(e){
        if(e.trigger === "pan") return;

        e.chart.options.axisX.interval = 100000

        if(e.trigger === "reset") return;

        var diff = e.axisX[0].viewportMaximum - e.axisX[0].viewportMinimum;
        var newInterval;
        if(diff < 100) newInterval = 10;
        if(diff < 50) newInterval = 1;
        if(diff < 10) {
            newInterval = 0.1;
            e.chart.options.data.xValueFormatString="######"
        }
        if(diff < 5) {
            newInterval = 0.01;
            e.chart.options.data.xValueFormatString="######"
        }
        e.chart.options.axisX.interval = newInterval
    }

    function setHumanEvolutionPoints(){
        if(loading) return
        var set = []
        var set1reversed = props.data.set[1].points
        set1reversed.reverse()

        var events = []

        for(var i = 0; i < props.data.set[2].points.length; i++){
            var multiple = false;
            for(var p = 0; p < i; p++){
                if(props.data.set[2].points[i].x === props.data.set[2].points[p].x) {
                    multiple = true;
                }
            }
            
            if(multiple) {
                events.push(props.data.set[2].points[i].y)
            }
            else {
                events = []
                events[0] = props.data.set[2].points[i].y;
            }
            set.push({x: props.data.set[2].points[i].x, y: 3, events: events})
        }
        return set;
    }

    function tooltipContent(e){
        var id = e.entries[0].dataSeries.id;
        var content = ""
        if(id === 1) content = e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[0].suffix
        if(id === 2) content = e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[1].suffix
        if(id === 3) {
            var eventContent = "<ul>"
            for(var i = 0; i < e.entries[0].dataPoint.events.length; i++){
                eventContent += "<li>" + e.entries[0].dataPoint.events[i] + "</li>"
            }
            eventContent += "</ul>"
            content = e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + eventContent + " " + props.data.set[2].suffix
        }
        return content
    }

    //Set datapoints
    var data = [
        {
            type: "line",
            name: props.data.set[0].yTitle,
            id: 0,
            color: "#C24642",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: props.data.set[0].points
        },
        {
            type: "line",
            name: props.data.set[1].yTitle,
            id: 1,
            color: "#7F6084",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: props.data.set[1].points
        },
        {
            type: "scatter",
            name: props.data.set[2].yTitle,
            id: 2,
            markerSize: 15,
            markerType: "triangle",
            color: "#1100ff",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: setHumanEvolutionPoints()
        }]

    
    //Chart options
    const options = {
        zoomEnabled: true,
        title:{
            text: props.data.title,
            fontFamily: "Calibri"
        },
        axisX: {
            title: props.data.xTitle,
            reversed: true,
            prefix: props.data.xPrefix,
            suffix: props.data.xSuffix,
            interval: 100000
        },
        axisY:{
            title: props.data.set[0].yTitle,
            lineColor: "#C24642",
            tickColor: "#C24642",
            labelFontColor: "#C24642",
            titleFontColor: "#C24642",
            includeZero: true,
            suffix: props.data.set[0].suffix
        },
        axisY2: [{
            title: props.data.set[1].yTitle,
            lineColor: "#7F6084",
            tickColor: "#7F6084",
            labelFontColor: "#7F6084",
            titleFontColor: "#7F6084",
            includeZero: true,
            prefix: props.data.set[1].prefix,
            suffix: props.data.set[1].suffix
        },
        {
            title: props.data.set[2].yTitle,
            lineColor: "#",
            tickColor: "#1100ff",
            labelFontColor: "#1100ff",
            titleFontColor: "#1100ff",
            includeZero: true,
            prefix: props.data.set[2].prefix,
            suffix: props.data.set[2].suffix
        }],
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
    
    var chart = <CanvasJSChart options = {options}/>
    if(loading) setTimeout(() => {setLoading(false)}, "500");

    if(!loading){
        return(
            <div>
                {chart}
            </div>
        )
    }
    else {
        return <img src="https://i.imgur.com/Pdr7Mvk.gif"/>
    }
}