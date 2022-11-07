import logo from './logo.svg';
import './App.css';
import LineChart from './components/LineChart';
import VisualizeData from './components/VisualizeData';


class Data{
    title = 'Title'
    source = 'source link'
    desc = 'desc link'
    points = []
    longDesc = 'tähän pitkä descriptioni siitä datasta mitä tässä nyt ollaan analysoimassa ja sillee lorem ipsum jii än ee'
}


function App() {
    

    const data = new Data();
    data.title = "Kiinnostuskäyrä";

    for(var i = 0; i < 100; i++){
        const dataPoint = {x: i, y: i + 1};
        data.points[i] = dataPoint;
    }

    return (
            <div className="App">
                <p><VisualizeData chartType="line" data={data} dataPoints={data.points}/></p>
                <p><VisualizeData chartType="doughnut" data={data} dataPoints={data.points}/></p>
            </div>
    )
}

export default App;
