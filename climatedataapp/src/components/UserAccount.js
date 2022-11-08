export default function UserAccount(){
    return(
        <div>
            <table id="useraccount-table">
                <td>
                    <h2>Visualizations</h2>
                    <table id="visualizations-table" class="table">
                    <thead class="md-col-2">
                        <tr>
                            <th scope="col">Url</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tr>
                            <td><a href="#">url</a></td>
                            <td><button  id="button" type="button" class="btn btn-secondary">Delete</button></td>
                        </tr>
                    </table>
                </td>
                <td>
                    <form>
                    <input type="submit" id="button" class="btn btn-secondary" value="Delete account"/>
                    </form>
                </td>
            </table>
        </div>
    )
}