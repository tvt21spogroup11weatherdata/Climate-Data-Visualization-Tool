import CanvasJSReact from '../../canvasjs.react';

export default function MultiAxisChart(props){
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var postedData ; //METADATA THAT WILL BE POSTED TO A COLLECTION TABLE
    
    //Toggle series when clicking legend
    function toggleSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else { e.dataSeries.visible = true;}
        e.chart.render();
    }
    
    //Set datapoints
    var data = [
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
        },
        {
            type: "scatter",
            name: props.data.set[2].yTitle,
            color: "#1100ff",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: props.data.set[2].points
        }]

    
    //Chart options
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
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleSeries
        },
        data: data
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}