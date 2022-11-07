import {CanvasJSChart} from 'canvasjs-react-charts'

// props:
//zoomable: zoomable & pannable
//chartTitle: chart title
//xAxisTitle: xAxis title (Years, months, or Thousands of years)
//yAxisTitle: yAxis title 
//data[]: datasets

export default function LineChart(props){
    const options = { // cant be named anything else than options
        theme: "light2",
        zoomEnabled: props.zoomable,
        title: {
            text: props.chartTitle,
            fontFamily: "Calibri"
        },
        axisY: {
            title: "Y Axis",
            suffix: "suffix"
        },
        axisX: {
            title: props.xAxisTitle,
            prefix: "prefix",
            interval: 10
        },
        data: [{
            type: "line",
            toolTipContent: "Prefix {x}: {y}suffix",
            dataPoints: props.data
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}