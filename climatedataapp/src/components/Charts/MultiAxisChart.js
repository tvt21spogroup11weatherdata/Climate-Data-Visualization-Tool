import CanvasJSReact from '../../canvasjs.react';

export default function MultiAxisChart(props){

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    function toggleSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}
        e.chart.render();
    }
    
    const options = {
        zoomEnabled: true,
        title:{
            text: props.data.title
        },
        axisX: {
            title: props.data.xTitle,
            prefix: props.data.xPrefix,
            interval: 10
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
        axisY2: {
            title: props.data.set[1].yTitle,
            lineColor: "#7F6084",
            tickColor: "#7F6084",
            labelFontColor: "#7F6084",
            titleFontColor: "#7F6084",
            includeZero: true,
            prefix: props.data.set[1].prefix,
            suffix: props.data.set[1].suffix
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleSeries
        },
        data: [
        {
            type: "line",
            name: props.data.set[0].yTitle,
            color: "#C24642",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: props.data.set[0].points
        },
        {
            type: "line",
            name: props.data.set[1].yTitle,
            color: "#7F6084",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: props.data.set[1].points
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}