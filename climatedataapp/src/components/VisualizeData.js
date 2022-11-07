import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";

//props:
//dataTitle: name of the data visualized
//dataSource: Link to data source
//dataDesc: Link to data desc
//data[]: datasets

export default function VisualizeData(props){
    var chartElement;

    switch(props.chartType){
        case "line":
            chartElement = (<LineChart data={props.dataPoints} chartTitle={props.data.title} zoomable='true' xAxisTitle="Years"/>)
            break;
        case "stackedLine":
            break;
        case "multiAxisLine":
            break;
        case "doughnut":
            chartElement = (<DoughnutChart data={props.dataPoints} chartTitle={props.data.title} zoomable='true' xAxisTitle="Years"/>)
            break;
    }

    return(
        <div>
            <p><a href={props.data.source}>{props.data.source}</a>, <a href={props.data.desc}>{props.data.desc}</a></p>
            {chartElement}
        </div>
    )
}