const options = [
  {
    label: "Basic Information",
    value: "basic_information",
    bgColor: "rgb(191, 63, 59)",
  },
  { label: "Comments", value: "comments", bgColor: "rgb(191, 151, 59)" },
  { label: "Reviews", value: "reviews", bgColor: "rgb(239, 227, 18)" },
  { label: "Sharing", value: "sharing", bgColor: "rgb(155, 202, 45)" },
  { label: "Attachments", value: "attachments", bgColor: "rgb(45, 202, 63)" },
  { label: "Notes", value: "notes", bgColor: "rgb(45, 202, 151)" },
  { label: "Fishbone", value: "fishbone", bgColor: "rgb(45, 202, 141)" },
];
const profileOptions = [
  { label: "About", value: "about", bgColor: "rgb(255, 198, 159)" },
  { label: "Bank", value: "bank", bgColor: "rgb(240, 238, 121)" },
  {
    label: "Professional Info",
    value: "professional_info",
    bgColor: "rgb(121, 240, 180)",
  },
  { label: "Membership", value: "membership", bgColor: "rgb(121, 240, 211)" },
  { label: "Password", value: "password", bgColor: "rgb(121, 193, 240)" },
  { label: "Insurance", value: "insurance", bgColor: "rgb(121, 193, 240)" },
];
const actions = [
  {
    label: "Edit",
    value: "edit",
    avatarSource: require("../assets/icons/edit.png"),
  },
  {
    label: "Print",
    value: "print",
    avatarSource: require("../assets/icons/printer.png"),
  },
  {
    label: "Share",
    value: "share",
    avatarSource: require("../assets/icons/sharing.png"),
  },
  {
    label: "Archive",
    value: "archive",
    avatarSource: require("../assets/icons/archive.png"),
  },
  {
    label: "Save",
    value: "save",
    avatarSource: require("../assets/icons/save.png"),
  },
  {
    label: "Save as PDF",
    value: "save_as_pdf",
    avatarSource: require("../assets/icons/pdf.jpg"),
  },
  {
    label: "Save as XML",
    value: "save_as_xml",
    avatarSource: require("../assets/icons/xls.jpg"),
  },
  {
    label: "Save as CSV",
    value: "save_as_csv",
    avatarSource: require("../assets/icons/csv.png"),
  },
];
const saveMenu = [
  {
    label: "Save as PDF",
    value: "save_as_pdf",
    avatarSource: require("../assets/icons/pdf.jpg"),
  },
  {
    label: "Save as XML",
    value: "save_as_xml",
    avatarSource: require("../assets/icons/xls.jpg"),
  },
  {
    label: "Save as CSV",
    value: "save_as_csv",
    avatarSource: require("../assets/icons/csv.png"),
  },
];
const categoryOptions = [
  { value: "bug-error", label: "Bug/Error" },
  { value: "complaint", label: "Complaint" },
  { value: "disconnection", label: "Disconnection" },
  { value: "feature-request", label: "Feature Request" },
  { value: "orders", label: "Orders" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
];

const priorityOptions = [
  { value: "normal", label: "normal" },
  { value: "low", label: "low" },
  { value: "high", label: "high" },
  { value: "urgent", label: "urgent" },
];

const statusOptions = [
  { value: "in progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
  { value: "new", label: "New" },
  { value: "archive", label: "Archive" },
];

const levelOptions = [
  { value: "no-knowledge", label: "no-knowledge" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
  { value: "trainer", label: "Trainer" },
];

const currencyOptions = [
  { value: "EUR", label: "Euro €" },
  { value: "USD", label: "USD $" },
  { value: "CNY", label: "CNY ¥" },
  { value: "GBP", label: "GBP £" },
  { value: "JPY", label: "JPY ¥" },
  { value: "INR", label: "INR ₹" },
  { value: "CAD", label: "CAD $" },
  { value: "AUD", label: "AUD $" },
  { value: "ZAR", label: "ZAR" },
  { value: "CHF", label: "CHF" },
  { value: "KRW", label: "KRW ₩" },
  { value: "RUB", label: "RUB руб" },
  { value: "BRL", label: "BRL R$" },
  { value: "SAR", label: "SAR ﷼" },
  { value: "MXN", label: "MXN $" },
  { value: "HKD", label: "HKD $" },
  { value: "SGD", label: "SGD $" },
  { value: "ILS", label: "ILS ₪" },
  { value: "QAR", label: "QAR ﷼" },
  { value: "TRY", label: "TRY ₺" },
  { value: "VND", label: "VND ₫" },
];

export {
  options,
  actions,
  saveMenu,
  levelOptions,
  categoryOptions,
  priorityOptions,
  statusOptions,
  profileOptions,
  currencyOptions,
};
