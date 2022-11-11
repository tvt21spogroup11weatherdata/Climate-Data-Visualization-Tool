
import VisualizeData from "./VisualizeData";
import { UserCollection
 } from "../../classes/UserCollection";
import LineChart from "../Charts/LineChart";
import { useState } from "react";

export default function CollectionEditor(props){
    //For formatting the page as 1 column or 2 columns
    const [formatType, setFormatType] = useState("2column");

    var coll = new UserCollection();
    var debugColls = [];
    var column2 = [];

    for(var i = 0; i < coll.visualizations.length; i++){
        var data = coll.visualizations[i];
        var wrapper;
        var element = [];
        if(data.chartType === "line") {
            element.push(<LineChart data={data} human={data.human} zoomable='true'/>);
        }
        element.push((<div><b>Custom description:</b><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>))
        element.push((<button>Remove visualization from collection</button>))

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

    //POST FORMATTYPE
    //POST VISUALIZATION IDS
    //POST TOGGLED SERIES' IN VISUALIZATION
    //POST CUSTOM DESCRIPTION

    const saveButton = (<button className="btn btn-primary">Save & share</button>)
    const formatSelect = (<>Formatting: <button className="btn btn-primary" onClick={() => setFormatType("1column")}>1 column</button> <button className="btn btn-primary" onClick={() => setFormatType("2column")}>2 columns</button></>);
    const menu = (<table width="100%"><tbody><td>{formatSelect}</td><td>{saveButton}</td></tbody></table>);
    
    if(formatType === "1column"){
        return(
            <>
            {menu}
            <div>{debugColls}</div>
            </>
        )
    }
    else if(formatType === "2column"){
        return(
            <>
            {menu}
            <table class="table" width="100%">
                <tbody>
                    {debugColls}
                </tbody>
            </table>
            </>
        )
    }
}