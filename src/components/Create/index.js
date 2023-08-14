import React, { useCallback, useMemo } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import {
  saveNewEmployee,
  editEmployee,
} from "../../redux/employees/actionCreators";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const employees = useSelector(state => state.employees.employees_records);

  const queryParams = new URLSearchParams(location.search);
  const editEmployeeId = queryParams.get("edit");

  const initialFormValues = useMemo(() => {
    if (editEmployeeId) {
      const employee = employees.find(emp => emp.id === Number(editEmployeeId));
      if (employee) {
        return {
          firstName: employee.firstName,
          surname: employee.surname,
          email: employee.email,
          jobTitle: employee.jobTitle,
          status: employee.status,
        };
      }
    }
    return {
      firstName: "",
      surname: "",
      email: "",
      jobTitle: "",
      status: "",
    };
  }, [editEmployeeId, employees]);

  const submitForm = useCallback(
    employee => {
      if (editEmployeeId) {
        dispatch(editEmployee(editEmployeeId, employee));
      } else {
        dispatch(saveNewEmployee(employee));
      }
      history.push("/view");
    },
    [dispatch, editEmployeeId, history]
  );

  const statusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "LEAVE_OF_ABSENCE", label: "LEAVE_OF_ABSENCE" },
    { value: "TERMINATED", label: "TERMINATED" },
  ];

  return (
    <>
      <Header>
        {editEmployeeId ? "Edit Employee" : "Create new employee"}
      </Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={initialFormValues}
      >
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex alignItems="left" direction="column" width="300px">
            <FormField name="firstName" placeholder="First name" />
            <FormField name="surname" placeholder="Surname" />
            <FormField name="email" placeholder="Email" />
            <FormField name="jobTitle" placeholder="Job Title" />
            <FormField
              name="status"
              placeholder="Status"
              options={statusOptions}
            />
            <FormButtons />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
