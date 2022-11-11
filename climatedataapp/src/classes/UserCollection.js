//Info of the user-created collection
export class Collection {
    formatType = ''
    visualizations = []; //CollectionData

    constructor(){
        
    }
}

//Metadata pointing to the actual data that will be drawn from when regenerating user-defined collection
export class VisualizationsMeta {
    dataIndex = ''
    seriesEnabled = [true];
    description = ''

    constructor(dataIndex, seriesEnabled, description){
        this.dataIndex = dataIndex;
        this.seriesEnabled = seriesEnabled;
        this.description = description;
    }
}
