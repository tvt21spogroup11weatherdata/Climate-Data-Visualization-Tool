import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeEmissionData from "./VisualizeEmissionData";
import { Spinner } from 'react-bootstrap';

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
        if(loading) return (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
        else return <VisualizeData editorIndex={props.editorIndex} stackedProps={props.stackedProps} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} data={data} chartType="stacked"/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}