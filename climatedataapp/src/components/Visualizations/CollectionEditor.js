
import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import { useEffect, useState } from "react";
import { DataConstructor } from "../../classes/Data";
import axios from "axios";
import V1 from "./V1"
import V4 from "./V4"
import V5 from "./V5"
import V6 from "./V6"
import V7 from "./V7"
import V8 from "./V8"
import V9 from "./V9"
import App from "../../App";

export default function CollectionEditor(props){
    const [formatType, setFormatType] = useState("2column");
    const [collection, setColl] = useState([])
    const [descriptions, setDescs] = useState([])
    const [redirectID, setRedirect] = useState(null)

    var url = "http://localhost:3001"
    var collectionElements = [];
    var column2 = [];
    var visualizationsData = [];
    var tempCollection = new Collection();
    var textInputs = []

    //Load data referred in the Visualizations MetaData
    function LoadVisualizationData(){
        var dataC = new DataConstructor();
        for(var i = 0; i < collection.length; i++){
            if(collection[i] === null) return;
            dataC.GetByIndex(collection[i].dataIndex).then(function(response){
                visualizationsData.push(response);
            })
        }
        CreateElements(visualizationsData);
    }

    useEffect(() => {
        if(tempCollection.length >= collection.length) LoadVisualizationData();
    })


    //Update collection
    function UpdateData(props){
        tempCollection.formatType = '1column'
        tempCollection.visualizations = [];
        for(var i = 0; i < props.length; i++){
            tempCollection.visualizations.push(new VisualizationsMeta(props[i], [true], ""))
        }
        setColl(tempCollection.visualizations);
    }

    //Add new chart
    function AddVisualization(select){
        var indexes = [];
        for(var i = 0; i <= collection.length; i++){
            if(i === collection.length) indexes[i] = parseInt(select.target.value);
            else indexes[i] = collection[i].dataIndex;
        }
        UpdateData(indexes);
    }

    //Remove visualization from editor (not working)
    function RemoveVisualization(select){
        var dataIndex = select.target.value;
        var flaggedIndex;
        for(var i = 0; i < 10; i++){ //for amount of visualizations
            if(collection[i] !== undefined && collection[i].dataIndex == dataIndex) {
                flaggedIndex = i;
                console.log(flaggedIndex)
                break;
            }
        }
        collection.splice(i, 1);
        var indexes = [];
        if(collection.length > 0){
            for(var j = 0; j < collection.length; j++){
                indexes[j] = collection[j].dataIndex;
            }
        }
        UpdateData(indexes)
    }

    const onChange = ({target}) => {
        textInputs[target.id] = target
        let descs = []
        for(var i = 0; i < textInputs.length; i++){
            if(i == target.id) {
                descs[i] = target.value
            }
            else descs[i] = descriptions[i]
        }
        setDescs(descs)
    }
    

    //Create the visualization elements
    function CreateElements(data){
        for(var i = 0; i < collection.length; i++){
            if(collection[i] === null) continue;
            var element = [];
            const index = collection[i].dataIndex;

            if(collection[i].dataIndex === 0) element.push(<V1 key="0" menu={false}/>)
            if(collection[i].dataIndex === 1) element.push(<V4 key="1" menu={false}/>)
            if(collection[i].dataIndex === 2) element.push(<V5 key="2" menu={false}/>)
            if(collection[i].dataIndex === 3) element.push(<V6 key="3" menu={false}/>)
            if(collection[i].dataIndex === 4) element.push(<V7 key="4" menu={false}/>)
            if(collection[i].dataIndex === 5) element.push(<V8 key="5" menu={false}/>)
            if(collection[i].dataIndex === 6) element.push(<V9 key="6" menu={false}/>)

            textInputs.push(<textarea className="form-control" onChange={onChange} id={i} rows="3"></textarea>)
            element.push((<div><b>Custom description:</b>{textInputs[i]}</div>))
            element.push((<button value={index} onClick={(e) => RemoveVisualization(e)}>Remove visualization from collection</button>))

            if(formatType === "2column") {
                column2.push((<td>{element}</td>));
                if(column2.length === 2 || i === collection.length - 1) { 
                    collectionElements.push((<tr>{column2}</tr>));
                    column2 = []
                }
            }
            else { collectionElements.push((element)); }
        }
    }

    async function SaveAndShare(e){
        e.preventDefault()
        console.log(textInputs)
        let text = "Are you sure you want to save this collection? Editing this collection later will not be possible.";
        var tempVisualizations = collection

        for(var i = 0; i < collection.length; i++){
            console.log(descriptions[i])
            tempVisualizations[i].description = descriptions[i]
        }
        setColl(tempVisualizations)

        var data = {
            "formatType": formatType,
            "visualizations": collection
        }

        if(window.confirm(text)){
            var redirectID
            axios.post(url + '/collections/create', data).then((response) => {
                redirectID = response.data
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setRedirect(redirectID)
            })
        }

    }
    
    //Create menu elements
    const saveButton = (<td><form onSubmit={e => SaveAndShare(e)}><input type="submit" className="btn btn-primary" value="Save & share"></input></form></td>)
    const formatSelect = (<td>Formatting:<br/><button className="btn btn-primary" onClick={() => setFormatType("1column")}>1 column</button> <button className="btn btn-primary" onClick={() => setFormatType("2column")}>2 columns</button></td>);
    const addVisualization = (
        <td><br/>
            <select className="form-select form-select-lg mb-3" defaultValue="-1" onChange={(e) => AddVisualization(e)}>
                <option key="-1" value="-1" disabled>Add new visualization</option>
                <option key="0" value="0">Global historical surface temperature anomalies from January 1850 onwards</option>
                <option key="1" value="1">Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements</option>
                <option key="2" value="2">Vostok Ice Core CO2 measurements, 417160 - 2342 years</option>
                <option key="3" value="3">Ice core 800k year composite study CO2 measurements</option>
                <option key="4" value="4">Evolution of global temperature over the past two million years</option>
                <option key="5" value="5">CO2 emissions by country</option>
                <option key="6" value="6">Global CO2 emissions by sectors</option>
            </select>
        </td>)
    
    const menu = (<table width="100%"><tbody><tr>{formatSelect}{addVisualization}{saveButton}</tr></tbody></table>);
    
    
    LoadVisualizationData();

    if(redirectID !== null){
        window.location.href="/account"
    }
    else {
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
}