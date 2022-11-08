import './App.css';
import VisualizeTempData from './components/Visualizations/VisualizeTempData';
import VisualizeEmissionData from './components/Visualizations/VisualizeEmissionData';
import VisualizeUserDefined from './components/Visualizations/VisualizeUserDefined';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';

function App() {

    return (
        <>
        <Header/>
        <Navigation/>
        <div id="buffer"></div>
        <div className="App" id="content">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/temp" element={<VisualizeTempData/>} />
                <Route path="/emission" element={<VisualizeEmissionData/>} />
                <Route path="/custompath" element={<VisualizeUserDefined/>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/signup" element={<SignupForm/>} />
            </Routes>
        </div>
        </>
    )
    /*
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
    )*/
}

export default App;
