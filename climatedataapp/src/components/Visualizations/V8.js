import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeEmissionData from "./VisualizeEmissionData";

export default function V8(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(data === null){
            setLoading(true);
            cnstr.V8Data().then(res => {
                setData(res);
                setTimeout(() => {setLoading(false)}, "500");
            })
        }
    })

    function setMenu(){ if(props.menu) return <VisualizeEmissionData/>}

    function setContent(){
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData data={data} chartType="stacked"/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}