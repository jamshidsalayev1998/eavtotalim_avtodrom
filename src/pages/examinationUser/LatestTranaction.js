import React from "react"
import {Card, CardBody, CardTitle, Badge, Button} from "reactstrap"
import {Link} from "react-router-dom"

const LatestTranaction = ({data}) => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">Ohirgi kelganlar</CardTitle>
                    <div className="table-responsive">
                        <table className="table table-centered table-nowrap mb-0">
                            <thead className="thead-light">
                            <tr>
                                <th >
                                    F.I.O
                                </th>
                                <th>Tel</th>
                                <th>Passport</th>
                                <th>To'g'ri javoblar</th>
                                <th>Noto'g'ri javoblar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.last_comes?.map((element, key) => (
                                <tr key={"_tr_" + key}>
                                    <td>
                                        {element?.student_fio}
                                    </td>
                                    <td>
                                    {element?.student_phone}
                                  </td>
                                  <td>
                                    {element?.student_passport}
                                  </td>
                                  <td>
                                    {element?.correct_answers}
                                  </td>
                                  <td>
                                    {element?.incorrect_answers}
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default LatestTranaction
