import axios from "axios";
import { useState } from "react";

export default function UserAccount(){
    const [collIDs, setIDs] = useState(null)
   // const [links, setLinks] = useState(null)
    const [linkElements, setElements] = useState(null)

    let userCollIDs = []
    var wrapper = [];
    

    function DeleteUserButton(){
        var deleteUserButton = 
            (<form>
                <input type="submit" id="button" className="btn btn-secondary" value="Delete account"/>
            </form>)
        
        return deleteUserButton
    }
    

    function GetUserCollections(){
        var url = 'http://localhost:3001'

        /* //GET COLLECTION IDS FROM USER DOCUMENT
        axios.get(url + '/user', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                  
            }).catch (error => {
                console.log(error)
            })
        */
        
        //test values
        userCollIDs[0] = "63886d29b3cfa2767d294e42"
        userCollIDs[1] = "63886dd2b3cfa2767d294e64"
        
        setIDs(userCollIDs)

        let tempLinks = []
        for(var i = 0; i < userCollIDs.length; i++){
            var path = "/collections/" + userCollIDs[i]
            tempLinks.push(path)
        }
        //setLinks(tempLinks)
    }

    function CreateElements(){
        console.log(collIDs.length)
        for(var i = 0; i < collIDs.length; i++){
            var vLinkElements = []
            var path = "/collection/" + collIDs[i]
            vLinkElements.push(<td><a href={path}>{path}</a></td>)
            vLinkElements.push(<td><button id="button" type="button" className="btn btn-secondary">Delete visualization</button></td>)
            wrapper.push(<tr>{vLinkElements}</tr>)
        }
        setElements(wrapper)
    }

    if(collIDs === null) GetUserCollections();
    else if(linkElements === null) CreateElements()


    return(
        <div>
            <table id="useraccount-table">
                <tbody>
                    <tr>
                        <td>
                            <h2>Visualizations</h2>
                            <table id="visualizations-table" className="table">
                            <thead className="md-col-2">
                                <tr>
                                    <th scope="col">Url</th>
                                    <th scope="col">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {linkElements}
                                </tbody>
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