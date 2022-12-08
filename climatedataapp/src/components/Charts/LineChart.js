import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Spinner } from 'react-bootstrap';

export default function LineChart(props){
    const [loading, setLoading] = useState(true)
    const [accessibleD, setPoint] = useState(null)
    const [accessibleS, setSeries] = useState(null)

    var accessibleDatapoint
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var data = [];
    var newInterval = props.interval

    //Toggle series when clicking legend
    function toggleSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}

        e.chart.render();

        var enabledSeries = []
        for(var i = 0; i < e.chart.data.length; i++){
            enabledSeries.push(e.chart.data[i].visible)
        }
        if(props.editorIndex !== undefined) props.saveSeries(props.editorIndex, enabledSeries);

        //Accessibility feature; does not work, prevents chart from rendering right
        /*
        var toggleInfo = ""
        if(e.dataSeries.visible) toggleInfo =" was toggled on"
        else toggleInfo =" was toggled off"
        setSeries(e.dataSeries.name + toggleInfo)*/
    }
    
    for(var i = 0; i < props.data.set.length; i++){
        data[i] = {
            id: i,
            type: "line",
            name: props.data.set[i].yTitle,
            showInLegend: true,
            dataPoints: props.data.set[i].points,
            //mouseover: accessibility
        }
    }

    //Accessibility feature; does not work, prevents chart from rendering right
    function accessibility(e){
        var set = props.data.set[e.dataSeries.id]
        if(props.human && e.dataSeries.id === 5) {
            accessibleDatapoint = props.data.xPrefix + " " + e.dataPoint.x + " " + props.data.xSuffix + ", " + set.prefix + " " + e.dataPoint.events + " " + set.suffix
        }
        else accessibleDatapoint = props.data.xPrefix + " " + e.dataPoint.x + " " + props.data.xSuffix + ", " + set.prefix + " " + e.dataPoint.y + " " + set.suffix
        setPoint(accessibleDatapoint)
    }

    function dynamicLoad(e){
        if(e.trigger === "pan") return;
        e.chart.options.axisX.interval = props.interval
        if(e.trigger === "reset") return;

        var diff = e.axisX[0].viewportMaximum - e.axisX[0].viewportMinimum;
        
        if(diff < 500) newInterval = 100;
        if(diff < 200) newInterval = 10;
        if(diff < 30) newInterval = 1;
        
        e.chart.options.axisX.interval = newInterval
    }

    function setHumanEvolutionPoints(){
        if(loading) return
        var set = []
        var events = []

        for(var i = 0; i < props.data.set[5].points.length; i++){
            var multiple = false;
            for(var p = 0; p < i; p++){
                if(props.data.set[5].points[i].x === props.data.set[5].points[p].x) {
                    multiple = true;
                }
            }
            
            if(multiple) {
                events.push(props.data.set[5].points[i].y)
            }
            else {
                events = []
                events[0] = props.data.set[5].points[i].y;
            }
            set.push({x: props.data.set[5].points[i].x, y: 3, events: events})
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
        if(props.data.set[e.entries[0].dataSeries.index].listDesc){
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
        data[5] = {
            id: 5,
            type: "scatter",
            color: "#1100ff",
            name: props.data.set[5].yTitle,
            showInLegend: true,
            markerSize: 15,
            markerType: "triangle",
            axisYType: "secondary",
            dataPoints: setHumanEvolutionPoints(),
            toolTip: {
                shared: false,
                content: "{x}: {events}"
            },
            //mouseover: accessibility
        }
    }

    //Chart options
    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        axisY: {
            title:  props.data.yTitle,
            suffix: props.data.set[0].suffix,
            prefix: props.data.set[0].prefix
        },
        axisX: {
            title: props.data.xTitle,
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


    setTimeout(() => {setLoading(false)}, "500");
    

    if(!loading){
        return( 
        <div>
            <div>{chart}</div>
            <div className="accessibleDiv" aria-live="assertive">{accessibleD}</div>
            <div className="accessibleDiv" aria-live="assertive">{accessibleS}</div>
        </div> ) 
    }
    else {
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
}