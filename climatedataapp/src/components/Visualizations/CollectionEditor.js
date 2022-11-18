
import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import { useEffect, useState } from "react";
import { Data, DataConstructor } from "../../classes/Data";
import V1 from "./V1"
import V3 from "./V3"
import V5 from "./V5"
import V6 from "./V6"


export default function CollectionEditor(props){
    //For formatting the page as 1 column or 2 columns
    const [formatType, setFormatType] = useState("2column");

    ////////////////////////////////
    //TESTING DATA
    var coll = new Collection();
    coll.formatType = '1column'
    coll.visualizations = [];
    coll.visualizations.push(new VisualizationsMeta(0, [true,true,true,true,true,true,true,true,true], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(1, [true,true], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(3, [true,true], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(4, [true,true], "This is a description"))
    ///////////////////////////////

    var collectionElements = [];
    var column2 = [];
    

    //Remove visualization from editor (not working)
    function RemoveVisualization(i){
        console.log("here")
        coll.visualizations[i] = null;
        LoadVisualizationData();
        CreateElements();
    }

    //Load data referred in the Visualizations MetaData
    function LoadVisualizationData(){
        var visualizationsData = [];
        var dataC = new DataConstructor();
        for(var i = 0; i < coll.visualizations.length; i++){
            if(coll.visualizations[i] === null) return;
            dataC.GetByIndex(coll.visualizations[i].dataIndex).then(function(response){
                visualizationsData.push(response);
            })
        }
        CreateElements(visualizationsData);
    }

    //Create the visualization elements
    function CreateElements(data){
        console.log(collectionElements.length + " " + coll.visualizations.length)

    //    if(collectionElements.length === coll.visualizations.length) return;

        console.log("shouldnt be here")

        for(var i = 0; i < coll.visualizations.length; i++){
            if(coll.visualizations[i] === null) continue;
            var element = [];
            
            if(coll.visualizations[i].dataIndex === 0) element.push(<V1 menu={false}/>)
            if(coll.visualizations[i].dataIndex === 1) element.push(<V3 menu={false}/>)
            if(coll.visualizations[i].dataIndex === 3) element.push(<V5 menu={false}/>)
            if(coll.visualizations[i].dataIndex === 4) element.push(<V6 menu={false}/>)

       //     element.push(<V5 menu={false}/>)

            element.push((<div><b>Custom description:</b><textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>))
 //           element.push((<button onClick={() => RemoveVisualization(i)}>Remove visualization from collection</button>))

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
    //

    
    //POST FORMATTYPE
    //POST VISUALIZATION IDS
    //POST TOGGLED SERIES' IN VISUALIZATION
    //POST CUSTOM DESCRIPTION

    const saveButton = (<button className="btn btn-primary">Save & share</button>)
    const formatSelect = (<td>Formatting: <button className="btn btn-primary" onClick={() => setFormatType("1column")}>1 column</button> <button className="btn btn-primary" onClick={() => setFormatType("2column")}>2 columns</button></td>);
  //  const addVisualization = ()
    const menu = (<table width="100%"><tbody><tr>{formatSelect}<td>{saveButton}</td></tr></tbody></table>);
    
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