import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet} from '../../classes/Data';
import { Tab, Tabs } from "react-bootstrap";

export default function VisualizeTempData(){
    const [loading, setLoading] = useState(true);
    var v8Data, v9Data;
    var subSectors = [];
    var subSubSectors = [];

    //insert random numbers to data to draw test lines
    function InsertTestValues(data, min, max){
        for(var j = 0; j < data.set.length; j++){
            var max = Math.floor(max);
            var maxite = 20;
            for(var i = 0; i < maxite; i++){
                const dataPoint = {x: i, y: Math.floor(Math.random() * (max - min) + min)};
                data.set[j].points[i] = dataPoint;
            }
        }
    }

    function V8Data(){
        //CO2 emissions by country
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'CO2 emissions by country', 
            'https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D',
            'https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021', 
            'Accurate assessment of anthropogenic carbon dioxide (CO2) emissions and their redistribution among the atmosphere, ocean, and terrestrial biosphere in a changing climate is critical to better understand the global carbon cycle, support the development of climate policies, and project future climate change. Here we describe and synthesize datasets and methodology to quantify the five major components of the global carbon budget and their uncertainties. Fossil CO2 emissions (EFOS) are based on energy statistics and cement production data, while emissions from land-use change (ELUC), mainly deforestation, are based on land use and land-use change data and bookkeeping models.',
            ' ',
            'Years', ' ', ' ' , ' '); 

        //FOREACH COUNTRY ADD SET
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CountryName',
            ' ',
            ' '
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CountryName',
            ' ',
            ' '
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CountryName',
            ' ',
            ' '
        );
        v8Data = data;
    }


    function V9Data(){
       

        //CO2 emissions by sectors
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'CO2 emissions by sectors', 
            'https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx',
            'https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector', 
            'The above charts looked total greenhouse gas emissions – this included other gases such as methane, nitrous oxide, and smaller trace gases. How does this breakdown look if we focus only on carbon dioxide (CO2) emissions? Where does our CO2 come from? This chart shows the distribution of CO2 emissions across sectors.',
            '',
            'Years', ' ', ' ' , ' '); 
        //foreach sector create set
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );
        
        //foreach sector
        subSectors[0] = new Data('Energy');
        subSectors[1] = new Data('Industrial processes');
        subSectors[2] = new Data('Waste');
        subSectors[3] = new Data('Agriculture, Forestry & Land Use (AFOLU)');

        var numberOfSectors = 4;

        for(var i = 0; i < numberOfSectors; i++){
            const dataPoint = {x: subSectors[i].title, y: Math.floor(Math.random() * (100 - 0) + 0)};
            data.set[0].points[i] = dataPoint;
            subSectors[i].set[0] = new DataSet();
            

            var numberOfSubSectors = 6
            for(var j = 0; j < numberOfSubSectors; j++){
                subSectors[i].set[0].points[j] = {x: "Subsector title", y: Math.floor(Math.random() * (100 - 0) + 0)};

                var numberOfSubSubSectors = 4;

                for(var k = 0; k < numberOfSubSubSectors; k++){
                    subSubSectors[j] = new Data()
                    subSubSectors[j].title = "Subsubsector title"
                    subSubSectors[j].set[j] = new DataSet()
                    
                    
                    
                    subSubSectors[j].set[j].points[k] = {x: "Subsubsector title", y: Math.floor(Math.random() * (100 - 0) + 0)};
                }
            }
        }

        
        //foreach subsector
        //subSectors.set[0] = new DataSet('Transport')

        v9Data = data;
    }

    V8Data();
    V9Data();
    InsertTestValues(v8Data, 0, 400);

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
                    {/*CO2 emissions by country*/}
                    <div><VisualizeData data={v8Data} chartType="stacked"/></div> 
                </Tab>
                <Tab eventKey="v3" title="CO2 emissions by sectors" wrapped="true">
                    {/*CO2 emissions by sectors*/}
                    <div><VisualizeData data={v9Data} subSectors={subSectors} subSubSectors={subSubSectors} chartType="doughnut"/></div> 
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