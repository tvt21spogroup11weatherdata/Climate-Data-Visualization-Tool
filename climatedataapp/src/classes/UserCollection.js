//To hold info of the user-created collection
export class Collection {
    formatType = '' //1column or 2column
    visualizations = []; //CollectionData

    constructor(){}
}

//Metadata pointing to the actual data that will be drawn from when regenerating user-defined collection
export class VisualizationsMeta {
    dataIndex = ''
    seriesEnabled = [true]; //What series' are enabled when loading chart
    description = ''        //Custom description given in editor

    constructor(dataIndex, seriesEnabled, description){
        this.dataIndex = dataIndex;
        this.seriesEnabled = seriesEnabled;
        this.description = description;
    }

    getIndex(){
        return this.dataIndex
    }
}
