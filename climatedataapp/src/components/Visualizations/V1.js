import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";

export default function V1(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(data === null){
            setLoading(true);
            cnstr.V1Data().then(res => {
                setData(res);
                setTimeout(() => {setLoading(false)}, "500");
            })
        }
    })

    function setMenu(){ if(props.menu) return <VisualizeTempData/>}

    function setContent(){
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData data={data} v2error="true" chartType="line"/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}