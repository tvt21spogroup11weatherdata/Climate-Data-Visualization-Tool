import axios from "axios";
//require('dotenv')

//Class for the descriptive data inserted into a chart
export class Data{
    title = 'Title'
    index = '' 
    source = 'source link'
    desc = 'desc link'
    set = []; //DataSet array for multiple series
    longDesc = 'tähän pitkä descriptioni siitä datasta mitä tässä nyt ollaan analysoimassa ja sillee lorem ipsum jii än ee'
    longDesc2 = 'tähän lisädescriptioni jos sitä tarvitaan'
    xTitle = 'äks akseli'
    yTitle = 'yy'
    xPrefix = ' '
    xSuffix = ' '
    chartType = ' '

    constructor(title, source, desc, longDesc, longDesc2, xTitle, yTitle, xPrefix, xSuffix, index){
        this.title = title;
        this.source = source;
        this.desc = desc;
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.xPrefix = xPrefix;
        this.xSuffix = xSuffix;
        this.longDesc = longDesc;
        this.longDesc2 = longDesc2;
    }
}

//Class for the actual data inserted into the chart
export class DataSet {
    xTitle = "äks akseli"
    yTitle = "yy akseli"
    listDesc = false
    prefix = ' '
    suffix = ' '
    points = [];
    enabled = ' ' //Is the series enabled when the chart is loaded?

    constructor(xTitle, yTitle, prefix, suffix){
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.prefix = prefix;
        this.suffix = suffix;
    }
}

//Class for constructing the Data objects as per the Visualization requirements
export class DataConstructor{
    url = "http://localhost:3001"
    headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin'}
    
    testSet(){
       // localStorage.setItem("name", "moi")
        
       var random = Math.floor(Math.random() * 4)
       console.log(random)
       if(random === 0) window.localStorage.setItem("name" + String(random), "anni")
       if(random === 1) window.localStorage.setItem("name" + String(random), "terho")
       if(random === 2) window.localStorage.setItem("name" + String(random), "tino")
       if(random === 3) window.localStorage.setItem("name" + String(random), "ville")
        console.log(window.localStorage)
    }
    
    testGet(i){
        //console.log(window.localStorage.getItem("name"+i))
        if(window.localStorage.getItem("name"+i)){
            
        }
    }

    //Construct Data object by index
    async GetByIndex(i){
        if(i === 0) return this.V1Data()
        if(i === 1) return this.V4Data()
        if(i === 2) return this.V5Data()
        if(i === 3) return this.V6Data()
        if(i === 4) return this.V7Data()
        if(i === 5) return this.V8Data()
        if(i === 6) return this.V9Data()
    }

