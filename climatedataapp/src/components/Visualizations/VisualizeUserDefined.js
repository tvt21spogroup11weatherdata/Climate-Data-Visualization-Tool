
import VisualizeData from "./VisualizeData";
import { UserCollection
 } from "../../classes/UserCollection";
import LineChart from "../Charts/LineChart";
import { useState } from "react";

export default function VisualizationEditor(props){

    const [formatType, setFormatType] = useState("2column");

    /*Käyttäjän tulee voida luoda visualisointinäkymä yksilöllisellä url-tunnisteella. 
    Näkymään käyttäjä voi valita haluamansa visualisoinnit, valita haluamansa asettelun ja kirjoittaa kuvaustekstin jokaiselle visualisoinnille. 
    Yhdellä käyttäjällä voi olla monta luotua visualisointinäkymää.

    Visualisoinnin asettelun osalta käyttäjä voi valita
    •	Sarakeasettelun, jossa jokainen visualisointi on allekkain ja yksi visualisointi käyttää aina 100% käytettävissä olevasta leveydestä.
    •	2-sarakkeen rinnakkaisasettelun, jossa visualisoinnit ovat kaksi rinnakkain sarakkeissa. 
    */

    var collectionElements;
    var coll = new UserCollection();
   // console.log(coll.visualizations);
    var debugColls = [];
    
    var column2 = [];

    for(var i = 0; i < coll.visualizations.length; i++){
        var data = coll.visualizations[i];
        var wrapper;
        var element = [];
        if(data.chartType === "line") {
            element.push(<LineChart data={data} human={data.human} zoomable='true'/>);
        }
        element.push((<div><b>Custom description:</b><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div>))
        element.push((<button>Remove visualization from collection</button>))

        if(formatType === "2column") {
            column2.push((<td>{element}</td>));
            if(column2.length === 2) { 
                debugColls.push((<tr>{column2}</tr>));
                column2 = []
            }
        }
        else {
            debugColls.push((element));
        }
    }

    const saveButton = (<button className="btn btn-primary">Save & share</button>)
    const formatSelect = (<>Formatting: <button className="btn btn-primary" onClick={() => setFormatType("1column")}>1 column</button> <button className="btn btn-primary" onClick={() => setFormatType("2column")}>2 columns</button></>);
    const menu = (<table width="100%"><tbody><td>{formatSelect}</td><td>{saveButton}</td></tbody></table>);
    if(formatType === "1column")
    {
        return(
            <>
            {menu}
            <div>{debugColls}</div>
            </>
        )
    }
    else if(formatType === "2column"){
        return(
            <>
            {menu}
            <table class="table" width="100%">
                <tbody>
                    {debugColls}
                </tbody>
            </table>
            </>
        )
    }
}