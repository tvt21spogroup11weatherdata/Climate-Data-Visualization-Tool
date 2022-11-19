//Navigation for visualizations 1-7 + 10
export default function VisualizeTempData(){
   return (
            <><p>
            <a className="btn btn-primary" href="/V1">Global historical surface temperature anomalies from January 1850 onwards</a>&nbsp;
            <a className="btn btn-primary" href="/V3">Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</a>&nbsp;
            <a className="btn btn-primary" href="/V5">Vostok Ice Core CO2 measurements, 417160 - 2342 years</a>&nbsp;
            <a className="btn btn-primary" href="/V6">Ice core 800k year composite study CO2 measurements</a>&nbsp;
            <a className="btn btn-primary" href="/V7">Evolution of global temperature over the past two million years</a>&nbsp;</p>
            {/*
           <Tabs fill justify width="100%" defaultActiveKey="actor" onSelect={loadTab} transition={false}  id="noanim-tab-example" className="mb-3 nav-fill" aria-label="wrapped label tabs example">
                <Tab eventKey="v4" title="Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements" wrapped="true">
                    <div><VisualizeData human={true} data={v4Data} chartType="line"/></div> 
                </Tab>
                <Tab eventKey="v7" title="Evolution of global temperature over the past two million years" wrapped="true">
                    <div><VisualizeData data={v7Data} chartType="multiaxis"/></div> 
                </Tab>
          </Tabs>
*/}
            </>
        )

        
}