    async V1Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Global historical surface temperature anomalies from January 1850 onwards', 
            'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
            'https://gml.noaa.gov/ccgg/about/co2_measurements.html', 
            'HadCRUT5 is a gridded dataset of global historical surface temperature anomalies relative to a 1961-1990 reference period. Data are available for each month from January 1850 onwards, on a 5 degree grid and as global and regional average time series. The dataset is a collaborative product of the Met Office Hadley Centre and the Climatic Research Unit at the University of East Anglia.',
            'Northern Hemisphere temperature reconstruction for the past 2,000 years by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data.',
            'Years', ' ', '' , '', '0'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Global Annual',
            ' ',
            '\xB0C',
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
        //Uncertainty values error chart:
        data.set[7] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Northern Hemisphere 2,000-year temperature reconstruction ERROR',
            ' ',
            '\xB0C'
        );
        //Uncertainty values range area chart:
        data.set[8] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Northern Hemisphere 2,000-year temperature reconstruction RANGE AREA',
            ' ',
            '\xB0C'
        );

        data.chartType="line"
        var set0 = new DataSet()
        
        //SET 0
        axios.get(this.url + '/hadcrutglobalannual', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year, y: response.data[i].Anomaly};
               //const dataPoint = new DataPoint(response.data[i].Year,response.data[i].Anomaly)
              //  const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set0.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        
        data.set[0].points = set0.points;

        //SET 1
        let set1 = new DataSet()
        axios.get(this.url + '/hadcrutglobalmonthly', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year + (1/12) * response.data[i].Month, y: response.data[i].Anomaly};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set1.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[1].points = set1.points;


        //SET 2
        let set2 = new DataSet()
        axios.get(this.url + '/hadcrutnorthernhemisphereannual', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year, y: response.data[i].Anomaly};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set2.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[2].points = set2.points;


        //SET 3
        let set3 = new DataSet()
        axios.get(this.url + '/hadcrutnorthernhemispheremonthly', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year + (1/12) * response.data[i].Month, y: response.data[i].Anomaly};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set3.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[3].points = set3.points;

        //SET 4
        let set4 = new DataSet()
        axios.get(this.url + '/hadcrutsouthernhemisphereannual', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year, y: response.data[i].Anomaly};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set4.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[4].points = set4.points;


        //SET 5
        var set5 = new DataSet()
        axios.get(this.url + '/hadcrutsouthernhemispheremonthly', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year + (1/12) * response.data[i].Month, y: response.data[i].Anomaly};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set5.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[5].points = set5.points;

        //SET 6 V2
        
        var set6 = new DataSet()
        axios.get(this.url + '/northerntempreconstruction', {
            headers: this.headers
            }).then((response) => {
             //  console.log(response.data);

            for(var i = 1849; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Year, y: response.data[i].T};
                //const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set6.points.push(dataPoint);
            }
            data.set[6].points = set6.points;
        }).catch (error => {
            alert(error)
        })

        return data
    }


    async V3Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958', 
            'https://gml.noaa.gov/ccgg/trends/',
            'https://gml.noaa.gov/ccgg/about/co2_measurements.html', 
            'The graphs show monthly mean carbon dioxide measured at Mauna Loa Observatory, Hawaii. The carbon dioxide data on Mauna Loa constitute the longest record of direct measurements of CO2 in the atmosphere. They were started by C. David Keeling of the Scripps Institution of Oceanography in March of 1958 at a facility of the National Oceanic and Atmospheric Administration [Keeling, 1976]. NOAA started its own CO2 measurements in May of 1974, and they have run in parallel with those made by Scripps since then [Thoning, 1989].',
            '',
            'Years', ' ', 'Year' , 'A.D.', '1'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Monthly mean data',
            ' ',
            'ppm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Annual mean data',
            ' ',
            'ppm'
        );

        data.chartType="line";

                
        let set0 = new DataSet()

        //SET 0
        axios.get(this.url + '/maunaloaco2monthly', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].year + (1/12) * response.data[i].month, y: response.data[i].average};
              //  const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set0.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[0].points = set0.points;


        let set1 = new DataSet()

        //SET 1
        axios.get(this.url + '/maunaloaco2annual', {
            headers: this.headers
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].year, y: response.data[i].mean};
                set1.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })

        data.set[1].points = set1.points;



        return data;
    }

    async V4Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements', 
            'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat',
            'https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html', 
            'The CO2 records presented here are derived from three ice cores obtained at Law Dome, East Antarctica from 1987 to 1993. The Law Dome site satisfies many of the desirable characteristics of an ideal ice core site for atmospheric CO2 reconstructions including negligible melting of the ice sheet surface, low concentrations of impurities, regular stratigraphic layering undisturbed at the surface by wind or at depth by ice flow, and high snow accumulation rate. Further details on the site, drilling, and cores are provided in Etheridge et al. (1996), Etheridge and Wookey (1989), and Morgan et al (1997).',
            '',
            'Years', ' ', 'Year' , 'A.D.', '2'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Ice core DE08',
            ' ',
            'ppm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Ice core DE08-2',
            ' ',
            'ppm.'
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Ice core DSS',
            ' ',
            'ppm.'
        );
        data.set[3] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Atmospheric CO2 concentrations from Mauna Loa annual',
            ' ',
            'ppm'
        );
        data.set[4] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Atmospheric CO2 concentrations from Mauna Loa monthly',
            ' ',
            'ppm'
        );
        data.set[5] = new DataSet (
            ' ',
            'Human Evolution and Activities',
            '',
            ''
        );

        
        
        data.chartType="line";

        //GET DATA HERE
 //       this.InsertTestValues(data, 0, 400);
        
        
        
        
        //SET 0
        let set0 = new DataSet()
        axios.get(this.url + '/lawdome/DE08', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin'
            }
        }).then((response) => {
            for(var i = 0; i < response.data.length; i+=1){
                const dataPoint1 = {x: response.data[i].Mean_Air_Age_year_AD, y: response.data[i].CO2_Mixing_Ratio_ppm};
                set0.points.push(dataPoint1);
            }
        }).catch (error => {alert(error)})
        data.set[0].points = set0.points

        //SET 1
        let set1 = new DataSet()
        axios.get(this.url + '/lawdome/DE08-2', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin'
            }
        }).then((response) => {
            for(var i = 0; i < response.data.length; i+=1){
                const dataPoint1 = {x: response.data[i].Mean_Air_Age_year_AD, y: response.data[i].CO2_Mixing_Ratio_ppm};
                set1.points.push(dataPoint1);
            }
        }).catch (error => {alert(error)})
        data.set[1].points = set1.points

        //SET 2
        let set2 = new DataSet()
        axios.get(this.url + '/lawdome/DSS', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin'
            }
        }).then((response) => {
            for(var i = 0; i < response.data.length; i+=1){
                const dataPoint1 = {x: response.data[i].Mean_Air_Age_year_AD, y: response.data[i].CO2_Mixing_Ratio_ppm};
                set2.points.push(dataPoint1);
            }
        }).catch (error => {alert(error)})
        data.set[2].points = set2.points

        //SET 3
        let set3 = new DataSet()
        axios.get(this.url + '/maunaloaco2annual', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin'
            }
        }).then((response) => {
            for(var i = 0; i < response.data.length; i+=1){
                const dataPoint1 = {x: response.data[i].year, y: response.data[i].mean};
                set3.points.push(dataPoint1);
            }
        }).catch (error => {alert(error)})
        data.set[3].points = set3.points

        let set4 = new DataSet()

        //SET 4
        axios.get(this.url + '/maunaloaco2monthly', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].year + (1/12) * response.data[i].month, y: response.data[i].average};
              //  const uncertaintyPoint = {x: response.data[i].Year, y: [response.data[i].Lower_confidence_limit, response.data[i].Upper_confidence_limit]}
                set4.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[4].points = set4.points;


        //SET 5
        let set5 = new DataSet()
        axios.get(this.url + '/human_evolution/1022', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: 2022 - parseInt(response.data[i].BP), y: response.data[i].event};
                set5.points.push(dataPoint);
            }
        }).catch (error => {
            alert(error)
        })
        data.set[5].points = set5.points
        data.set[5].listDesc = true;
        //console.log(data)

        return data;
    }

    async V5Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Vostok Ice Core CO2 measurements, 417160 - 2342 years', 
        'https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2',
        'https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html', 
        'In January 1998, the collaborative ice-drilling project between Russia, the United States, and France at the Russian Vostok station in East Antarctica yielded the deepest ice core ever recovered, reaching a depth of 3,623 m (Petit et al. 1997, 1999). Ice cores are unique with their entrapped air inclusions enabling direct records of past changes in atmospheric trace-gas composition. Preliminary data indicate the Vostok ice-core record extends through four climate cycles, with ice slightly older than 400 kyr (Petit et al. 1997, 1999). Because air bubbles do not close at the surface of the ice sheet but only near the firn-ice transition (that is, at ~90 m below the surface at Vostok), the air extracted from the ice is younger than the surrounding ice (Barnola et al. 1991). Using semiempirical models of densification applied to past Vostok climate conditions, Barnola et al. (1991) reported that the age difference between air and ice may be ~6000 years during the coldest periods instead of ~4000 years, as previously assumed. Ice samples were cut with a bandsaw in a cold room (at about -15°C) as close as possible to the center of the core in order to avoid surface contamination (Barnola et al. 1983).',
        '',
        'Mean age of the air', 'CO2 Concentration, Depth of ice', ' ' , ' ka', '3'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CO2 Concentration',
            ' ',
            'ppm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Depth of ice',
            ' ',
            'hm'
        );

        data.chartType="line";

        let set0 = new DataSet()
        let set1 = new DataSet()
        //SET 0
        axios.get(this.url + '/vostokicecoreco2', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i+=1){
                const dataPoint1 = {x: 0.001 * response.data[i].Mean_age_of_the_air, y: response.data[i].CO2};
                set0.points.push(dataPoint1);
                const dataPoint2 = {x: 0.001 * response.data[i].Mean_age_of_the_air, y: 0.1 * response.data[i].Depth};
                set1.points.push(dataPoint2);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[0].points = set0.points;
        data.set[1].points = set1.points;
        return data;
    }

    async V6Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Ice core 800k year composite study CO2 measurement', 
        'https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt',
        'https://www.ncei.noaa.gov/access/paleo-search/study/17975', 
        'The European Project for Ice Coring in Antarctica Dome ice core from Dome C (EDC) has allowed for the reconstruction of atmospheric CO2 concentrations for the last 800,000 years. Here we revisit the oldest part of the EDC CO2 record using different air extraction methods and sections of the core. For our established cracker system, we found an analytical artifact, which increases over the deepest 200 m and reaches 10.1 +/- 2.4 ppm in the oldest/deepest part. The governing mechanism is not yet fully understood, but it is related to insufficient gas extraction in combination with ice relaxation during storage and ice structure. The corrected record presented here resolves partly - but not completely - the issue with a different correlation between CO2 and Antarctic temperatures found in this oldest part of the records. In addition, we provide here an update of 800,000 years atmospheric CO2 history including recent studies covering the last glacial cycle.',
        '',
        'Thousands of years (ka) before 2016', 'CO2 Concentrations', '' , 'ka', '4'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CO2 ',
            ' ',
            'ppm'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CO2 sigma mean',
            'Sigma mean ',
            'ppm'
        );

        data.chartType="line";

        let set0 = new DataSet()
        let set1 = new DataSet()

        //SET 0
        axios.get(this.url + '/icecore800kco2', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {

            for(var i = 0; i < response.data.length; i++){
                const dataPoint1 = {x: 0.001 * response.data[i].years_before_2016, y: response.data[i].co2_ppm};
                set0.points.push(dataPoint1);
                const dataPoint2 = {x: 0.001 * response.data[i].years_before_2016, y: response.data[i].co2_1s_ppm};
                set1.points.push(dataPoint2);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[0].points = set0.points;
        data.set[1].points = set1.points;
        
        return data;
    }

    async V7Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
        'Evolution of global temperature over the past two million years combined with ice core 800k year composite study CO2 measurement and human evolution and activities', 
        'http://carolynsnyder.com/papers/Snyder_Data_Figures.zip',
        'https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf', 
        'Reconstructions of Earth’s past climate strongly influence our understanding of the dynamics and sensitivity of the climate system. Yet global temperature has been reconstructed for only a few isolated windows of time1,2, and continuous reconstructions across glacial cycles remain elusive. Here I present a spatially weighted proxy reconstruction of global temperature over the past 2 million years estimated from a multi-proxy database of over 20,000 sea surface temperature point reconstructions. Global temperature gradually cooled until roughly 1.2 million years ago and cooling then stalled until the present.',
        '',
        'Years Before Present', '', '' , '', '5'); 
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            'Year',
            'Change in Global Average Surface Temperature',
            ' ',
            '\xB0C'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'Ice core 800k year composite study CO2 measurements',
            ' ',
            'ppm'
        );
        data.set[2] = new DataSet (
            ' ',
            'Human Evolution and Activities',
            '',
            'BP'
        );
        

        data.chartType="multiaxis";
        
        //SET 0
        let set0 = new DataSet()
        axios.get(this.url + '/snyder_temperature_evolution', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: 1000 * response.data[i].kyr_BP, y: response.data[i].l_97p5};
                set0.points.push(dataPoint);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[0].points = set0.points;

        

        //SET 1
        let set1 = new DataSet()
        axios.get(this.url + '/icecore800kco2', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {

            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].years_before_2016, y: response.data[i].co2_ppm};
                set1.points.push(dataPoint);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[1].points = set1.points;

        //SET 2
        let set2 = new DataSet()
        axios.get(this.url + '/human_evolution', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: parseInt(response.data[i].BP), y: response.data[i].event};
                set2.points.push(dataPoint);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[2].points = set2.points;

        data.set[2].listDesc = true;

        return data;
    }

    async V8Data(){
        let data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'CO2 emissions by country', 
            'https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D',
            'https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021', 
            'Accurate assessment of anthropogenic carbon dioxide (CO2) emissions and their redistribution among the atmosphere, ocean, and terrestrial biosphere in a changing climate is critical to better understand the global carbon cycle, support the development of climate policies, and project future climate change. Here we describe and synthesize datasets and methodology to quantify the five major components of the global carbon budget and their uncertainties. Fossil CO2 emissions (EFOS) are based on energy statistics and cement production data, while emissions from land-use change (ELUC), mainly deforestation, are based on land use and land-use change data and bookkeeping models.',
            ' ',
            'Years', ' ', 'Year' , ' ', '6'); 

        //SET 2

        axios.get(this.url + '/national_carbon_emissions', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                //console.log([Object.keys(response.data[1])])
                //console.log(Object.keys(response.data[0]))
                for(var i = 2; i < Object.keys(response.data[0]).length; i++){
                    data.set.push(new DataSet(
                        ' ',
                        Object.keys(response.data[0])[i],
                        '',
                        'ppm'
                    ))
                }
                try {
                    for(var j = 0; j < Object.keys(response.data[0]).length; j++){
                        for(var i = 0; i < data.set.length; i++){
                            if(Object.keys(response.data[j]) === undefined) continue;
                            const dataPoint = {x: response.data[j][Object.keys(response.data[j])[1]], y: response.data[j][Object.keys(response.data[j])[i + 2]]}
                            //points.push(dataPoint)
                            data.set[i].points.push(dataPoint)
                        }
                    }
                }
                catch (TypeError){
                    console.log(TypeError)
                }

            //   console.log(data)
                

        }).catch (error => {
            alert(error)
        })
       // data.set[2].points = set2.points;

       


