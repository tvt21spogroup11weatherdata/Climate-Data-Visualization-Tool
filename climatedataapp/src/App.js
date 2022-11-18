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
import V3 from './components/Visualizations/V3'
import V5 from './components/Visualizations/V5'
import V6 from './components/Visualizations/V6'

function App() {
    return (
        <>
        <Header/>
        <Navigation/>
        <div className="App" id="content">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/temp" element={<VisualizeTempData/>} />
                <Route path="/emission" element={<VisualizeEmissionData/>} />
                <Route path="/custompath" element={<CollectionEditor/>} />
                <Route path="/account" element={<UserAccount/>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/newcollection" element={<CollectionEditor/>}/>
                <Route path="/usercollection" element={<VisualizationCollection/>}/>

                <Route path="/V1" element={<V1 menu={true}/>}/>
                <Route path="/V3" element={<V3 menu={true}/>}/>
                <Route path="/V5" element={<V5 menu={true}/>}/>
                <Route path="/V6" element={<V6 menu={true}/>}/>
            </Routes>
        </div>
        </>
    )
}

export default App;
