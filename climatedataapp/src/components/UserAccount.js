export default function UserAccount(){

    function DeleteUserButton(){
        var deleteUserButton = 
            (<form>
                <input type="submit" id="button" className="btn btn-secondary" value="Delete account"/>
            </form>)
        
        return deleteUserButton
    }

    function GetUserVisualizations(){
        var wrapper = [];
        var amountOfColls = 2; //test value

        //get user visualization DB table here

        for(var i = 0; i < amountOfColls; i++){
            var vLinkElements = []
            vLinkElements.push(<td><a href="/usercollection">User-generated Visualization</a></td>)
            vLinkElements.push(<td><button id="button" type="button" className="btn btn-secondary">Delete visualization</button></td>)
            wrapper.push(<tr>{vLinkElements}</tr>)
        }
        return wrapper
    }

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
                                    {GetUserVisualizations()}
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