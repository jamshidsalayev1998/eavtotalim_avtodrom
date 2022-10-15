import React, {useContext} from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import MainContext from "../../Context/MainContext";

import avatar1 from "../../assets/images/userProfile2.jpg"
import profileImg from "../../assets/images/profile-img.png"

const WelcomeComp = ({data}) => {

  const get_fio = (data) => {
    return data?.profession?.last_name+' '+data?.profession?.first_name+' '+data?.profession?.middle_name;
  }
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">{data?.examination_area?.name}</h5>
                {/*<p>{get_fio(data)}</p>*/}
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="12">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{get_fio(data)}</h5>
              <p className="text-muted mb-0 text-truncate">Direktor</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
