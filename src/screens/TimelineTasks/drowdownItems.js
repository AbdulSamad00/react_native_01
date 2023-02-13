import { v4 } from "uuid";

export const CategoryDropdownValues = {
  constategoryOptions: [
	{ value: "bug-error", label: "bug-error" },
	{ value: "disconnection", label: "disconnection" },
	{ value: "feature-request", label: "feature-request" },
	{ value: "frontend", label: "frontend" },
	{ value: "backend", label: "backend" },
	{ value: "AI", label: "AI" },
	{ value: "NLP", label: "NLP" },
	{ value: "image-recognization", label: "image-recognization" },
	{ value: "hosting", label: "hosting" },
	{ value: "tablet", label: "tablet" },
	{ value: "phone", label: "phone" },
	{ value: "web", label: "web" },
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
	{ value: "archive", label: "Archive" },
  ],
};
