import { useEffect } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet} from '../classes/Data';

export default function VisualizeEmissionData(){

    var stackedData = new Data()
    var doughnutData = new Data()

    function GetData(){
            
        stackedData.set[0] = new DataSet();
        stackedData.set[1] = new DataSet();
    
        stackedData.title = "Kiinnostuksen suhde motivaatioon"
        stackedData.set[0].yTitle = "kiinnostus"
        stackedData.set[1].yTitle = "motivaatio"
    
        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: i + 1};
            stackedData.set[0].points[i] = dataPoint;
        }
    
        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: i + 2};
            stackedData.set[1].points[i] = dataPoint;
        }

        stackedData.title = "Olotila vuodenaikojen mukaan"
        stackedData.yTitle = "CO2 emissions"

        doughnutData.set[0] = new DataSet()

        for(var i = 0; i < 6; i++){
            doughnutData.set[0].points[i] = {name: 'datapointti' + i, y: i}
        }
    }

    
    useEffect(() => {
        GetData();
    })
    GetData();

    return (
            <>  
                {/*V1 Global historical surface temperature anomalies from January 1850 onwards
                V2 option Northern Hemisphere 2,000-year temperature reconstruction*/}
                <div><VisualizeData data={stackedData} chartType="stacked"/></div> 

                {/*V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958*/}
                <div><VisualizeData data={doughnutData} chartType="doughnut"/></div> 
            </>
        )
}