import axios from "axios";
import { useState } from "react";

export default function UserAccount(){
    const [collIDs, setIDs] = useState(null)
    const [collectionTableElements, setElements] = useState(null)

    let userCollIDs = []
    

    var url = 'http://localhost:3001'

    function DeleteUserButton(){
        var deleteUserButton = 
            (<form>
                <input type="submit" id="button" className="btn btn-secondary" value="Delete account"/>
            </form>)
        
        return deleteUserButton
    }

    function DeleteCollection(e){
        e.preventDefault()
        console.log("delete at index " + e.target.id)
        var id = collIDs[e.target.id]
        console.log(collIDs[e.target.id])
        
        if(window.confirm("Are you sure? This operation can't be undone")){
            axios.get(url + '/collections/delete/' + id, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                  console.log(response)
                  window.location.reload()
            }).catch (error => {
                console.log(error)
            })
        }
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
            vTableHeader.push(<tr><td>No collections</td></tr>)
        }
        else {
            vTableHeader.push( <thead className="md-col-2">
                <tr>
                <th scope="col">Url</th>
                <th scope="col">Delete</th>
            </tr></thead>)
            var linkWrapper = [];
            for(var i = 0; i < collIDs.length; i++){
                var vLinkElements = []
                var path = "/collection/" + collIDs[i]
                vLinkElements.push(<td><a href={path}>{path}</a></td>) 
                vLinkElements.push(<td><form id={i} onSubmit={e => DeleteCollection(e)}><input id="button" type="submit" className="btn btn-secondary" value="Delete collection"></input></form> </td>)
                linkWrapper.push(<tr>{vLinkElements}</tr>)
            }
            vTableBody.push(<tbody>{linkWrapper}</tbody>)
        }
        vTable.push(vTableHeader)
        vTable.push(vTableBody)
        setElements(vTable)
    }

    if(collIDs === null) GetUserCollections();
    else if(collectionTableElements === null) CreateElements()


    return(
        <div>
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
                            {DeleteUserButton()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}