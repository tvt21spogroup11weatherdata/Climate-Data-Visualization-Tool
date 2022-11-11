
import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import LineChart from "../Charts/LineChart";
import MultiAxisChart from "../Charts/MultiAxisChart";
import StackedChart from "../Charts/StackedChart";
import DoughnutChart from "../Charts/DoughnutChart";
import { useState } from "react";
import { DataConstructor } from "../../classes/Data";

export default function CollectionEditor(props){
    //For formatting the page as 1 column or 2 columns
    const [formatType, setFormatType] = useState("2column");

    ////////////////////////////////
    //TESTING DATA
    var coll = new Collection();
    coll.formatType = '1column'
    coll.visualizations = [];
    coll.visualizations.push(new VisualizationsMeta(0, [true,true,true,true,true,true,true,true,true], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(1, [true,false], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(2, [false,true], "This is a description"))
    ///////////////////////////////

    var collectionElements = [];
    var column2 = [];
    var visualizationsData = [];

    //Remove visualization from editor (not working)
    function RemoveVisualization(i){
        console.log("here")
        coll.visualizations[i] = null;
        LoadVisualizationData();
        CreateElements();
    }

    //Load data referred in the Visualizations MetaData
    function LoadVisualizationData(){
        var dataC = new DataConstructor();
        for(var i = 0; i < coll.visualizations.length; i++){
            if(coll.visualizations[i] === null) return;
            visualizationsData.push(dataC.GetByIndex(coll.visualizations[i].dataIndex));
        }
    }

    //Create the visualization elements
    function CreateElements(){
        for(var i = 0; i < coll.visualizations.length; i++){
            if(coll.visualizations[i] === null) continue;
            var data = visualizationsData[i];
            var element = [];
            if(data.chartType === "line") {         element.push(<LineChart data={data} seriesEnabled={coll.visualizations[i].seriesEnabled} human={data.human} zoomable='true'/>);}
            if(data.chartType === "multiAxis") {    element.push(<MultiAxisChart data={data} zoomable='true'/>);}
            if(data.chartType === "stacked") {      element.push(<StackedChart data={data} zoomable='true'/>);}
            if(data.chartType === "doughnut") {     element.push(<DoughnutChart data={data}  subSectors={props.subSectors} subSubSectors={props.subSubSectors}/>);}

            element.push((<div><b>Custom description:</b><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>))
            element.push((<button onClick={() => RemoveVisualization(i)}>Remove visualization from collection</button>))

            if(formatType === "2column") {
                column2.push((<td>{element}</td>));
                if(column2.length === 2 || i === coll.visualizations.length - 1) { 
                    collectionElements.push((<tr>{column2}</tr>));
                    column2 = []
                }
            }
            else { collectionElements.push((element)); }
        }
    }

    LoadVisualizationData();
    CreateElements();
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
            <div>{collectionElements}</div>
            </>
        )
    }
    else if(formatType === "2column"){
        return(
            <>
            {menu}
            <table class="table" width="100%">
                <tbody>
                    {collectionElements}
                </tbody>
            </table>
            </>
        )
    }
}