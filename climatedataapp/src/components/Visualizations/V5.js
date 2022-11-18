import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";

export default function V5(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(data === null){
            setLoading(true);
            cnstr.V5Data().then(res => {
                setData(res);
                setTimeout(() => {setLoading(false)}, "500");
            })
        }
    })

    function setContent(){
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData data={data} reversed={true} chartType="line"/>
    }

    return (
        <div>
            <VisualizeTempData/>
            <hr/>
            {setContent()}
        </div>
    )
}