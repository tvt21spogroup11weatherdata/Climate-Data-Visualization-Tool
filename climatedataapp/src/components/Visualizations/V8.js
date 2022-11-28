import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeEmissionData from "./VisualizeEmissionData";

export default function V8(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(loading){
            window.sessionStorage.clear() //For debugging
           if(data === null){    
                if(window.sessionStorage.getItem("V8") === null){
                    cnstr.V8Data().then(res => {
                        setData(res)
                        setTimeout(() => {storeData(res)}, "500");
                    })
                }
                else {
                    setData(JSON.parse(window.sessionStorage.getItem("V8")))
                    setTimeout(() => {setLoading(false)}, "500");
                }
            }
        }
    })

    function storeData(data){
        window.sessionStorage.setItem("V8", JSON.stringify(data))
        setLoading(false)
    }

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