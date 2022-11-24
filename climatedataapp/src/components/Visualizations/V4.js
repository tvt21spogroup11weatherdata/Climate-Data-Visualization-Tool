import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";

export default function V4(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(data === null){
            setLoading(true);
            cnstr.V4Data().then(res => {
                setData(res);
                setTimeout(() => {setLoading(false)}, "500");
            })
        }
    })

    function setMenu(){ if(props.menu) return <VisualizeTempData/>}

    function setContent(){
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData data={data} chartType="line" interval={100} human={true}/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}