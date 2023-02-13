// export const cardInitailValues = {
//   serID: user._id,
//   listKanbanNo: this.props.location
//     ? this.props.location.state?.listkanbanname
//     : "",
//   kanbanNo: "",
//   // listKanbanNo: this.state.listkanbanFromScrumboard ? this.state.listkanbanFromScrumboard : "",
//   // kanbanNo: this.state.kanbanFromScrumboard ? this.state.kanbanFromScrumboard : "",
//   cardNo: this.makeCardNo(),
//   cardname: "",
//   narrative: "",
//   category: "",
//   priority: "",
//   deadline: new Date(),
//   documentNo: "",
//   field: "",
//   tags: "",
//   reference: "",
//   sharingLink: "",
//   assignedTo: [],
//   sharedTo: "",
//   sharedTill: "",
//   note: "",
//   createdOn: new Date(),
//   status: "",
// };

export const categoryOptions = [
  { id: 1, value: "bug-error", label: "bug-error" },
  { id: 2, value: "disconnection", label: "disconnection" },
  { id: 3, value: "feature-request", label: "feature-request" },
  { id: 4, value: "frontend", label: "frontend" },
  { id: 5, value: "backend", label: "backend" },
  { id: 6, value: "AI", label: "AI" },
  { id: 7, value: "NLP", label: "NLP" },
  { id: 8, value: "image-recognization", label: "image-recognization" },
  { id: 9, value: "hosting", label: "hosting" },
  { id: 10, value: "tablet", label: "tablet" },
  { id: 11, value: "phone", label: "phone" },
  { id: 12, value: "web", label: "web" },
];

export const priorityOptions = [
  { id: 1, label: "normal", value: "normal" },
  { id: 2, label: "low", value: "low" },
  { id: 3, label: "high", value: "high" },
  { id: 4, label: "urgent", value: "urgent" },
];

export const statusOptions = [
  { id: 1, label: "in progress", value: "in progress" },
  { id: 2, label: "pending", value: "pending" },
  { id: 3, label: "new", value: "new" },
  { id: 4, label: "archive", value: "archive" },
  { id: 5, label: "active", value: "active" },
];
