import { v4 } from "uuid";

export const CategoryDropdownValues = {
  constategoryOptions: [
	{ value: "bug-error", label: "Bug/Error" },
	{ value: "complaint", label: "Complaint" },
	{ value: "disconnection", label: "Disconnection" },
	{ value: "feature-request", label: "Feature Request" },
	{ value: "orders", label: "Orders" },
	{ value: "sales", label: "Sales" },
	{ value: "other", label: "Other" },
  ],
};

export const PriorityDropdownValues = {
  priorityOptions: [
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ],	
};

export const StatusDropdownValues = {
  statusOptions: [
	{ value: "in progress", label: "In Progress" },
	{ value: "pending", label: "Pending" },
	{ value: "new", label: "New" },
	{ value: "re-open", label: "re-open" },	
	{ value: "archive", label: "Archive" },
  ],
};
