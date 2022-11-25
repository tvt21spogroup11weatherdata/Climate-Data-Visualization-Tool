import { useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import { Data, DataSet } from '../../classes/Data';

export default function StackedChart(props){
    const [loading, setLoading] = useState(true)
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const data = [];
    var amountOfToggledSeries = 0;

    /////////////////////////////////////////////////
    var testData; //remove when actual data
    localTestData(); //remove when actual data

    function localTestData(){ //remove when actual data
        testData = props.data;
        for(var i = 0; i < 219; i++){
            testData.set[i] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CountryName',
            ' ',
            ' '
            );
            for(var j = 0; j < 80; j++){
                const dataPoint = {x: 1950 + j, y: (100 + Math.random(2)) * Math.random(3)}
                testData.set[i].points.push(dataPoint)
            }

            data[i] = {
                id: i,
                visible: false,
                type: "stackedArea",
                name: testData.set[i].yTitle,
                showInLegend: "true",
                dataPoints: testData.set[i].points
            }
        }
    }
    /////////////////////////////////////////////////


    //use this when actual data
    function setData(){
        //if(!loading) return //use this if data loads twice
        for(var i = 0; i < props.data.set.length; i++){
            data[i] = {
                id: i,
                visible: false,
                type: "stackedArea",
                name: testData.set[i].yTitle,
                showInLegend: "true",
                dataPoints: testData.set[i].points
            }
        }
    }

    function tooltipContent(e){
        var id = e.entries[0].dataSeries.id;
        var content = ""
        for(var i = 0; i < props.data.set.length; i++){
            if(id === data[i].id + 1) {
               content = props.data.xPrefix + " " + e.entries[0].dataPoint.x + " " + props.data.xSuffix + "<br/>" + e.entries[0].dataPoint.y + " " + props.data.set[id - 1].suffix
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
        
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
            amountOfToggledSeries--
        } else { 
            e.dataSeries.visible = true;
            amountOfToggledSeries++
        }

        e.chart.options.axisY.maximum = 100 * amountOfToggledSeries
        e.chart.options.axisY.interval = 100
        e.chart.render();
    }


    const options = {
        animationEnabled: true,
        zoomEnabled: true,
        height: 700,
        axisX:{
            title: testData.xTitle,
            interval: 10,
            valueFormatString: "####",
        },
        axisY:{
            title: testData.yTitle,
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