import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";

export default function V5(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(loading){
           if(data === null){    
                if(window.sessionStorage.getItem("V5") === null){
                    cnstr.V5Data().then(res => {
                        console.log("db")
                        setData(res)
                        setTimeout(() => {storeData(res)}, "500");
                    })
                }
                else {
                    setData(JSON.parse(window.sessionStorage.getItem("V5")))
                    setTimeout(() => {setLoading(false)}, "500");
                }
            }
        }
    })

    function storeData(data){
        window.sessionStorage.setItem("V5", JSON.stringify(data))
        setLoading(false)
    }

    function setMenu(){ if(props.menu) return <VisualizeTempData/>}

    function setContent(){
        if(loading) return (<img src="https://i.imgur.com/Pdr7Mvk.gif"/>)
        else return <VisualizeData data={data} reversed={true} chartType="line" interval={100}/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}