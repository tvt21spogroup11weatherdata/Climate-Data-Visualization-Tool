import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Data, DataSet } from '../../classes/Data';
import { Spinner } from 'react-bootstrap';

export default function StackedChart(props){
    const [loading, setLoading] = useState(true)
    const [accessibleD, setPoint] = useState(null)
    const [accessibleS, setSeries] = useState(null)

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const data = [];
    var toggledMaxValues = []
    var chartYMax = 0;
    var legendItemFontSize = 11
    var chartHeight = window.innerHeight * 0.6

    /* Set datapoints */
    for(var i = 0; i < props.data.set.length; i++){
        data[i] = {
            id: i,
            visible: false,
            type: "stackedArea",
            name: props.data.set[i].yTitle,
            showInLegend: "true",
            dataPoints: props.data.set[i].points,
           // mouseover: accessibility
        }
    }

    //Accessibility feature; does not work, prevents chart from rendering right
    /*
    function accessibility(e){
        var set = props.data.set[e.dataSeries.id]
        var accessibleDatapoint = props.data.xPrefix + " " + e.dataPoint.x + " " + props.data.xSuffix + ", " + set.prefix + " " + e.dataPoint.y + " " + set.suffix
        setPoint(accessibleDatapoint)
    }*/


    /* Dynamically set tooltip content */
    function tooltipContent(e){
        var id = e.entries[0].dataSeries.id;
        var content = ""
        for(var i = 0; i < props.data.set.length; i++){
            if(id === data[i].id + 1) {
               content = props.data.set[e.entries[0].dataSeries.index].yTitle + "<br/>" + props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[id - 1].suffix
            }
        }
        return content
    }

    /* Dynamically tighten X Axis interval when zooming in */
    function dynamicLoad(e){
        if(e.trigger === "pan") return;

        e.chart.options.axisX.interval = 10

        if(e.trigger === "reset") return;

        var diff = e.axisX[0].viewportMaximum - e.axisX[0].viewportMinimum;
        var newInterval;
        if(diff < 100) newInterval = 1;
        e.chart.options.axisX.interval = newInterval
    }



    /* Toggle series when clicking legend */
    function toggleSeries(e) {
        //if empty, populate max values of all series with 0
        if(toggledMaxValues.length === 0){
            for(var i = 0; i < props.data.set.length; i++){
                toggledMaxValues[i] = 0;
            }
            e.chart.options.axisY.maximum = 0;
        }

        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
            toggledMaxValues[e.dataSeriesIndex] = 0;
            
        } else { 
            e.dataSeries.visible = true;

            var seriesMax = 0;
            for(var i = 0; i < e.dataSeries.dataPoints.length; i++){
                if(e.dataSeries.dataPoints[i].y > seriesMax) seriesMax = e.dataSeries.dataPoints[i].y;
            }

            toggledMaxValues[e.dataSeriesIndex] = seriesMax
        }

        yAxisAdjust(e.chart)
        
        /* //Accessibility feature; does not work, prevents chart from rendering right
        var toggleInfo = ""
        if(e.dataSeries.visible) toggleInfo =" was toggled on"
        else toggleInfo =" was toggled off"
        setSeries(e.dataSeries.name + toggleInfo)*/
    }

    /* Dynamically adjust Y Axis based on max value of enabled series */
    function yAxisAdjust(chart, force){
        chartYMax = 0;
        for(var i = 0; i < toggledMaxValues.length; i++){
            if(toggledMaxValues[i] !== 0) chartYMax += toggledMaxValues[i]
        }
        
        if(chartYMax >= 150) chartYMax = Math.ceil(chartYMax / 100) * 100
        else if(chartYMax < 150) chartYMax = Math.ceil(chartYMax / 10) * 10
        else if(chartYMax < 50) chartYMax = chartYMax

        chart.options.axisY.maximum = chartYMax

        if(chart.options.axisY.maximum < 20000) chart.options.axisY.interval = 1000
        if(chart.options.axisY.maximum < 5000) chart.options.axisY.interval = 500
        if(chart.options.axisY.maximum < 3000) chart.options.axisY.interval = 200
        if(chart.options.axisY.maximum < 1000) chart.options.axisY.interval = 100
        if(chart.options.axisY.maximum < 500) chart.options.axisY.interval = 50
        if(chart.options.axisY.maximum < 100) chart.options.axisY.interval = 10
        if(chart.options.axisY.maximum < 20) chart.options.axisY.interval = 1

        chart.render();

        var enabledSeries = []
        for(var i = 0; i < chart.data.length; i++){
            enabledSeries.push(chart.data[i].visible)
        }

        if(props.editorIndex !== undefined) props.saveSeries(props.editorIndex, enabledSeries, {yMax: chart.options.axisY.maximum, yInterval: chart.options.axisY.interval});
    }

    /* Set chart options */
    const options = {
        animationEnabled: true,
        zoomEnabled: true,
        height: chartHeight,
        axisX:{
            title: props.data.xTitle,
            interval: 10,
            valueFormatString: "####",
        },
        axisY:{
            title: props.data.yTitle,
            interval: 100,
            maximum: 100
        },
        toolTip:{
            shared: false,
            content: tooltipContent
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleSeries,
            markerMargin: 0,
            fontSize: legendItemFontSize,
            horizontalAlign: "left"
        },
        rangeChanging: dynamicLoad,
        data: data
    }

    /* Render */
    var chart = <CanvasJSChart options = {options}/>
    
    
    /* Check if is shared chart, enable/disable series based on VisualizationsMeta */
    /* Check if chart is in editing, disable all series before edits */
    if(props.seriesEnabled !== undefined){
        var seriesEnabled = props.seriesEnabled
        if(chart !== undefined){
            for(var i = 0; i < props.data.set.length; i++){
                chart.props.options.data[i].visible = seriesEnabled[i];
            }

            chart.props.options.axisY.maximum = props.stackedProps.yMax
            chart.props.options.axisY.interval = props.stackedProps.yInterval
        }
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