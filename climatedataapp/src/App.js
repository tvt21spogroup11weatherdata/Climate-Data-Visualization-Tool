import './App.css';
import { useParams } from 'react-router-dom';
import VisualizeTempData from './components/Visualizations/VisualizeTempData';
import VisualizeEmissionData from './components/Visualizations/VisualizeEmissionData';
import CollectionEditor from './components/Visualizations/CollectionEditor';
import VisualizationCollection from './components/Visualizations/VisualizationCollection';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Home from './components/Home';
import UserAccount from './components/UserAccount';
import V1 from './components/Visualizations/V1'
//import V3 from './components/Visualizations/V3'
import V4 from './components/Visualizations/V4'
import V5 from './components/Visualizations/V5'
import V6 from './components/Visualizations/V6'
import V7 from './components/Visualizations/V7'
import V8 from './components/Visualizations/V8'
import V9 from './components/Visualizations/V9'

import axios from "axios";
import { useState } from 'react';

function App() {
    const [routes, setRoutes] = useState([])
    const [loading, setLoading] = useState(true)
    const [testPaths, setTestPaths] = useState([])
    //console.log(routes)
    //console.log(routes.length)
    if(routes.length === 0 && loading){
        //checkStorageForRoutes()
        if(routes.length === 0) getRoutes()
    }

    function checkStorageForRoutes(){
        var troutes = []
        for(var i = 0; i < window.sessionStorage.length; i++){
            var path = "route" + String(i)
           troutes[i] = window.sessionStorage.getItem(path)
           // console.log(JSON.parse(window.sessionStorage.getItem("route"+i)))
           // if(sessionStorage[i].includes("route")) console.log(sessionStorage[i].value)
        }
       // setRoutes(troutes)
       // console.log(routes)
    }

    function getRoutes(){
        var url = 'http://localhost:3001'
        let visualizationRoutes = []
        axios.get(url + '/collections', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                var paths = []
                for(var i = 0; i < response.data.length; i++){
                    var path = "/collection/" + response.data[i]._id
                    paths.push(path)
                    const route = (<Route key="key" path={path} element={<VisualizationCollection id={response.data[i]._id}/>}/>)
                    visualizationRoutes.push(route)
                    setRoutes(visualizationRoutes)
                    //window.sessionStorage.setItem("route" + i, response.data[i]._id)
                }
                setTestPaths(paths)
        }).catch (error => {
            alert(error)
        }).finally(res => {
            setRoutes(visualizationRoutes)
        })
        
    }

    return (
        <>
        <Header/>
        <Navigation/>
        <div className="App" id="content">
            <Routes>
                <Route path="/" element={<Home testPaths={testPaths}/>} />
                <Route path="/temp" element={<VisualizeTempData/>} />
                <Route path="/emission" element={<VisualizeEmissionData/>} />
                <Route path="/custompath" element={<CollectionEditor/>} />
                <Route path="/account" element={<UserAccount/>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/newcollection" element={<CollectionEditor/>}/>
                {routes}
                
                

                <Route path="/V1" element={<V1 menu={true}/>}/>
                <Route path="/V4" element={<V4 menu={true}/>}/>
                <Route path="/V5" element={<V5 menu={true}/>}/>
                <Route path="/V6" element={<V6 menu={true}/>}/>
                <Route path="/V7" element={<V7 menu={true}/>}/>
                <Route path="/V8" element={<V8 menu={true}/>}/>
                <Route path="/V9" element={<V9 menu={true}/>}/>
            </Routes>
        </div>
        </>
    )
}

export default App;
