import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { Data, DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";

export default function V1(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(loading){
           if(data === null){    
                if(window.sessionStorage.getItem("V1") === null){
                    cnstr.V1Data().then(res => {
                        setData(res)
                        setTimeout(() => {storeData(res)}, "500");
                    })
                }
                else {
                    setData(JSON.parse(window.sessionStorage.getItem("V1")))
                    setTimeout(() => {setLoading(false)}, "500");
                }
            }
        }
    })

    function storeData(data){
        window.sessionStorage.setItem("V1", JSON.stringify(data))
        setLoading(false)
    }

    function setMenu(){ if(props.menu) return <VisualizeTempData/>}

    function setContent(){
        
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData editorIndex={props.editorIndex} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} data={data} v2error="true" chartType="line" interval={10}/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}