import axios from "axios";
import { useState } from "react";
import { logOut } from "./Logout";

export default function UserAccount(props){
    const [deleted, setDeleted] = useState("") //for jest
    const [collIDs, setIDs] = useState(null)
    const [collectionTableElements, setElements] = useState(null)

    let userCollIDs = []

    var url = 'http://localhost:3001' // TO ENV !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    async function DeleteUser(e){
        e.preventDefault()
        var user = window.localStorage.getItem("username")
        const userLoad = {
            "username": user
        }

        if(window.confirm("Are you sure? This operation can't be undone")){
            const result = await axios.post(url + '/deleteuser', userLoad, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                  window.location.href = '/'
                  
            }).catch (error => {
                console.log(error.response.data.message)
            })

            logOut()
        }
        setDeleted("deleted user")
    }

    function DeleteCollection(e){
        e.preventDefault()
        var id = collIDs[e.target.id]
        
        if(window.confirm("Are you sure? This operation can't be undone")){
            axios.get(url + '/collections/delete/' + id, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                    window.location.reload()
            }).catch (error => {
                console.log(error)
            })
        }
    }
    

    function GetUserCollections(){
        //GET COLLECTION IDS FROM USER DOCUMENT
        // this just gets all collections for testing
        axios.get(url + '/collections/' + window.localStorage.getItem("username"), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                    for(var i = 0; i < response.data.length; i++){
                        userCollIDs.push(response.data[i]._id)
                    }
                    setIDs(userCollIDs)
                  
            }).catch (error => {
                console.log(error)
            })
    }

    function CreateElements(){
        var vTableBody = []
        var vTableHeader = []
        var vTable = []

        if(collIDs.length === 0){
            vTableHeader.push(<tr key="0"><td key="0">No collections</td></tr>)
        }
        else {
            vTableHeader.push( <thead key="head" className="md-col-2">
                <tr key="0">
                <th key="0" scope="col">Url</th>
                <th key="1" scope="col">Delete</th>
            </tr></thead>)
            var linkWrapper = [];
            for(var i = 0; i < collIDs.length; i++){
                var vLinkElements = []
                var path = "/c/" + collIDs[i]
                vLinkElements.push(<td key="0"><a  key="0" href={path}>{path}</a></td>) 
                vLinkElements.push(<td key="1"><form id={i} onSubmit={e => DeleteCollection(e)}><input id="button" type="submit" className="btn btn-secondary" value="Delete collection"></input></form> </td>)
                linkWrapper.push(<tr key={i}>{vLinkElements}</tr>)
            }
            vTableBody.push(<tbody key="">{linkWrapper}</tbody>)
        }
        vTable.push(vTableHeader)
        vTable.push(vTableBody)
        setElements(vTable)
    }

    if(collIDs === null) GetUserCollections();
    else if(collectionTableElements === null) CreateElements()

    return(
        <div>
            <h1>Hello, {localStorage.getItem("username")}</h1>
            <table id="useraccount-table">
                <tbody>
                    <tr>
                        <td>
                            <h2>Visualizations</h2>
                            <table id="visualizations-table" className="table">
                                    {collectionTableElements}
                            </table>
                        </td>
                        <td>
                            <form onSubmit={(e) => DeleteUser(e)}>
                                <input type="submit" data-testid="deleteuser" id="button" className="btn btn-secondary" value="Delete account"/>
                            </form>
                            <input data-testid="deleted" defaultValue={deleted} hidden/> {/*jest*/}
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}