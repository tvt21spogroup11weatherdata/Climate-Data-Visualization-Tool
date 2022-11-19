import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import StackedChart from "../Charts/StackedChart";
import MultiAxisChart from "../Charts/MultiAxisChart";
import { useState } from "react";
//Creates visualization with defined chartType and data + the source links & descriptions required
export default function VisualizeData(props){
    const [readMore, setReadMore] = useState(false)

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
    
    const linkName=readMore?'Read Less << ':'Read More >> '
    function setDesc(){
        var descContent = ""

        if(readMore) {
            var tempCont = [];
            tempCont[0] = (<p>{props.data.longDesc}</p>)
            if(props.data.longDesc2.length > 0) {
                tempCont[1] = (<p>{props.data.longDesc2}</p>)
            }
            descContent = (<p className="extraContent">{tempCont}</p>)
        }
        else {
            for(var i = 0; i < 200; i++){
                descContent+=props.data.longDesc[i];
            }
            descContent += "..."
        }
        return descContent
    }
    

    return(
            <div>
                {chartElement}
                <div id="chartDesc">
                    <p>{setDesc()}</p>
      
                    <p><a className="read-more-link readmorelink" onClick={()=>{setReadMore(!readMore)}}><h2>{linkName}</h2></a></p>
                </div>
                <p>
                    <a href={props.data.source} target="_blank" rel="noreferrer">Data source</a> - 
                    <a href={props.data.desc} target="_blank" rel="noreferrer">Data description</a>
                </p>
            </div>
        )
    
}