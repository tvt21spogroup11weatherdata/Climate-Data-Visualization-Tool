import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import VisualizeTempData from "./VisualizeTempData";
import { Spinner } from 'react-bootstrap';

export default function V4(props){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    var cnstr = new DataConstructor();
    
    useEffect(() => {
        if(loading){
           if(data === null){   
                cnstr.V4Data().then(res => {
                    setTimeout(() => {storeData(res)}, "1000");
                })
            }  
        }
    })

    function storeData(data){
        setData(data)
        setLoading(false)
    }

    function setMenu(){ if(props.menu) return <VisualizeTempData/>}

    function setContent(){
        if(loading) return (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
        else return <VisualizeData editorIndex={props.editorIndex} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} data={data} chartType="line" interval={100} human={true}/>
    }

    return (
        <div>
            {setMenu()}
            <hr/>
            {setContent()}
        </div>
    )
}