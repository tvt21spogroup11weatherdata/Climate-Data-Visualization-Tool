import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import { DataConstructor} from '../../classes/Data';
import { Tab, Tabs } from "react-bootstrap";

//Creates visualizations V1-7 & V10
export default function VisualizeTempData(){
    const [loading, setLoading] = useState(true);
    const [v1Data, setV1] = useState(null);
    const [v3Data, setV3] = useState(null);
    const [v5Data, setV5] = useState(null);
    const [v6Data, setV6] = useState(null);
    //Constructs Data objects and inserts values
    var v7Data;
    var cnstr = new DataConstructor();

   // v4Data = cnstr.V4Data();
   // v5Data = cnstr.V5Data();
  //  v6Data = cnstr.V6Data();
  //  v7Data = cnstr.V7Data();
    
    let v1vis = null;
    //////////////////////////////////////////////////////////////////////////////
    /// CONVOLUTED WAY TO MAKE SURE THE TAB SIZE IS PROPAGATED TO THE CHART'S OPTIONS BEFORE IT LOADS (blame canvasjs)
    useEffect(() => {
        if(v1Data === null){
            setLoading(true);
            cnstr.V1Data().then(res => {
                setV1(res);
                setTimeout(() => {setLoading(false)}, "1000");
            })
        }
        if(v3Data === null){
            setLoading(true);
            cnstr.V3Data().then(res => {
                setV3(res);
                setTimeout(() => {setLoading(false)}, "1000");
            })
        }
        if(v5Data === null){
            setLoading(true);
            cnstr.V5Data().then(res => {
                setV5(res);
                setTimeout(() => {setLoading(false)}, "1000");
            })
        }
        if(v6Data === null){
            setLoading(true);
            cnstr.V6Data().then(res => {
                setV6(res);
                setTimeout(() => {setLoading(false)}, "1000");
            })
        }
    })


 //////////////////////////////////////////////////////////////////////////////
    /// CONVOLUTED WAY TO MAKE SURE THE TAB SIZE IS PROPAGATED TO THE CHART'S OPTIONS BEFORE IT LOADS (blame canvasjs)
    if(loading === true) { if(v1Data !== null && v3Data !== null && v5Data !== null) setLoading(false); }
    function loadTab(){
        setLoading(true);
    }
    ///////////////////////////////////////////////////////////////////////////

    if(!loading){
        return (
            <> 
           <Tabs fill justify width="100%" defaultActiveKey="actor" onSelect={loadTab} transition={false}  id="noanim-tab-example" className="mb-3 nav-fill" aria-label="wrapped label tabs example">
                <Tab eventKey="v1" title="Global historical surface temperature anomalies from January 1850 onwards" wrapped="true">
                    <div><VisualizeData data={v1Data} v2error="true" chartType="line"/></div> 
                </Tab>
                
                <Tab eventKey="v3" title="Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958" wrapped="true">
                    <div><VisualizeData data={v3Data} chartType="line"/></div> 
                </Tab>
                {/*
                <Tab eventKey="v4" title="Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements" wrapped="true">
                    <div><VisualizeData human={true} data={v4Data} chartType="line"/></div> 
        </Tab>*/}
                
                <Tab eventKey="v5" title="Vostok Ice Core CO2 measurements, 417160 - 2342 years" wrapped="true">
                    <div><VisualizeData data={v5Data} reversed={true} chartType="line"/></div> 
                </Tab>
                
                <Tab eventKey="v6" title="Ice core 800k year composite study CO2 measurements" wrapped="true">
                    <div><VisualizeData data={v6Data} reversed={true} chartType="line"/></div> 
                </Tab>
                {/*
                <Tab eventKey="v7" title="Evolution of global temperature over the past two million years" wrapped="true">
                    <div><VisualizeData data={v7Data} chartType="multiaxis"/></div> 
                </Tab>
                */}
          </Tabs>

            </>
        )
    }
    else {
        
        return (
            <div>Loading</div>
        )
    }
        
}