import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import StackedChart from "../Charts/StackedChart";
import MultiAxisChart from "../Charts/MultiAxisChart";

//Creates visualization with defined chartType and data + the source links & descriptions required
export default function VisualizeData(props){
    var chartElement;

    switch(props.chartType){
        case "line":        chartElement = (<LineChart  v2error={props.v2error} reversed={props.reversed} data={props.data} human={props.human} zoomable='true'/>)
            break;
        case "stacked":     chartElement = (<StackedChart data={props.data} zoomable='true'/>)
            break;
        case "multiaxis":   chartElement = (<MultiAxisChart data={props.data}/>)
            break;
        case "doughnut":    chartElement = (<DoughnutChart data={props.data} subSectors={props.subSectors} subSubSectors={props.subSubSectors}/>)
            break;
    }

    return(
            <div>
                {chartElement}
                <div id="chartDesc">
                    <p>{props.data.longDesc}</p>
                    <p>{props.data.longDesc2}</p>
                </div>
                <p>
                    <a href={props.data.source} target="_blank" rel="noreferrer">Data source</a> - 
                    <a href={props.data.desc} target="_blank" rel="noreferrer">Data description</a>
                </p>
             {/*   <form action="newcollection" onSubmit="redirect();"> <input type="submit" value="Add to a collection"/></form> {/* dropdown list that show all user's collections + option for new? */}
            </div>
        )
    
}