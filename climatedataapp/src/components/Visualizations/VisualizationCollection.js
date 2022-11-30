import { Collection, VisualizationsMeta } from "../../classes/UserCollection";
import { useEffect, useState } from "react";
import axios from "axios";
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
    const [collection, setCollection] = useState(null)
    const [elements, setElements] = useState(null)

    var url = "http://localhost:3001"
    var column2 = [];

    useEffect(() => {
        if(loading){
           if(collection === null){ 
                axios.get(url + '/collections/' + props.id, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin',
                    }
                    }).then((response) => {
                        var tempColl = new Collection();
                        tempColl.formatType = response.data[0].formatType;
                        for(var i = 0; i < response.data[0].visualizations.length; i++){
                            tempColl.visualizations.push(response.data[0].visualizations[i])
                        }
                        setCollection(tempColl)
                }).catch (error => {
                    alert(error)
                })
            }
            else if(collection.visualizations !== null && elements === null){
                var collectionElements = [];
                for(var i = 0; i < collection.visualizations.length; i++){
                    for(var i = 0; i < collection.visualizations.length; i++){
                        var element = [];
                        var index = collection.visualizations[i].dataIndex
                        var seriesEnabled = collection.visualizations[i].seriesEnabled

                        if(index == 0) element.push(<V1 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 1) element.push(<V4 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 2) element.push(<V5 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 3) element.push(<V6 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 4) element.push(<V7 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 5) element.push(<V8 seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 6) element.push(<V9 menu={false}/>)
                        
                        element.push((<div><b>Description:</b> <p>{collection.visualizations[i].description}</p></div>))

                        if(collection.formatType === "2column") {
                            column2.push((<td>{element}</td>));
                            if(column2.length === 2 || i === collection.visualizations.length - 1) { 
                                collectionElements.push((<tr>{column2}</tr>));
                                column2 = []
                            }
                            setFormatType("2column")
                        }
                        else {
                            collectionElements.push((element));
                        }
                    }
                    setElements(collectionElements)
                    setLoading(false)
                }
            }
        }
    })
    
    if(!loading) {
        if(formatType === "1column"){
                return(<><div>{elements}</div></>)
            }
        else if(formatType === "2column"){
            return(<>
                <table className="table" width="100%">
                    <tbody>
                        {elements}
                    </tbody>
                </table></>
            )
        }
    }
}