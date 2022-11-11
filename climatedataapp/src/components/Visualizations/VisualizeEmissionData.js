import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet, DataConstructor} from '../../classes/Data';
import { Tab, Tabs } from "react-bootstrap";

//Creates visualizations V8 & V9
export default function VisualizeTempData(){
    const [loading, setLoading] = useState(true);
    var cnstr = new DataConstructor();
    var v8Data, v9Data;
    var subSectors, subSubSectors;

    v8Data = cnstr.V8Data();
    v9Data = cnstr.V9Data(subSectors, subSubSectors);
    
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
                <Tab eventKey="v1" title="CO2 emissions by country" wrapped="true">
                    <div><VisualizeData data={v8Data} chartType="stacked"/></div> 
                </Tab>
                {/* DOUGHNUT IS BROKE
                <Tab eventKey="v3" title="CO2 emissions by sectors" wrapped="true">
                    {/*CO2 emissions by sectors}
                    <div><VisualizeData data={v9Data} subSectors={subSectors} subSubSectors={subSubSectors} chartType="doughnut"/></div> 
                </Tab></>*/}
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