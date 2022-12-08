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

export default function VisualizationCollection(props){
    const [formatType, setFormatType] = useState("2column");
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState(null)
    const [elements, setElements] = useState(null)
    const [createdBy, setCreatedBy] = useState("")

    var url = "http://localhost:3001" // TO ENV !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var column2 = [];

    useEffect(() => {
        if(loading){
           if(collection === null){ 
                axios.get(url + '/collections/c/' + props.id, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin',
                    }
                    }).then((response) => {
                        var tempColl = new Collection();
                        setCreatedBy(response.data[0].createdBy)
                        tempColl.formatType = response.data[0].formatType;
                        for(var i = 0; i < response.data[0].visualizations.length; i++){
                            tempColl.visualizations.push(response.data[0].visualizations[i])
                            if(response.data[0].visualizations[i].stackedProps !== undefined) tempColl.visualizations[i].stackedProps = response.data[0].visualizations[i].stackedProps
                        }
                        setCollection(tempColl)
                }).catch (error => {
                    console.log(error)
                })
            }
            else if(collection.visualizations !== null && elements === null){
                var collectionElements = [];
                for(var i = 0; i < collection.visualizations.length; i++){
                    for(var i = 0; i < collection.visualizations.length; i++){
                        var element = [];
                        var index = collection.visualizations[i].dataIndex
                        var seriesEnabled = collection.visualizations[i].seriesEnabled

                        if(index == 0) element.push(<V1 key={String(i) + String(index)} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 1) element.push(<V4 key={String(i) + String(index)} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 2) element.push(<V5 key={String(i) + String(index)} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 3) element.push(<V6 key={String(i) + String(index)} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 4) element.push(<V7 key={String(i) + String(index)} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 5) element.push(<V8 key={String(i) + String(index)} stackedProps={collection.visualizations[i].stackedProps} seriesEnabled={seriesEnabled} menu={false}/>)
                        if(index == 6) element.push(<V9 key={String(i) + String(index)} menu={false}/>)
                        
                        element.push((<div key="0"><b>Description:</b> <p>{collection.visualizations[i].description}</p></div>))

                        if(collection.formatType === "2column") {
                            column2.push((<td key={i}>{element}</td>));
                            if(column2.length === 2 || i === collection.visualizations.length - 1) { 
                                collectionElements.push((<tr key={i}>{column2}</tr>));
                                column2 = []
                            }
                            setFormatType("2column")
                        }
                        else {
                            collectionElements.push((element));
                        }
                    }
                    setElements(collectionElements)
                    setTimeout(setLoading(false), 1000)
                }
            }
        }
    })

    function createdByElement(){
        return(<p><b>Collection created by user {createdBy}</b></p>)
    }
    
    if(!loading) {
        
        if(formatType === "1column"){
                return(<>{createdByElement()}<div>{elements}</div></>)
            }
        else if(formatType === "2column"){
            return(<>{createdByElement()}
                <table className="table" width="100%">
                    <tbody key="">
                        {elements}
                    </tbody>
                </table></>
            )
        }
    }
}