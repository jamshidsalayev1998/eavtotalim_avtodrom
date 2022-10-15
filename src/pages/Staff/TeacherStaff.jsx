import React from 'react';
import PaginationComponent from "react-reactstrap-pagination";
import { NavLink } from 'react-router-dom';
import { Row, Col, Container } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

const TeacherStaff = () => {

    return (
        <React.Fragment>
            <div>
                <div className="top-organizations">
                    <h5 className="font-weight-bold">Teacher</h5>
                    <NavLink to="/addorganization">
                        <button
                            type="button"
                            className="btn btn-success w-lg waves-effect waves-light"
                        ><i className="bx bx-plus mr-2"></i>Qo'shish</button>
                    </NavLink>
                </div>
                <Container fluid className="my-2">
                    <Row>
                        <Col xl={9} lg={10} md={12} sm={12} className="p-0">
                            <Row>
                                <Col lg={3} md={6} sm={12} className="my-1">
                                    <select className="custom-select">
                                        <option defaultValue>Barcha toifalar</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Col>
                                <Col lg={3} md={6} sm={12} className="my-1">
                                    <select className="custom-select">
                                        <option defaultValue>Barcha viloyatlar</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Col>
                                <Col lg={3} md={6} sm={12} className="my-1">
                                    <select className="custom-select">
                                        <option defaultValue>Barcha tumanlar</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Col>
                                <Col lg={3} md={6} sm={12} className="my-1">
                                    <select className="custom-select">
                                        <option defaultValue>Barcha statuslar</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={3} lg={2} md={12} sm={12} className="d-flex justify-content-end pr-0 my-1">
                            <form className="search_box_table">
                                <i className="bx bx-search text-secondary"></i>
                                <input
                                    type="text"
                                    className="table_search_input"
                                    placeholder="search..."
                                />
                            </form>
                        </Col>
                    </Row>
                </Container>


                <div className="table-rep-plugin">
                    <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                    >
                        <Table
                            id="tech-companies-1"
                            className="table table-striped table-bordered"
                        >
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th data-priority="1">F.I.Sh.</Th>
                                    <Th data-priority="3">Telefon</Th>
                                    <Th data-priority="1">Viloyat</Th>
                                    <Th data-priority="3">Tuman</Th>
                                    <Th data-priority="3">Pasport ma’lumotlari</Th>
                                    <Th data-priority="6">Status</Th>
                                    <Th data-priority="6">Amallar</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Th>
                                        GOOG <span className="co-name">Google Inc.</span>
                                    </Th>
                                    <Td>597.74</Td>
                                    <Td>12:12PM</Td>
                                    <Td>14.81 (2.54%)</Td>
                                    <Td>582.93</Td>
                                    <Td>597.95</Td>
                                    <Td>597.73 x 100</Td>
                                    <Td>597.91 x 300</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                </div>

                <div className="table_bottom_part">
                    <div className=" d-flex justify-content-between align-items-center font-weight-bold">
                        <span>Show</span>
                        <select
                            className="custom-select mx-2"
                        // value={show_count}
                        // onChange={e => setShow_count(e.target.value)}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>

                        </select>
                        <span>entries</span>
                    </div>
                    <div>
                        <PaginationComponent
                            totalItems={40}
                            pageSize={5}
                            // onSelect={handleSelected}
                            defaultActivePage={1}
                        /></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TeacherStaff;