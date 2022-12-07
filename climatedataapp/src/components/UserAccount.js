import axios from "axios";
import { useState } from "react";
import { logOut } from "./Logout";

export default function UserAccount(props){
    const [collIDs, setIDs] = useState(null)
    const [collectionTableElements, setElements] = useState(null)

    let userCollIDs = []
    

    var url = 'http://localhost:3001'

    async function DeleteUser(e){
        e.preventDefault()

        if(window.confirm("Are you sure? This operation can't be undone")){

            const username = window.localStorage.getItem("username")
            
            const deletePayLoad = {
                "username": username
            }

            const token = window.localStorage.getItem("token")


            const result = await axios.get(url + '/deleteuser', deletePayLoad, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                    'Authorization' : token
                }
                }).then((response) => {
                  console.log(response)
                  window.location.href = '/'
                  
            }).catch (error => {
                console.log(error.response.data.message)
            })

            logOut()
        }
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
                    window.location.href = '/account'
            }).catch (error => {
                console.log(error)
            })
        }
        logOut()
    }
    

    function GetUserCollections(){
        //GET COLLECTION IDS FROM USER DOCUMENT
        // this just gets all collections for testing
        axios.get(url + '/collections/', {
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
                                <input type="submit" data-testid="submit" id="button" className="btn btn-secondary" value="Delete account"/>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}