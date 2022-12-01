import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import StackedChart from "../Charts/StackedChart";
import MultiAxisChart from "../Charts/MultiAxisChart";
import { useState } from "react";

//Creates visualization with defined chartType and data + the source links & descriptions required
export default function VisualizeData(props){
    const [readMore, setReadMore] = useState(false)
    const [help, setHelp] = useState(false)
    const [chartElement, setChartElement] = useState(null)

    if(chartElement === null){
        switch(props.chartType){
            case "line":        setChartElement(<LineChart editorIndex={props.editorIndex} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} v2error={props.v2error} reversed={props.reversed} data={props.data} human={props.human} zoomable='true' interval={props.interval}/>)
                break;
            case "stacked":     setChartElement(<StackedChart editorIndex={props.editorIndex} stackedProps={props.stackedProps} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} data={props.data} zoomable='true'/>)
                break;
            case "multiaxis":   setChartElement(<MultiAxisChart editorIndex={props.editorIndex} saveSeries={props.saveSeries} seriesEnabled={props.seriesEnabled} data={props.data} interval={props.interval}/>)
                break;
            case "doughnut":    setChartElement(<DoughnutChart editorIndex={props.editorIndex} saveSeries={props.saveSeries} data={props.data}/>)
                break;
        }
    }
    
    const readMoreLink=readMore?'Read Less':'Read More >> '
    const helpLink=help?'Close':"How to use chart"

    function SetHelpText(){
        var helpContent = ""

        if(help) {
            helpContent = (
                <ul className="extraContent">
                <li>Drag across a section the chart to zoom in and get more detailed information on the X Axis.</li>
                <li>Switch between panning/zooming with the buttons in the upper-right corner.</li>
                <li>Reset zoom with the Reset button in the upper-right corner</li>
                </ul>            
            )
        }
        else helpContent = ""
        return helpContent

    }

    function SetDescription(){
        var descContent = ""

        if(readMore) {
            var tempCont = [];
            tempCont[0] = (<p key="0">{props.data.longDesc}</p>)
            if(props.data.longDesc2.length > 0) { 
                tempCont[1] = (<p key="2">{props.data.longDesc2}</p>) 
            }
            descContent = (<p key="3" className="extraContent">{tempCont}</p>)
        }
        else {
            for(var i = 0; i < 200; i++){
                descContent+=props.data.longDesc[i];
            }
            descContent += "..."
        }
        return descContent
    }
    
    
    return(
            <div>
                <h1>{props.data.title}</h1>
                {chartElement}
                <div style={{width:"1000px", margin: "auto", textAlign: "left"}} id="chartDesc">
                    {SetDescription()}
                    <p><a className="read-more-link" id="readmorelink" onClick={()=>{setReadMore(!readMore)}}>{readMoreLink}</a></p>
                </div>
                <p>
                    <a href={props.data.source} target="_blank" rel="noreferrer">Data source</a> - 
                    <a href={props.data.desc} target="_blank" rel="noreferrer">Data description</a>
                </p>
                    <hr/>
                <div style={{width:"50%", margin: "auto", textAlign: "left"}}>{SetHelpText()}</div>
                <p><a className="link-info" id="readmorelink" onClick={()=>{setHelp(!help)}}>{helpLink}</a></p>
            </div>
        )
    
}