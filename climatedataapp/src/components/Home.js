export default function Home(props){
    //console.log(props.testPaths)

    function testPaths(){
        var links = []
        for(var i = 0; i < props.testPaths.length; i++){
            links.push((<p><a href={props.testPaths[i]}>Collection {props.testPaths[i]}</a></p>))
        }
        return links
    }
    return(
        <div>
            This is a visualization tool for climate change related data
            <p>Test user collections</p>
            <p>{testPaths()}</p>
        </div>
    )
}