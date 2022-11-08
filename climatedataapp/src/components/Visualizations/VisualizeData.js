import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import StackedChart from "../Charts/StackedChart";
import MultiAxisChart from "../Charts/MultiAxisChart";

//props:
//data: data object
//chartType: chart type

export default function VisualizeData(props){

    var chartElement;

    switch(props.chartType){
        case "line":        chartElement = (<LineChart data={props.data} zoomable='true'/>)
            break;
        case "stacked":     chartElement = (<StackedChart data={props.data} zoomable='true'/>)
            break;
        case "multiaxis":   chartElement = (<MultiAxisChart data={props.data}/>)
            break;
        case "doughnut":    chartElement = (<DoughnutChart data={props.data}/>)
            break;
    }

    return(
        <div>
            {chartElement}
            <p>{props.data.longDesc}</p>
            <p><a href={props.data.source}>{props.data.source}</a>, <a href={props.data.desc}>{props.data.desc}</a></p>
            <p><input type="submit" value="Tässä piti olla joku save nappula vissiin"/></p>
            <hr/>
        </div>
    )
}