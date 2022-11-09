import { useEffect, useState } from "react";
import VisualizeData from "./VisualizeData";
import {Data, DataSet} from '../../classes/Data';
import { Tab, Tabs } from "react-bootstrap";

export default function VisualizeTempData(){
    var v1Data, v3Data, v4Data, v5Data, v6Data, v7Data;
    var dataSets = [];

    //insert random numbers to data to draw test lines
    function InsertTestValues(data, min, max){
        for(var j = 0; j < data.set.length; j++){
            var max = Math.floor(max);

            for(var i = 0; i < 100; i++){
                const dataPoint = {x: i, y: Math.floor(Math.random() * (max - min) + min)};
                data.set[j].points[i] = dataPoint;
            }
        }
        
    }

    function V1Data(){
        //Global historical surface temperature anomalies from January 1850 onwards
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Global historical surface temperature anomalies from January 1850 onwards', 
            'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
            'https://gml.noaa.gov/ccgg/about/co2_measurements.html', 
            'HadCRUT5 is a gridded dataset of global historical surface temperature anomalies relative to a 1961-1990 reference period. Data are available for each month from January 1850 onwards, on a 5 degree grid and as global and regional average time series. The dataset is a collaborative product of the Met Office Hadley Centre and the Climatic Research Unit at the University of East Anglia.',
            'Northern Hemisphere temperature reconstruction for the past 2,000 years by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data.',
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
        data.set[6] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Northern Hemisphere 2,000-year temperature reconstruction',
            ' ',
            '\xB0C'
        );
        v1Data = data;
    }


    function V3Data(){
        //Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958', 
            'https://gml.noaa.gov/ccgg/trends/',
            'https://gml.noaa.gov/ccgg/about/co2_measurements.html', 
            'The graphs show monthly mean carbon dioxide measured at Mauna Loa Observatory, Hawaii. The carbon dioxide data on Mauna Loa constitute the longest record of direct measurements of CO2 in the atmosphere. They were started by C. David Keeling of the Scripps Institution of Oceanography in March of 1958 at a facility of the National Oceanic and Atmospheric Administration [Keeling, 1976]. NOAA started its own CO2 measurements in May of 1974, and they have run in parallel with those made by Scripps since then [Thoning, 1989].',
            '',
            'Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Monthly mean data',
            ' ',
            ' '
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Annual mean data',
            ' ',
            ' '
        );
        v3Data = data;
    }

    function V4Data(){
        //Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements', 
            'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat',
            'https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html', 
            'The CO2 records presented here are derived from three ice cores obtained at Law Dome, East Antarctica from 1987 to 1993. The Law Dome site satisfies many of the desirable characteristics of an ideal ice core site for atmospheric CO2 reconstructions including negligible melting of the ice sheet surface, low concentrations of impurities, regular stratigraphic layering undisturbed at the surface by wind or at depth by ice flow, and high snow accumulation rate. Further details on the site, drilling, and cores are provided in Etheridge et al. (1996), Etheridge and Wookey (1989), and Morgan et al (1997).',
            '',
            'Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Mean Ice Depth',
            ' ',
            'm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Ice Age',
            ' ',
            'A.D.'
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Mean Air Age',
            ' ',
            'A.D.'
        );
        data.set[3] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CO2 Mixing Ratio',
            ' ',
            'ppm'
        );
        data.set[4] = new DataSet (
            ' ',
            'Human Evolution and Activities',
            '',
            ''
        );
        v4Data = data;
    }

    function V5Data(){
        //Vostok Ice Core CO2 measurements, 417160 - 2342 years
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Vostok Ice Core CO2 measurements, 417160 - 2342 years', 
        'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2',
        'https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html', 
        'In January 1998, the collaborative ice-drilling project between Russia, the United States, and France at the Russian Vostok station in East Antarctica yielded the deepest ice core ever recovered, reaching a depth of 3,623 m (Petit et al. 1997, 1999). Ice cores are unique with their entrapped air inclusions enabling direct records of past changes in atmospheric trace-gas composition. Preliminary data indicate the Vostok ice-core record extends through four climate cycles, with ice slightly older than 400 kyr (Petit et al. 1997, 1999). Because air bubbles do not close at the surface of the ice sheet but only near the firn-ice transition (that is, at ~90 m below the surface at Vostok), the air extracted from the ice is younger than the surrounding ice (Barnola et al. 1991). Using semiempirical models of densification applied to past Vostok climate conditions, Barnola et al. (1991) reported that the age difference between air and ice may be ~6000 years during the coldest periods instead of ~4000 years, as previously assumed. Ice samples were cut with a bandsaw in a cold room (at about -15°C) as close as possible to the center of the core in order to avoid surface contamination (Barnola et al. 1983).',
        '',
        'Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Depth',
            ' ',
            ' '
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Age of the ice',
            ' ',
            ' '
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Mean age of the air',
            ' ',
            ' '
        );
        data.set[3] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CO2 Concentration',
            ' ',
            ' '
        );
        v5Data = data;
    }

    function V6Data(){
        //Ice core 800k year composite study CO2 measurements
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Ice core 800k year composite study CO2 measurement', 
        'https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt',
        'https://www.ncei.noaa.gov/access/paleo-search/study/17975', 
        'The European Project for Ice Coring in Antarctica Dome ice core from Dome C (EDC) has allowed for the reconstruction of atmospheric CO2 concentrations for the last 800,000 years. Here we revisit the oldest part of the EDC CO2 record using different air extraction methods and sections of the core. For our established cracker system, we found an analytical artifact, which increases over the deepest 200 m and reaches 10.1 +/- 2.4 ppm in the oldest/deepest part. The governing mechanism is not yet fully understood, but it is related to insufficient gas extraction in combination with ice relaxation during storage and ice structure. The corrected record presented here resolves partly - but not completely - the issue with a different correlation between CO2 and Antarctic temperatures found in this oldest part of the records. In addition, we provide here an update of 800,000 years atmospheric CO2 history including recent studies covering the last glacial cycle.',
        '',
        'Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'co2_ppm',
            ' ',
            'ppm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'co2_1s',
            ' ',
            'ppm'
        );
        v6Data = data;
    }

    function V7Data(){
        //Evolution of global temperature over the past two million years
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Evolution of global temperature over the past two million years', 
        'http://carolynsnyder.com/papers/Snyder_Data_Figures.zip',
        'https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf', 
        'Reconstructions of Earth’s past climate strongly influence our understanding of the dynamics and sensitivity of the climate system. Yet global temperature has been reconstructed for only a few isolated windows of time1,2, and continuous reconstructions across glacial cycles remain elusive. Here I present a spatially weighted proxy reconstruction of global temperature over the past 2 million years estimated from a multi-proxy database of over 20,000 sea surface temperature point reconstructions. Global temperature gradually cooled until roughly 1.2 million years ago and cooling then stalled until the present.',
        '',
        'Thousand Years', ' ', ' ' , ' '); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Change in Global Average Surface Temperature',
            ' ',
            '\xB0C'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'co2',
            ' ',
            'ppm'
        );
        data.set[2] = new DataSet (
            ' ',
            'Human Evolution and Activities',
            '',
            ''
        );

        v7Data = data;
    }

    V1Data();
    V3Data();
    V4Data();
    V5Data();
    V6Data();
    V7Data();
    InsertTestValues(v1Data, -2, 2);
    InsertTestValues(v3Data, 0, 400);
    InsertTestValues(v4Data, 0, 400);
    InsertTestValues(v5Data, 0, 400);
    InsertTestValues(v6Data, 0, 400);
    InsertTestValues(v7Data, 0, 400);

    function refreshw(){
        window.resizeBy(1,1);
    }
        return (
            <>  
           <Tabs width="100%" defaultActiveKey="actor" transition={false} id="noanim-tab-example" onSelect={refreshw} className="mb-3 nav-fill">
                <Tab eventKey="v1" title="Global historical surface temperature anomalies from January 1850 onwards" wrapped="true">
                    {/*V1 Global historical surface temperature anomalies from January 1850 onwards
                    V2 option Northern Hemisphere 2,000-year temperature reconstruction*/}
                    <div><VisualizeData data={v1Data} chartType="line"/></div> 
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