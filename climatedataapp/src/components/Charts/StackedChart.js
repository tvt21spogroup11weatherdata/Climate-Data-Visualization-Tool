import CanvasJSReact from '../../canvasjs.react';

export default function StackedChart(props){
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const stacks = [];

    for(var i = 0; i < props.data.set.length; i++){
        stacks[i] = {
            type: "stackedArea100",
            name: props.data.set[i].yTitle,
            showInLegend: "true",
            dataPoints: props.data.set[i].points
        }
    }

    const options = {
        animationEnabled: true,
        title:{
            text: props.data.title
        },
        axisX:{
            title: props.data.xTitle,
            minimum: -0.02,
            maximum: 3.02
        },
        axisY:{
            title: props.data.yTitle
        },
        toolTip:{
            shared: true
        },
        data: stacks
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}