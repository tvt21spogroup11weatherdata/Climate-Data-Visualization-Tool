
import VisualizeData from "./VisualizeData";
import { UserCollection
 } from "../../classes/UserCollection";
import LineChart from "../Charts/LineChart";
import { useState } from "react";

export default function VisualizationCollection(props){
    //GET FORMATTYPE
    const [formatType, setFormatType] = useState("2column");

    var coll = new UserCollection();
    var debugColls = [];
    var column2 = [];

    /*GET VISUALIZATION IDS or something*/
    for(var i = 0; i < coll.visualizations.length; i++){
        var data = coll.visualizations[i];
        var element = [];
        if(data.chartType === "line") {
            element.push(<LineChart data={data} human={data.human} zoomable='true'/>);
        }
        element.push((<div><b>Description:</b> {/*GET DESCRIPTION*/} </div>))

        if(formatType === "2column") {
            column2.push((<td>{element}</td>));
            if(column2.length === 2) { 
                debugColls.push((<tr>{column2}</tr>));
                column2 = []
            }
        }
        else {
            debugColls.push((element));
        }
    }

    if(formatType === "1column")
    {
        return(
            <>
            <div>{debugColls}</div>
            </>
        )
    }
    else if(formatType === "2column"){
        return(
            <>
            <table class="table" width="100%">
                <tbody>
                    {debugColls}
                </tbody>
            </table>
            </>
        )
    }
}