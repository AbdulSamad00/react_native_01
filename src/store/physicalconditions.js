import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { getPhysicalconditions } from "../api/physicalconditions";

export const fetchPhysicalConditions = createAsyncThunk(
  "PhysicalCondition/fetchPhysicalConditions",
  async (itemsPerPage) => {
    const { ok, data } = await getPhysicalconditions();
    if (ok) {
      const filter = data.map((condition) => {
        const smallFilter = {
          ...condition,
          id: condition._id,
          leftEyeSpherical: condition.optical.leftEyeSpherical,
          rightEyeSpherical: condition.optical.rightEyeSpherical,
        };
        delete smallFilter._id;
        delete smallFilter.optical;
        return smallFilter;
      });
      return {
        data: filter,
        numberOfPages: Math.ceil(filter.length / itemsPerPage),
      };
    }
  }
);

const PhysicalConditionSlice = createSlice({
  name: "physicalcondition",
  initialState: {
    physicalconditions: [],
    loading: false,
    numberOfPages: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhysicalConditions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPhysicalConditions.fulfilled, (state, action) => {
      state.physicalconditions = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.loading = false;
    });
    builder.addCase(fetchPhysicalConditions.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const conditionsWithPatientsInfo = createSelector(
  (state) => state.physicalconditions.physicalconditions,
  (state) => state.patients.patients,
  (conditions, patients) => {
    console.log(conditions);
    // console.log(patients);
    // patients.forEach((patient) => {
    //   const newP = {
    //     ...patient,
    //     patients: { ...patient.patients, imageSrc: "" },
    //   };
    //   console.log(newP);
    // });
    const filterForPatients =
      conditions && patients
        ? conditions.map((condition) => {
            if (condition.patientNo) {
              return {
                ...condition,
                patientInfo: patients.filter(
                  (patient) => patient.user === condition.patientNo
                )[0],
              };
            } else {
              return { ...condition, patientInfo: null };
            }
          })
        : [];
    // console.log(filterForPatients);
    return filterForPatients;
  }
);

export default PhysicalConditionSlice.reducer;
