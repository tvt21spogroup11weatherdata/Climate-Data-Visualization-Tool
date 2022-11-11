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
            </Routes>
        </div>
        </>
    )
}

export default App;
