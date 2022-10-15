import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  const { title, breadcrumbItems } = props
  const itemLength = breadcrumbItems.length

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex" style={{ paddingBottom: 4, flexDirection: "column" }}>
          <div className="page-title-right mb-2">
            <ol className="breadcrumb m-0">
              {breadcrumbItems?.map((item, key) => (
                <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                  <Link to={item.path}>{item.title}</Link>
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
          <h4 className="mb-0 font-size-18">{title}</h4>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.array,
  title: PropTypes.object,
}

export default Breadcrumb
