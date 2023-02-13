const options = [
  { label: "Basic Information", value: "basic_information",color:"rgb(191, 63, 59)" },
  { label: "Comments",value: "comments" ,color:"rgb(191, 151, 59)"},
  { label: "Reviews", value: "reviews",color:"rgb(239, 227, 18)"  },
  { label: "Sharing", value: "sharing" ,color:"rgb(155, 202, 45)" },
  { label: "Attachments", value: "attachments",color:"rgb(45, 202, 63)"},
  { label: "Notes",   value: "notes",color:"rgb(45, 202, 151)"  },
]

const actions = [
  { label: "Edit",  value: "edit",  avatarSource: require('../assets/icons/edit.png') },
  { label: "Print", value: "print", avatarSource: require('../assets/icons/printer.png') },
  { label: "Share", value: "share", avatarSource: require('../assets/icons/sharing.png') },
  { label: "Archive",     value: "archive",     avatarSource: require('../assets/icons/archive.png') },
  { label: "Save",        value: "save" ,       avatarSource: require('../assets/icons/save.png') },
  { label: "Save as PDF", value: "save_as_pdf", avatarSource: require('../assets/icons/pdf.jpg') },
  { label: "Save as XML", value: "save_as_xml", avatarSource: require('../assets/icons/xls.jpg') },
  { label: "Save as CSV", value: "save_as_csv", avatarSource: require('../assets/icons/csv.png') },
]

const saveMenu = [
  { label: "Save as PDF", value: "save_as_pdf", avatarSource: require('../assets/icons/pdf.jpg') },
  { label: "Save as XML", value: "save_as_xml", avatarSource: require('../assets/icons/xls.jpg') },
  { label: "Save as CSV", value: "save_as_csv", avatarSource: require('../assets/icons/csv.png') },

]

const categoryOptions = [
  { label: "Burned",  value: "burned",  avatarSource: require('../assets/icons/burnaccident.png') },
  { label: "Fire",  value: "fire",  avatarSource: require('../assets/icons/fire.png') },  
  { label: "Cut", value: "cut", avatarSource: require('../assets/icons/knife.png') },
  { label: "Choking", value: "choking", avatarSource: require('../assets/icons/choking.png') },  
  // { label: "Fainting", value: "faiting", avatarSource: require('../assets/icons/fainting.png') },    
  { label: "Insect-bite", value: "insect-bite", avatarSource: require('../assets/icons/insect.png') },
  { label: "Shock",     value: "shock",     avatarSource: require('../assets/icons/shock.png') },
  { label: "Heart-attack",        value: "heart-attack" ,       avatarSource: require('../assets/icons/heartattack.png') },
  { label: "Hyperventilation",        value: "hyperventilation" ,       avatarSource: require('../assets/icons/hyperventilation.png') },  
  { label: "Stroke", value: "stroke", avatarSource: require('../assets/icons/stroke.png') },
  { label: "Fall", value: "fall", avatarSource: require('../assets/icons/fall.png') },
  { label: "Other", value: "other", avatarSource: require('../assets/icons/incident.png') },
];

const statusOptions = [
  { value: "in progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
  { value: "new", label: "New" },
  { value: "archive", label: "Archive" },
];


export {
  options, actions,
  saveMenu,
  categoryOptions,
  statusOptions
}