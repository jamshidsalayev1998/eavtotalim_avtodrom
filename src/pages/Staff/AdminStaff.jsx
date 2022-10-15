import React, { useState } from 'react';
import PaginationComponent from "react-reactstrap-pagination";
import { NavLink } from 'react-router-dom';
import { Row, Col, Container, Badge } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { deleteData } from 'services/deleteData';

const AdminStaff = ({ data, isLoad }) => {
    
  const [changeDel, setChangeDel] = useState(false);

    const removeItemFromDatabase = (id) => {
        const formdata = new FormData();
        formdata.append("admin_id", id)
        deleteData(id, formdata, "/admin-delete", setChangeDel, changeDel);
    }

    return (
        <React.Fragment>
            {data !== null && isLoad !== null && <div>
                <div className="top-organizations">
                    <h5 className="font-weight-bold">Admin</h5>
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
                                {
                                    data?.map((element, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Th>{index+1}</Th>
                                                <Td>{element.last_name} {element.first_name} {element.middle_name}</Td>
                                                <Td>{element.phone}</Td>
                                                <Td>{element.region.name}</Td>
                                                <Td>{element.area.name}</Td>
                                                <Td>{element.passport_seria} {element.passport_number}</Td>
                                                <Td>
                                                    <Badge 
                                                        color={element.status === "1" ? "success" : "danger"}  
                                                        className="py-1 px-2 badge badge-pill">
                                                            {element.status === "1" ? "active" : "inactive"}
                                                    </Badge></Td>
                                                <Td className="table_body " style={{ widTd: "80px" }}>
                                                    <div className="func_buttons">
                                                        <NavLink to={`/organizationviews`}>
                                                            <span><i className="bx bx-show-alt font-size-24 "></i></span>
                                                        </NavLink>
                                                        <NavLink to={`/editorganization`}>
                                                            <span><i className="bx bx-edit font-size-20 text-muted" ></i>
                                                            </span>
                                                        </NavLink>
                                                        <span onClick={() => removeItemFromDatabase(element.id)}><i className="bx bx-trash font-size-22 text-danger"></i></span>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }

                            </Tbody>
                        </Table>
                        {
                            data?.length === 0 ?
                                <div className="this_empty_table">
                                    <div className="text-center">
                                        <i className="bx bx-info-circle text-secondary" style={{ fontSize: "50px" }}></i>
                                        <span className="d-block">Tashkilotga rahbar qo’shilmagan!</span><br />
                                        <button className="btn btn-success">
                                            <i className="bx bx-plus mr-2"></i>
                                        Yangi admin qo'shish
                                    </button>
                                    </div>
                                </div> :
                                null
                        }
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
            }
        </React.Fragment>
    )
}

export default AdminStaff;