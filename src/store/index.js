import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "./kanbans";
import listkanbanReducer from "./listkanbans";
import physicalConditionReducer from "./physicalconditions";
import usersReducer from "./users";
import patientsReducer from "./patients";

import appointments from "./appointments";
import doctors from "./doctors";

export const store = configureStore({
  reducer: {
    kanbans: kanbanReducer,
    listkanbans: listkanbanReducer,
    users: usersReducer,
    physicalconditions: physicalConditionReducer,
    patients: patientsReducer,
    appointments,
    doctors,
  },
});
