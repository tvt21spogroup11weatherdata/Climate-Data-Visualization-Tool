
import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import { useEffect, useState } from "react";
import { Data, DataConstructor } from "../../classes/Data";
import V1 from "./V1"
import V3 from "./V3"
import V5 from "./V5"
import V6 from "./V6"
import V7 from "./V7"

export default function CollectionEditor(props){
    const [formatType, setFormatType] = useState("2column");
    const [coll, setColl] = useState([])

    var collectionElements = [];
    var column2 = [];
    var visualizationsData = [];
    var colle = new Collection();


    //Load data referred in the Visualizations MetaData
    function LoadVisualizationData(){
        var dataC = new DataConstructor();
        for(var i = 0; i < coll.length; i++){
            if(coll[i] === null) return;
            dataC.GetByIndex(coll[i].dataIndex).then(function(response){
                visualizationsData.push(response);
            })
        }
        CreateElements(visualizationsData);
    }

    useEffect(() => {
        if(colle.length >= coll.length) LoadVisualizationData();
    })

    function SaveData(){
        //GENERATE & POST UNIQUE ID
        //POST FORMATTYPE
        //POST VISUALIZATION IDS
        //POST TOGGLED SERIES' IN VISUALIZATION
        //POST CUSTOM DESCRIPTION
    }

    function UpdateData(props){
        colle.formatType = '1column'
        colle.visualizations = [];
        for(var i = 0; i < props.length; i++){
            colle.visualizations.push(new VisualizationsMeta(props[i], [true], "This is a description"))
        }
        setColl(colle.visualizations);
    }

    
    //Remove visualization from editor (not working)
    function RemoveVisualization(select){
        var dataIndex = select.target.value;
        var flaggedIndex;
        for(var i = 0; i < 10; i++){ //for amount of visualizations
            if(coll[i] !== undefined && coll[i].dataIndex == dataIndex) {
                flaggedIndex = i;
                console.log(flaggedIndex)
                break;
            }
        }
        coll.splice(i, 1);
        var indexes = [];
        if(coll.length > 0){
            for(var i = 0; i < coll.length; i++){
                indexes[i] = coll[i].dataIndex;
            }
        }
        UpdateData(indexes)
    }

    //Create the visualization elements
    function CreateElements(data){
        for(var i = 0; i < coll.length; i++){
            if(coll[i] === null) continue;
            var element = [];
            const index = coll[i].dataIndex;

            if(coll[i].dataIndex === 0) element.push(<V1 menu={false}/>)
            if(coll[i].dataIndex === 1) element.push(<V3 menu={false}/>)
            if(coll[i].dataIndex === 3) element.push(<V5 menu={false}/>)
            if(coll[i].dataIndex === 4) element.push(<V6 menu={false}/>)
            if(coll[i].dataIndex === 5) element.push(<V7 menu={false}/>)

            element.push((<div><b>Custom description:</b><textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>))
            element.push((<button value={index} onClick={(e) => RemoveVisualization(e)}>Remove visualization from collection</button>))

            if(formatType === "2column") {
                column2.push((<td>{element}</td>));
                if(column2.length === 2 || i === coll.length - 1) { 
                    collectionElements.push((<tr>{column2}</tr>));
                    column2 = []
                }
            }
            else { collectionElements.push((element)); }
        }
    }

    //if(coll.length === 0) UpdateData([0]);
    LoadVisualizationData();


    function AddNew(select){
        var indexes = [];
        for(var i = 0; i <= coll.length; i++){
            if(i === coll.length) indexes[i] = parseInt(select.target.value);
            else indexes[i] = coll[i].dataIndex;
        }
        UpdateData(indexes);
    }
    

    const saveButton = (<td><button className="btn btn-primary">Save & share</button></td>)
    const formatSelect = (<td>Formatting: <button className="btn btn-primary" onClick={() => setFormatType("1column")}>1 column</button> <button className="btn btn-primary" onClick={() => setFormatType("2column")}>2 columns</button></td>);
    const addVisualization = (
        <td><br/>
            <select class="form-select form-select-lg mb-3" defaultValue="-1" onChange={(e) => AddNew(e)}>
                <option value="-1" disabled>Add new visualization</option>
                <option value="0">Global historical surface temperature anomalies from January 1850 onwards</option>
                <option value="1">Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</option>
                <option value="3">Vostok Ice Core CO2 measurements, 417160 - 2342 years</option>
                <option value="4">Ice core 800k year composite study CO2 measurements</option>
                <option value="5">Evolution of global temperature over the past two million years</option>
            </select>
        </td>)
    
    
    const menu = (<table width="100%"><tbody><tr>{formatSelect}{addVisualization}{saveButton}</tr></tbody></table>);
    
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
            <table className="table" width="100%">
                <tbody>
                    {collectionElements}
                </tbody>
            </table>
            </>
        )
    }
}