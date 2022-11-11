
import { Collection, VisualizationsMeta} from "../../classes/UserCollection";
import LineChart from "../Charts/LineChart";
import { useState } from "react";
import { DataConstructor } from "../../classes/Data";
import MultiAxisChart from "../Charts/MultiAxisChart";
import StackedChart from "../Charts/StackedChart";
import DoughnutChart from "../Charts/DoughnutChart";

export default function VisualizationCollection(props){
    //GET FORMATTYPE
    const [formatType, setFormatType] = useState("2column");

    //TESTING DATA
    var coll = new Collection();
    coll.formatType = '1column'
    coll.visualizations = [];
    coll.visualizations.push(new VisualizationsMeta(0, [true,true,true,true,true,true,true,true,true], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(1, [true,false], "This is a description"))
    coll.visualizations.push(new VisualizationsMeta(2, [false,true], "This is a description"))

   
    
    
    var collectionElements = [];
    var column2 = [];
    var visualizationsData = [];
    
    
    function LoadVisualizationData(){
        var dataC = new DataConstructor();
        for(var i = 0; i < coll.visualizations.length; i++){
            console.log(coll.visualizations[0])
            visualizationsData.push(dataC.GetByIndex(coll.visualizations[i].dataIndex));
        }
    }

    function CreateElements(){
        for(var i = 0; i < visualizationsData.length; i++){
            var data = visualizationsData[i];
            var element = [];
            if(data.chartType === "line") { element.push(<LineChart data={data} seriesEnabled={coll.visualizations[i].seriesEnabled} human={data.human} zoomable='true'/>);}
            if(data.chartType === "multiAxis") { element.push(<MultiAxisChart data={data} zoomable='true'/>);}
            if(data.chartType === "stacked") { element.push(<StackedChart data={data} zoomable='true'/>);}
            if(data.chartType === "doughnut") { element.push(<DoughnutChart data={data}  subSectors={props.subSectors} subSubSectors={props.subSubSectors}/>);}

            element.push((<div><b>Description:</b> <p>{coll.visualizations[i].description}</p></div>))
    
            if(formatType === "2column") {
                column2.push((<td>{element}</td>));
                if(column2.length === 2 || i === visualizationsData.length - 1) { 
                    collectionElements.push((<tr>{column2}</tr>));
                    column2 = []
                }
            }
            else {
                collectionElements.push((element));
            }
        }
    }
    
    LoadVisualizationData();
    CreateElements();

    if(formatType === "1column")
    {
        return(<><div>{collectionElements}</div></>)
    }
    else if(formatType === "2column"){
        return(<><table class="table" width="100%"><tbody>
                    {collectionElements}
                </tbody></table></>
        )
    }
}