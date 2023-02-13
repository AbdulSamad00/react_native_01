const data=[ 
    {name:"file1"},
    {name:"file2"}, 
    {name:"file3"},
    {name:"file4"},
    {name:"file5"},
    {name:"file6"},
 ]
const menuOptions=[{label:"Options",value:"options"},{label:"Actions",value:"actions"}]
const optionsArray=[
    {label:"Sort By Name      ",value:"sortByName"},
    {label:"Sort By Date      ",value:"sortByDate"},
    {label:"Sort by Size      ",value:"sortBySize"},
    {label:"Show Hidden Files ",value:"showHiddenFiles"},
    {label:"Show folders First",value:"showFoldersFirst"}]
const fileOptions=[
    {label:"Download files",   value:"downloadFiles",  iconName:"download    ",iconType:"font-awesome-5"},
    {label:"Copy Selection",   value:"copySelection",  iconName:"copy        ",    iconType:"font-awesome-5"},
    {label:"Clear Selection",  value:"clearSelection", iconName:"eraser      ",  iconType:"font-awesome-5"},
    {label:"Open Selection",   value:"openSelection",  iconName:"box-open    ",  iconType:"font-awesome-5"},
    {label:"Delete Files",     value:"deleteFiles",    iconName:"trash       ",   iconType:"font-awesome-5"},
    {label:"Select All Files", value:"selectAllFiles", iconName:"download    ",iconType:"font-awesome-5"},
    {label:"Get Link",         value:"getLink",        iconName:"share-alt   ",iconType:"font-awesome-5"},
    {label:"Rename",           value:"rename",         iconName:"minus       ",iconType:"font-awesome-5"},
    {label:"Archive Files",    value:"archiveFiles",   iconName:"file-archive",iconType:"font-awesome-5"},
    {label:"Refresh",          value:"refresh",        iconName:"refresh     ",iconType:"material-community"},
    {label:"Deep Research",    value:"deepResearch",   iconName:"search      ",iconType:"font-awesome-5"},
    {label:"Meta Info",        value:"metaInfo",       iconName:"info        ",iconType:"font-awesome-5"},
]
export{
    data,menuOptions,fileOptions,optionsArray
}