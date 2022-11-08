export class Data{
    title = 'Title'
    source = 'source link'
    desc = 'desc link'
    set = [];
    longDesc = 'tähän pitkä descriptioni siitä datasta mitä tässä nyt ollaan analysoimassa ja sillee lorem ipsum jii än ee'
    xTitle = 'äks akseli'
    yTitle = 'yy'
    xPrefix = ' '
    xSuffix = ' '

    constructor(title, source, desc, longDesc, xTitle, yTitle, xPrefix, xSuffix){
        this.title = title;
        this.source = source;
        this.desc = desc;
        this.longDesc = longDesc;
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.xPrefix = xPrefix;
        this.xSuffix = xSuffix;
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