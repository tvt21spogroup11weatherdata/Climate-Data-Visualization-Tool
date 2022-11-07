import {CanvasJSChart} from 'canvasjs-react-charts'

// props:
//zoomable: zoomable & pannable
//chartTitle: chart title
//xAxisTitle: xAxis title (Years, months, or Thousands of years)
//yAxisTitle: yAxis title 
//data[]: datasets

export default function DoughnutChart(props){
    const options = { // cant be named anything else than options
        theme: "light2",
        zoomEnabled: props.zoomable,
        title: {
            text: props.chartTitle,
            fontFamily: "Calibri"
        },
        subtitles: [{
            text: ":)",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
			indexLabel: "{name}: {y}",
			yValueFormatString: "#,###'%'",
			dataPoints: [
				{ name: "Kiinnostus", y: 5 },
				{ name: "Motivaatio", y: 31 },
				{ name: "Jaksaminen", y: 40 },
				{ name: "Keskittymiskyky", y: 17 },
				{ name: "-j-", y: 7 }
			]
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}/>
        </div>
    )
}