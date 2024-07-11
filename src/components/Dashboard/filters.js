import React from 'react'
import './Dashboard.scss'
import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button
  } from 'reactstrap';
const Filters = props => {
  return (
    <div className='p-2 pl-0'>
        <Form>
  <Row>
    <Col md={2}>
      <FormGroup>
        <Label for="Religion">
          Religion
        </Label>
        <Input
        id="exampleSelect"
        name="select"
        type="select"
      >
        <option>
          Hindu
        </option>
        <option>
          Muslim
        </option>
        <option>
          3
        </option>
        <option>
          4
        </option>
        <option>
          5
        </option>
      </Input>
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="Caste">
          Caste
        </Label>
        <Input
          id="Caste"
          name="Caste"
          placeholder="Please Enter Caste"
        />
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="sub-Caste">
          Sub-Caste
        </Label>
        <Input
          id="sub-Caste"
          name="sub-Caste"
          placeholder="Please Enter sub-Caste"
        />
      </FormGroup>
    </Col>
    <Col md={2} className='d-flex align-items-center'>
     <Button>Search</Button>
    </Col>
    <Col md={3}>
      <FormGroup>
     Advanced filters
      </FormGroup>
    </Col>
  </Row>
</Form>
    </div>
  )
}

export default Filters