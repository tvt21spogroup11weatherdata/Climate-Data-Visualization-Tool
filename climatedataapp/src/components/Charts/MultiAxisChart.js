import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Spinner } from 'react-bootstrap';

export default function MultiAxisChart(props){
    const [loading, setLoading] = useState(true)
    const [accessibleD, setPoint] = useState(null)
    const [accessibleS, setSeries] = useState(null)

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    /* Toggle series when clicking legend */
    function toggleSeries(e) {
        
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}

        e.chart.options.axisX.interval = props.interval
        
        if(e.dataSeries.id === 0 && !e.dataSeries.visible) {
            e.chart.options.axisX.interval = 10000
        }
        if(e.dataSeries.id === 1 && e.dataSeries.visible) {
            if(!e.chart.data[0].visible) e.chart.options.axisX.interval = 10000
        }

        e.chart.render();

        var enabledSeries = []
        for(var i = 0; i < e.chart.data.length; i++){
            enabledSeries.push(e.chart.data[i].visible)
        }
        console.log("editorindex " + props.editorIndex + " enabled series " + enabledSeries)
        if(props.editorIndex !== undefined) props.saveSeries(props.editorIndex, enabledSeries);

        
        /* //Accessibility feature; does not work, prevents chart from rendering right
        var toggleInfo = ""
        if(e.dataSeries.visible) toggleInfo =" was toggled on"
        else toggleInfo =" was toggled off"
        setSeries(e.dataSeries.name + toggleInfo)*/
    }

    //Accessibility feature; does not work, prevents chart from rendering right
    /*
    function accessibility(e){
        var set = props.data.set[e.dataSeries.id]
        if(e.dataSeries.id === 2) {
            accessibleDatapoint = props.data.xPrefix + " " + e.dataPoint.x + " " + props.data.xSuffix + ", " + set.prefix + " " + e.dataPoint.events
        }
        else accessibleDatapoint = props.data.xPrefix + " " + e.dataPoint.x + " " + props.data.xSuffix + ", " + set.prefix + " " + e.dataPoint.y + " " + set.suffix
        setPoint(accessibleDatapoint)
    }
    */
    
    /* Dynamically tighten X Axis interval when zooming in */
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

    /* Set "human event" points */
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
            set.push({x: parseInt(props.data.set[2].points[i].x), y: 3, events: events})
        }
        return set;
    }

    /* Dynamically set tooltip content */
    function tooltipContent(e){
        var id = e.entries[0].dataSeries.id;
        var content = ""
        for(var i = 0; i < props.data.set.length; i++){
            if(id === data[i].id + 1) {
               content = props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[id - 1].suffix
            }
        }
        if(props.data.set[id - 1].listDesc){
            var eventContent = "<ul>"
                for(var i = 0; i < e.entries[0].dataPoint.events.length; i++){
                    eventContent += "<li>" + e.entries[0].dataPoint.events[i] + "</li>"
                }
                eventContent += "</ul>"
                content = props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + eventContent
        }
        return content
    }

    /* Set datapoints */
    var data = [
        {
            type: "line",
            name: props.data.set[0].yTitle,
            id: 0,
            color: "#C24642",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: props.data.set[0].points,
           // mouseover: accessibility
        },
        {
            type: "line",
            name: props.data.set[1].yTitle,
            id: 1,
            color: "#7F6084",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: props.data.set[1].points,
            //mouseover: accessibility
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
            dataPoints: setHumanEvolutionPoints(),
           // mouseover: accessibility
        }]

    
    /* Set chart options */
    const options = {
        zoomEnabled: true,
        axisX: {
            title: props.data.xTitle,
            reversed: true,
            interval: props.interval
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

    /* Render */
    var chart = <CanvasJSChart options = {options}/>
    
    
    /* Check if is shared chart, enable/disable series based on VisualizationsMeta */
    /* Check if chart is in editing, enable all series before edits */
    if(props.seriesEnabled !== undefined){
        var seriesEnabled = props.seriesEnabled
        for(var i = 0; i < props.data.set.length; i++){
            chart.props.options.data[i].visible = seriesEnabled[i];
        }
    }
    else if(props.editorIndex !== undefined) {
        var seriesEnabled = []
        for(var i = 0; i < props.data.set.length; i++){
            seriesEnabled[i] = true
        }
        props.saveSeries(props.editorIndex, seriesEnabled);
    }

    if(loading) setTimeout(() => {setLoading(false)}, "500");


    if(!loading){
        return( 
        <div>
            <div>{chart}</div>
            <div className="accessibleDiv" aria-live="assertive">{accessibleD}</div>
            <div className="accessibleDiv" aria-live="assertive">{accessibleS}</div>
        </div> )
    }
    else {
        return (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
}