/*
        //FOREACH COUNTRY ADD SET
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            'CountryName',
            ' ',
            'ppm'
        );*/

        data.chartType="stacked";

        return data;
    }


    async V9Data(){
        const data = new Data( //constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){}
            'CO2 emissions by sectors', 
            'https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx',
            'https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector', 
            'The above charts looked total greenhouse gas emissions – this included other gases such as methane, nitrous oxide, and smaller trace gases. How does this breakdown look if we focus only on carbon dioxide (CO2) emissions? Where does our CO2 come from? This chart shows the distribution of CO2 emissions across sectors.',
            '',
            'Years', ' ', ' ' , ' ', '7'); 
        //foreach sector create set
        data.set[0] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );
        data.set[1] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );
        data.set[2] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );
        data.set[3] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );
        data.set[4] = new DataSet( ////constructor(xTitle, yTitle, prefix, suffix){}
            ' ',
            ' ',
            ' ',
            '%'
        );

        data.chartType="doughnut";

        //SET 0
        let set0 = new DataSet()
        axios.get(this.url + '/ghg_global_sector', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
            for(var i = 0; i < response.data.length; i++){
                const dataPoint = {x: response.data[i].Sector, y: response.data[i].ghg_percentual};
                set0.points.push(dataPoint);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[0].points = set0.points;

        //SET 1 subsector energy
        let set1 = new DataSet()
        let set2 = new DataSet()
        let set3 = new DataSet()
        let set4 = new DataSet()

        axios.get(this.url + '/ghg_global_subsector', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                //energy
            for(var i = 0; i < 6; i++){
                const dataPoint = {x: response.data[i].Subsector, y: response.data[i].ghg_percentual};
                set1.points.push(dataPoint);
            }
                //industry
            for(var i = 6; i < 8; i++){
                const dataPoint = {x: response.data[i].Subsector, y: response.data[i].ghg_percentual};
                set2.points.push(dataPoint);
            }
                //agri
            for(var i = 8; i < 15; i++){
                const dataPoint = {x: response.data[i].Subsector, y: response.data[i].ghg_percentual};
                set3.points.push(dataPoint);
            }
                //waste
            for(var i = 15; i < 17; i++){
                 const dataPoint = {x: response.data[i].Subsector, y: response.data[i].ghg_percentual};
                 set4.points.push(dataPoint);
            }

        }).catch (error => {
            alert(error)
        })
        data.set[1].points = set1.points;
        data.set[2].points = set2.points;
        data.set[3].points = set3.points;
        data.set[4].points = set4.points;
        return data;
    }
}