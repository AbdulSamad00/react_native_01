import { v4 } from "uuid";

export const drodownArea = {
  name: [
    { id: `${v4()}`, value: "cantine", label: "kantine" },
    { id: `${v4()}`, value: "lobby", label: "lobby" },
    { id: `${v4()}`, value: "WC", label: "WC" },
    { id: `${v4()}`, value: "officeCS", label: "office CS" },
    { id: `${v4()}`, value: "officeDouane", label: "office Douane" },
    { id: `${v4()}`, value: "reception", label: "reception" },
    { id: `${v4()}`, value: "gaswaterelec", label: "Gas Water Electricity" },
    { id: `${v4()}`, value: "elevator", label: "elevator" },
    { id: `${v4()}`, value: "stairs", label: "stairs" },
    { id: `${v4()}`, value: "sprinklersystem", label: "skrinker-pomp" },
    { id: `${v4()}`, value: "watersilo", label: "watersilo" },
    { id: `${v4()}`, value: "accuspace", label: "accu-space" },	
  ],
  floor: [
    { id: `${v4()}`, value: "Floor-1", label: "Floot 1" },
    { id: `${v4()}`, value: "Floor-2", label: "Floot 2" },
    { id: `${v4()}`, value: "Floor-3", label: "Floot 3" },
    { id: `${v4()}`, value: "Floor-4", label: "Floot 4" },
    { id: `${v4()}`, value: "Floor-5", label: "Floot 5" },
    { id: `${v4()}`, value: "Floor-6", label: "Floot 6" },
  ],
};
