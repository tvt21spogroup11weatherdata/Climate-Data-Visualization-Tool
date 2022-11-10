import { DataConstructor } from "./Data";
export class UserCollection {
    visualizations = [];

    constructor(){
        var cnstr = new DataConstructor();
        this.visualizations.push(cnstr.V1Data())
        this.visualizations.push(cnstr.V3Data())
        this.visualizations.push(cnstr.V4Data())
        this.visualizations.push(cnstr.V5Data())
    };

}
