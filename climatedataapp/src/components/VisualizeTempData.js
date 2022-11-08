import { useEffect } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet} from '../classes/Data';

export default function VisualizeTempData(){

    var lineData;
    var multiAxisData;

    /////////////////////////////////////
    //// TEST DATA

    function GetData(){
        lineData = new Data();
        lineData.set[0] = new DataSet();
        lineData.title = "Kiinnostuskäyrä"
        lineData.set[0].yTitle = "kiinnostus"

        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: i + 1};
            lineData.set[0].points[i] = dataPoint;
        }

        multiAxisData = new Data();

        multiAxisData.set[0] = new DataSet();
        multiAxisData.set[1] = new DataSet();
    
        multiAxisData.title = "Kiinnostuksen suhde motivaatioon"
        multiAxisData.set[0].yTitle = "kiinnostus"
        multiAxisData.set[1].yTitle = "motivaatio"
    
        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: i + 1};
            multiAxisData.set[0].points[i] = dataPoint;
        }
    
        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: i + 2};
            multiAxisData.set[1].points[i] = dataPoint;
        }
    }
    /////////////////////////////////////
    
    useEffect(() => {
        GetData();
    })
    GetData();

    if(lineData !== null){
        return (
            <>  
                {/*V1 Global historical surface temperature anomalies from January 1850 onwards
                V2 option Northern Hemisphere 2,000-year temperature reconstruction*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 

                {/*V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 

                {/*V4 Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 

                {/*V5 Vostok Ice Core CO2 measurements, 417160 - 2342 years*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 

                {/*V6 Ice core 800k year composite study CO2 measurements*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 

                {/*V7 Evolution of global temperature over the past two million years*/}
                <div><VisualizeData data={multiAxisData} chartType="multiaxis"/></div> 

                {/*V10 Human Evolution and Activities*/}
                <div><VisualizeData data={lineData} chartType="line"/></div> 
            </>
        )
    }

}