import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeEmissionData from "./VisualizeEmissionData";
import { Spinner } from 'react-bootstrap';

export default function V9(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(loading){
           if(data === null){   
                cnstr.V9Data().then(res => {
                    setTimeout(() => {storeData(res)}, "500");
                })
            }  
        }
    })

    function storeData(data){
        setData(data)
        setLoading(false)
    }

    function setMenu(){ if(props.menu) return <VisualizeEmissionData/>}

    function setContent(){
        if(loading) return (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
        else return <VisualizeData editorIndex={props.editorIndex} saveSeries={props.saveSeries} data={data} chartType="doughnut"/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}