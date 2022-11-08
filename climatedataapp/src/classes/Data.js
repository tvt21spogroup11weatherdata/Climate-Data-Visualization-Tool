export class Data{
    title = 'Title'
    source = 'source link'
    desc = 'desc link'
    set = [];
    longDesc = 'tähän pitkä descriptioni siitä datasta mitä tässä nyt ollaan analysoimassa ja sillee lorem ipsum jii än ee'
    longDesc2 = 'tähän lisädescriptioni jos sitä tarvitaan'
    xTitle = 'äks akseli'
    yTitle = 'yy'
    xPrefix = ' '
    xSuffix = ' '

    constructor(title, source, desc, longDesc, longDesc2, xTitle, yTitle, xPrefix, xSuffix){
        this.title = title;
        this.source = source;
        this.desc = desc;
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.xPrefix = xPrefix;
        this.xSuffix = xSuffix;
        this.longDesc = longDesc;
        this.longDesc2 = longDesc2;
    }

}

export class DataSet {
    xTitle = "äks akseli"
    yTitle = "yy akseli"
    prefix = ' '
    suffix = ' '
    points = []

    constructor(xTitle, yTitle, prefix, suffix){
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.prefix = prefix;
        this.suffix = suffix;
    }
}