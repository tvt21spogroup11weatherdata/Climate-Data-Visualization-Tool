import logo from './logo.svg';
import './App.css';
import VisualizeData from './components/VisualizeData';
import Tab from 'react-bootstrap/Tabs';
import Tabs from 'react-bootstrap/Tabs';


class DataSet {
    xTitle = "äks akseli"
    yTitle = "yy akseli"
    prefix = ''
    suffix = ''
    points = []
}

class Data{
    title = 'Title'
    source = 'source link'
    desc = 'desc link'
    set = [];
    longDesc = 'tähän pitkä descriptioni siitä datasta mitä tässä nyt ollaan analysoimassa ja sillee lorem ipsum jii än ee'
    xTitle = 'äks akseli'
    yTitle = 'yy'
    xPrefix = ''
    xSuffix = ''
}


function App() {
    
    //////////////////////////////////////////////
    // TEST DATA
    var multiAxisData = new Data()
    var lineData = new Data()
    var stackedData = new Data()
    var doughnutData = new Data()

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

    lineData.set[0] = new DataSet();
    lineData.title = "Kiinnostuskäyrä"
    lineData.set[0].yTitle = "kiinnostus"

    for(var i = 0; i < 100; i++){
        const dataPoint = {x: i, y: i + 1};
        lineData.set[0].points[i] = dataPoint;
    }
    
    stackedData = multiAxisData;
    stackedData.title = "Olotila vuodenaikojen mukaan"
    stackedData.yTitle = "CO2 emissions"

    doughnutData.set[0] = new DataSet()

    for(var i = 0; i < 6; i++){
        doughnutData.set[0].points[i] = {name: 'datapointti' + i, y: i}
    }
    ////////////////////////////////////////////////////////////

    return (
            <div className="App" id="content">
                <Tabs defaultActiveKey="line" transition={false} id="noanim-tab-example" className="mb-6 nav-fill" >
                    <Tab eventKey="line" title="Line">
                     <VisualizeData chartType="line"      data={lineData}/>
                    </Tab>
                    <Tab eventKey="multiaxis" title="Multiaxis">
                        <VisualizeData chartType="multiaxis" data={multiAxisData}/>
                    </Tab>
                    <Tab eventKey="stacked" title="Stacked">
                        <VisualizeData chartType="stacked"   data={stackedData}/>
                    </Tab>
                    <Tab eventKey="doughnut" title="Doughnut">
                        <VisualizeData chartType="doughnut"  data={doughnutData}/> 
                    </Tab>
                </Tabs>
            </div>
    )
}

export default App;
