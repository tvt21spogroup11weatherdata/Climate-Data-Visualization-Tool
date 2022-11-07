import CanvasJSReact from '../canvasjs.react';

export default function LineChart(props){
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = { // cant be named anything else than options
        theme: "light2",
        title: {
            text: props.data.title,
            fontFamily: "Calibri" //MOVE TO ENV VAR
        },
        axisY: {
            title: "Y Axis",
            suffix: props.data.set[0].suffix,
            prefix: props.data.set[0].prefix
        },
        axisX: {
            title: props.data.xTitle,
            prefix: props.data.xPrefix,
            suffix: props.data.xSuffix,
            interval: 10 //NOT SURE WHAT TO DO WITH THIS
        },
        data: [{
            type: "line",
            toolTipContent: "Prefix {x}: {y}suffix",
            dataPoints: props.data.set[0].points
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}