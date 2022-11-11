import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet, DataConstructor} from '../../classes/Data';
import { Tab, Tabs } from "react-bootstrap";

export default function VisualizeTempData(){
    const [loading, setLoading] = useState(true);
    var v1Data, v3Data, v4Data, v5Data, v6Data, v7Data;
    var cnstr = new DataConstructor();

    v1Data = cnstr.V1Data();
    v3Data = cnstr.V3Data();
    v4Data = cnstr.V4Data();
    v5Data = cnstr.V5Data();
    v6Data = cnstr.V6Data();
    v7Data = cnstr.V7Data();
    

    //////////////////////////////////////////////////////////////////////////////
    /// CONVOLUTED WAY TO MAKE SURE THE TAB SIZE IS PROPAGATED TO THE CHART'S OPTIONS BEFORE IT LOADS (blame canvasjs)
    if(loading === true) { setLoading(false);}

    function loadTab(){
        console.log("loading")
        setLoading(true);
    }
    ///////////////////////////////////////////////////////////////////////////

    if(!loading){
        return (
            <> 
           <Tabs fill justify width="100%" defaultActiveKey="actor" transition={false} onSelect={loadTab} id="noanim-tab-example" className="mb-3 nav-fill" aria-label="wrapped label tabs example">
                <Tab eventKey="v1" title="Global historical surface temperature anomalies from January 1850 onwards" wrapped="true">
                    {/*V1 Global historical surface temperature anomalies from January 1850 onwards
                    V2 option Northern Hemisphere 2,000-year temperature reconstruction*/}
                    <div><VisualizeData data={v1Data} v2error="true" chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v3" title="Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958" wrapped="true">
                    {/*V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958*/}
                    <div><VisualizeData data={v3Data} chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v4" title="Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements" wrapped="true">
                    {/*V4 Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements*/}
                    <div><VisualizeData human={true} data={v4Data} chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v5" title="Vostok Ice Core CO2 measurements, 417160 - 2342 years" wrapped="true">
                    {/*V5 Vostok Ice Core CO2 measurements, 417160 - 2342 years*/}
                    <div><VisualizeData data={v5Data} chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v6" title="Ice core 800k year composite study CO2 measurements" wrapped="true">
                    {/*V6 Ice core 800k year composite study CO2 measurements*/}
                    <div><VisualizeData data={v6Data} chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v7" title="Evolution of global temperature over the past two million years" wrapped="true">
                    {/*V7 Evolution of global temperature over the past two million years*/}
                    <div><VisualizeData data={v7Data} chartType="multiaxis"/></div> 
                </Tab>
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