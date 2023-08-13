import * as actions from ".";

/* eslint-disable import/prefer-default-export */
export const saveNewEmployee = employee => dispatch => {
  dispatch(actions.saveNewEmployee(employee));
};

export const editEmployee = (id, updatedEmployee) => dispatch => {
  dispatch(actions.editEmployee({ id, updatedEmployee }));
};
