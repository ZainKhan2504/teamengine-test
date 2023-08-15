import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Box, Button, Flex, Header } from "../styled";
import { deleteEmployee } from "../../redux/employees/actionCreators";

const ITEMS_PER_PAGE = 5;

const View = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees_records);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = data => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <>
      <Header data-cy="header">View Employees</Header>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="lg"
      >
        <Box>
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Birth Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.dob}</td>
                    <td>{employee.status}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/create?edit=${employee.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(deleteEmployee(employee.id));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(employees.length / ITEMS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
          <Button
            marginRight="sm"
            data-cy="viewEmployeesButton"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            marginRight="sm"
            data-cy="viewEmployeesButton"
            onClick={() => history.push("/create")}
          >
            Add Employee
          </Button>
          <Button data-cy="backButton" onClick={() => history.goBack()}>
            Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default View;
