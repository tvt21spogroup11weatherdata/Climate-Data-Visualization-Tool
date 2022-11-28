
import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import { useEffect, useState } from "react";
import { DataConstructor } from "../../classes/Data";
import V1 from "./V1"
import V4 from "./V4"
import V5 from "./V5"
import V6 from "./V6"
import V7 from "./V7"
import V8 from "./V8"
import V9 from "./V9"

export default function CollectionEditor(props){
    //GET FORMATTYPE
    const [formatType, setFormatType] = useState("2column");
    const [loading, setLoading] = useState(true);

    var collectionElements = [];
    var column2 = [];
    var visualizationsData = [];
    var collection = new Collection();
    
    function LoadVisualizationData(){
        //LOAD FROM DB HERE
        ///////////////////////////////////////////////
        //TESTING DATA
        
        collection.formatType = '1column'
        collection.visualizations = [];
        collection.visualizations.push(new VisualizationsMeta(0, [true,true,true,true,true,true], "This is a description"))
        collection.visualizations.push(new VisualizationsMeta(1, [true,true], "This is a description"))
        ///////////////////////////////////////////////

        var dataC = new DataConstructor();
        for(var i = 0; i < collection.visualizations.length; i++){
            visualizationsData[i] = dataC.GetByIndex(collection.visualizations[i].dataIndex);
        }
    }

    function CreateElements(){
        for(var i = 0; i < visualizationsData.length; i++){
            var data = visualizationsData[i];
            var element = [];
            if(collection.visualizations[i].dataIndex === 0) element.push(<V1 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 1) element.push(<V4 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 2) element.push(<V5 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 3) element.push(<V6 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 4) element.push(<V7 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 5) element.push(<V8 menu={false}/>)
            if(collection.visualizations[i].dataIndex === 6) element.push(<V9 menu={false}/>)

            element.push((<div><b>Description:</b> <p>{collection.visualizations[i].description}</p></div>))
    
            if(formatType === "2column") {
                column2.push((<td>{element}</td>));
                if(column2.length === 2 || i === visualizationsData.length - 1) { 
                    collectionElements.push((<tr>{column2}</tr>));
                    column2 = []
                }
            }
            else {
                collectionElements.push((element));
            }
        }

    }

    LoadVisualizationData();
    CreateElements();

    if(formatType === "1column"){
            return(<><div>{collectionElements}</div></>)
        }
        else if(formatType === "2column"){
            return(<>
                <table className="table" width="100%">
                    <tbody>
                        {collectionElements}
                    </tbody>
                </table></>
            )
        }
}