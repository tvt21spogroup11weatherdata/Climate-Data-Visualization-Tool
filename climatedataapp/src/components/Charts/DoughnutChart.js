import CanvasJSReact from '../../canvasjs.react';

export default function DoughnutChart(props){
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = { // cant be named anything else than options
        theme: "light2",
        title: {
            text: props.chartTitle,
            fontFamily: "Calibri"
        },
        subtitles: [{
            text: ":)",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
			indexLabel: "{name}: {y}",
			yValueFormatString: "#,###'%'",
			dataPoints: props.data.set[0].points
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}