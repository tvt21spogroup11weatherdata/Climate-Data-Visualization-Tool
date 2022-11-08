export default function UserAccount(){
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
                                    <tr>
                                        <td><a href="/adjsaskfjak">User-generated Visualization</a></td>
                                        <td><button  id="button" type="button" className="btn btn-secondary">Delete visualization</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    <td>
                        <form>
                        <input type="submit" id="button" className="btn btn-secondary" value="Delete account"/>
                        </form>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}