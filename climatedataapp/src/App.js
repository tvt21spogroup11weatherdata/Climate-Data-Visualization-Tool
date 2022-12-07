import './App.css';
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

import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from './components/NotFound';
import CollectionNotFound from './components/CollectionNotFound';

import { setAuthToken } from './components/SetAuthToken';

import axios from "axios";
import { useState } from 'react';

function App() {
    const [routes, setRoutes] = useState(null)
    const [loading, setLoading] = useState(true)
    const [testPaths, setTestPaths] = useState([])

    const [user, setUser] = useState("");
    
    if(routes === null) getRoutes()

    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }

    /*
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
    }*/

    function getRoutes(){
      //  console.log("get routes")
        var url = 'http://localhost:3001'
        let visualizationRoutes = []
        axios.get(url + '/collections', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
            }
            }).then((response) => {
                var paths = []
                //console.log(response.data.length + " vs " + routes.length)
                for(var i = 0; i < response.data.length; i++){
                    var path = "/c/" + response.data[i]._id
                    paths.push(path)
                    const route = (<Route key="key" path={path} element={<VisualizationCollection id={response.data[i]._id}/>}/>)
                    visualizationRoutes.push(route)
                    setRoutes(visualizationRoutes)
                    //window.sessionStorage.setItem("route" + i, response.data[i]._id)
                }
                setTestPaths(paths)
        }).catch (error => {
            console.log(error)
        }).finally(res => {
            setRoutes(visualizationRoutes)
        })
    }

    return (
        <>
        <Header/>
        <Navigation user={user}/>
        <div className="App" id="content">
            <Routes>

                <Route path="/" element={<Home testPaths={testPaths}/>} />
                <Route path="/temp" element={<VisualizeTempData/>} />
                <Route path="/emission" element={<VisualizeEmissionData/>} />
                <Route path="/login" element={<LoginForm setUser={setUser} />} />
                <Route path="/signup" element={<SignupForm setUser={setUser} />} />

                <Route path="/newcollection" element={
                <ProtectedRoute token={localStorage.getItem("token")}>
                    <CollectionEditor/>
                </ProtectedRoute>}/>

                <Route path="/account" element={
                <ProtectedRoute token={localStorage.getItem("token")}>
                    <UserAccount/>
                </ProtectedRoute>}/>

                {routes}

                <Route path="/V1" element={<V1 menu={true}/>}/>
                <Route path="/V4" element={<V4 menu={true}/>}/>
                <Route path="/V5" element={<V5 menu={true}/>}/>
                <Route path="/V6" element={<V6 menu={true}/>}/>
                <Route path="/V7" element={<V7 menu={true}/>}/>
                <Route path="/V8" element={<V8 menu={true}/>}/>
                <Route path="/V9" element={<V9 menu={true}/>}/>

                <Route path="/*" element={<NotFound />} />
                <Route path="/c/*" element={<CollectionNotFound />} />
            </Routes>
        </div>
        </>
    )
    
}

export default App;
