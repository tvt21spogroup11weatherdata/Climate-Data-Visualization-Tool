import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet} from '../../classes/Data';

export default function VisualizeTempData(){

    var v1Data, v3Data, v4Data, v5Data, v6Data, v7Data, v10Data;
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
    function InsertTestValues(set){
        var min = -2
        var max = Math.floor(3);

        for(var i = 0; i < 100; i++){
            const dataPoint = {x: i, y: Math.floor(Math.random() * (max - min) + min)};
            set.points[i] = dataPoint;
        }
    }

    function V1Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Global historical surface temperature anomalies from January 1850 onwards', 
            'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
            'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
            'HadCRUT5 is a gridded dataset of global historical surface temperature anomalies relative to a 1961-1990 reference period. Data are available for each month from January 1850 onwards, on a 5 degree grid and as global and regional average time series. The dataset is a collaborative product of the Met Office Hadley Centre and the Climatic Research Unit at the University of East Anglia.',
            'Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Global Annual',
            ' ',
            '\xB0C'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Global Monthly',
            ' ',
            '\xB0C'
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Northern hemisphere annual',
            ' ',
            '\xB0C'
        );
        data.set[3] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Northern hemisphere monthly',
            ' ',
            '\xB0C'
        );
        data.set[4] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Southern hemisphere annual',
            ' ',
            '\xB0C'
        );
        data.set[5] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Southern hemisphere monthly',
            ' ',
            '\xB0C'
        );
        v1Data = data;

        for(var i = 0; i < data.set.length; i++){
            InsertTestValues(data.set[i]);
        }
    }



    function V3Data(){

    }

    function V4Data(){

    }

    function V5Data(){

    }

    function V6Data(){

    }

    function V7Data(){

    }

    function V10Data(){

    }

    function dataAvailable(){
        if(v1Data === null) return false;
        if(lineData === null) return false;
        if(multiAxisData === null) return false;
        return true;
    }


    V1Data();
    GetData();
   
    if(dataAvailable()){

        return (
            <>  
                {/*V1 Global historical surface temperature anomalies from January 1850 onwards
                V2 option Northern Hemisphere 2,000-year temperature reconstruction*/}
                <div><VisualizeData data={v1Data} chartType="line"/></div> 
                
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