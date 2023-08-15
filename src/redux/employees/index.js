import { createSlice } from "@reduxjs/toolkit";

const defaultEmployee = {
  id: new Date().getTime(),
  firstName: "Abe",
  surname: "Simpson",
  email: "abe.simpson@springfield.com",
  dob: "1907-05-25",
  jobTitle: "Work grouch",
  status: "ACTIVE",
};

const initialState = {
  employees_records: [defaultEmployee],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    saveNewEmployee: {
      prepare: employee => ({
        payload: {
          ...employee,
          id: new Date().getTime(),
        },
      }),
      reducer(draftState, action) {
        draftState.employees_records = [
          ...draftState.employees_records,
          action.payload,
        ];
        localStorage.setItem(
          "employees",
          JSON.stringify(draftState.employees_records)
        );
      },
    },
    loadEmployeesFromLocalStorage(draftState) {
      const storedEmployees = JSON.parse(localStorage.getItem("employees"));
      if (storedEmployees) {
        draftState.employees_records = storedEmployees;
      }
    },
    editEmployee(draftState, action) {
      const { id, updatedEmployee } = action.payload;
      const index = draftState.employees_records.findIndex(
        emp => emp.id === Number(id)
      );
      if (index !== -1) {
        draftState.employees_records[index] = {
          ...draftState.employees_records[index],
          ...updatedEmployee,
        };
        localStorage.setItem(
          "employees",
          JSON.stringify(draftState.employees_records)
        );
      }
    },
    deleteEmployee(draftState, action) {
      const id = action.payload;
      draftState.employees_records = draftState.employees_records.filter(
        emp => emp.id !== Number(id)
      );
      localStorage.setItem(
        "employees",
        JSON.stringify(draftState.employees_records)
      );
    },
  },
});

export const {
  saveNewEmployee,
  loadEmployeesFromLocalStorage,
  editEmployee,
  deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
