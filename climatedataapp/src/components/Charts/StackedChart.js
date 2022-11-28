import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Data, DataSet } from '../../classes/Data';

export default function StackedChart(props){
    const [loading, setLoading] = useState(true)
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const data = [];
    var amountOfToggledSeries = 0;
    var toggledMaxValues = []
    var chartYMax = 0;

    setData()

    function setData(){
        for(var i = 0; i < props.data.set.length; i++){
            data[i] = {
                id: i,
                visible: false,
                type: "stackedArea",
                name: props.data.set[i].yTitle,
                showInLegend: "true",
                dataPoints: props.data.set[i].points
            }
        }
    }

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

    function dynamicLoad(e){
        if(e.trigger === "pan") return;

        e.chart.options.axisX.interval = 10

        if(e.trigger === "reset") return;

        var diff = e.axisX[0].viewportMaximum - e.axisX[0].viewportMinimum;
        console.log(diff)
        var newInterval;
        if(diff < 100) newInterval = 1;
        e.chart.options.axisX.interval = newInterval
    }



    //Toggle series when clicking legend
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
            amountOfToggledSeries--

            toggledMaxValues[e.dataSeriesIndex] = 0;
            
        } else { 
            e.dataSeries.visible = true;
            amountOfToggledSeries++

            var seriesMax = 0;
            for(var i = 0; i < e.dataSeries.dataPoints.length; i++){
                if(e.dataSeries.dataPoints[i].y > seriesMax) seriesMax = e.dataSeries.dataPoints[i].y;
            }

            toggledMaxValues[e.dataSeriesIndex] = seriesMax
        }

        chartYMax = 0;
        for(var i = 0; i < toggledMaxValues.length; i++){
            if(toggledMaxValues[i] !== 0) chartYMax += toggledMaxValues[i]
        }
        
        if(chartYMax >= 150) chartYMax = Math.ceil(chartYMax / 100) * 100
        else if(chartYMax < 150) chartYMax = Math.ceil(chartYMax / 10) * 10
        else if(chartYMax < 50) chartYMax = chartYMax

        e.chart.options.axisY.maximum = chartYMax
        
        if(e.chart.options.axisY.maximum < 10000) e.chart.options.axisY.interval = 1000
        if(e.chart.options.axisY.maximum < 5000) e.chart.options.axisY.interval = 500
        if(e.chart.options.axisY.maximum < 3000) e.chart.options.axisY.interval = 200
        if(e.chart.options.axisY.maximum < 1000) e.chart.options.axisY.interval = 100
        if(e.chart.options.axisY.maximum < 500) e.chart.options.axisY.interval = 50
        if(e.chart.options.axisY.maximum < 100) e.chart.options.axisY.interval = 10
        if(e.chart.options.axisY.maximum < 20) e.chart.options.axisY.interval = 1

        e.chart.render();
    }


    const options = {
        animationEnabled: true,
        zoomEnabled: true,

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
            itemclick: toggleSeries
        },
        rangeChanging: dynamicLoad,
        data: data
    }

    var chart = <CanvasJSChart options = {options}/>
    setTimeout(() => {setLoading(false)}, "500");

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