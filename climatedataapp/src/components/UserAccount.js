import axios from "axios";
import { useState } from "react";

export default function UserAccount(){
    const [links, setLinks] = useState(null)
    const [linkElements, setElements] = useState(null)
    var amountOfColls = 2; //test value
    var wrapper = [];
    

    function DeleteUserButton(){
        var deleteUserButton = 
            (<form>
                <input type="submit" id="button" className="btn btn-secondary" value="Delete account"/>
            </form>)
        
        return deleteUserButton
    }
    

    function GetUserVisualizations(){
        let tempLinks = []
            var url = 'http://localhost:3001'
            let visualizationRoutes = []
            axios.get(url + '/collections/', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin',
                }
                }).then((response) => {
                  //  console.log(response.data)
                  amountOfColls = response.data.length
                    for(var i = 0; i < response.data.length; i++){
                        //console.log(response.data[i]._id)
                        var path = "/collections/" + response.data[i]._id
                        tempLinks.push(response.data[i]._id)
                    }
                    
            }).catch (error => {
                console.log(error)
            }).finally(() => {
                console.log(tempLinks)
                    setLinks(tempLinks)
                    console.log(links)
            })
    }

    function CreateElements(){
        for(var i = 0; i < amountOfColls; i++){
            var vLinkElements = []
            var path = "/collection/" + links[i]
            vLinkElements.push(<td><a href={path}>User-generated Visualization</a></td>)
            vLinkElements.push(<td><button id="button" type="button" className="btn btn-secondary">Delete visualization</button></td>)
            wrapper.push(<tr>{vLinkElements}</tr>)
        }
        setElements(wrapper)
    }

    if(links === null) GetUserVisualizations();
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