import React, { useState } from 'react'
import './Dashboard.scss'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { religion } from '../../utils/constants';
const Filters = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [basicfilers, setBasicfilters] = useState({religion:"",cast:"",subcast:""})
  const [marital, setMarital] = useState('');
  const [occupation, setOccupation] = useState('');

  const toggle = (e) => {
    e.preventDefault()
    setDropdownOpen(!dropdownOpen);
  }
  const toggleSearch = (e) => {
    e.preventDefault()
    // props.handleFilters()
    setDropdownOpen(false)
  };
  const handleBasicSearch=(e)=>{
    e.preventDefault()
    props.handleBasic(basicfilers)
  }
  const handleSelect = (e,type) => {
    if(type === 'religion'){
      setBasicfilters({...basicfilers,religion:e.target.value})
    } else if(type === 'cast'){
      setBasicfilters({...basicfilers,cast:e.target.value})
    } else if(type === 'subcast'){
      setBasicfilters({...basicfilers,subcast:e.target.value})
    }
  }

  return (
    <div className='p-2 pl-0'>
      <Form>
        <Row className='d-flex align-items-center'>
          <Col md={2}>
            <FormGroup onChange={(e) => handleSelect(e, "religion")}>
              <Label for="Religion" className='fontSie'>
                Religion
              </Label>
              <Input
                id="exampleSelect"
                name="select"
                className='filterInput'
                type="select"
              >
                <option value={''}>Select Religion</option>
                {religion.map((val) => (
                  <option value={val}>
                    {val}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup onChange={(e) => handleSelect(e, "cast")}>
              <Label for="Cast" className='fontSie'>
                Caste
              </Label>
              <Input
                id="Cast"
                name="Cast"
                placeholder="Enter Caste"
                className='filterInput'
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup onChange={(e) => handleSelect(e, "subcast")}>
              <Label for="sub-Caste" className='fontSie'>
                Sub-Caste
              </Label>
              <Input
                id="sub-Caste"
                name="sub-Caste"
                placeholder="Enter sub-Caste"
                className='filterInput'
              />
            </FormGroup>
          </Col>
          <Col md={2} className='d-flex align-items-center mt-4'>
            <Button className='seatchButton' onClick={handleBasicSearch}>Search</Button>
          </Col>
          <Col md={3} className='d-flex align-items-center mt-5'>
            <FormGroup className='mb-4'>
              <Dropdown isOpen={dropdownOpen} toggle={(e) => toggle(e)}>
                <DropdownToggle caret outline color="dark">Advanced Filters</DropdownToggle>
                <DropdownMenu className='dropDownBack' color='beige'>
                  <DropdownItem header>Marital status</DropdownItem>
                  <Form>
                    <FormGroup check={true}
                      onChange={(e) => { setMarital(e.target.value)}}
                      className='d-flex justify-content-between px-2 maritalstatuss'
                    >

                      <div>
                        <Input
                          name="radio1"
                          type="radio"
                          value={'Single'}
                        // checked={marital === 'Single'? true:false}

                        />
                        {'Single '}
                        {/* <Label check>
                          Single
                        </Label> */}
                      </div>
                      <div>
                        <Input
                          name="radio1"
                          type="radio"
                          value={'Married'}
                        // checked={marital === 'Married'? true:false}
                        />
                        {'Married'}
                      </div>

                      <div>
                        <Input
                          name="radio1"
                          type="radio"
                          value={'Widowed'}
                        // checked={marital === 'Widowed'? true:false}
                        />
                        {' Widowed'}
                      </div>
                      <div>

                        <Input
                          name="radio1"
                          type="radio"
                          value={'Diversed'}
                        // checked={marital === 'Diversed'? true:false}
                        />
                        {' Diversed'}
                      </div>
                    </FormGroup>
                  </Form>
                  <DropdownItem divider />
                  <DropdownItem header>Occupation</DropdownItem>
                  <Form>
                    <FormGroup check={true}
                      onChange={(e) => { setOccupation(e.target.value)}}
                      className='d-flex justify-content-between px-2 maritalstatuss'
                    >
                      <div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Bussiness Owener'}
                          />
                          {' Bussiness Owener '}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Governament employee'}
                          />
                          {'Governament employee'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Corporate Employee'}
                          />
                          {'Corporate Employee'}
                        </div>
                      </div>

                      <div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Self Employed'}
                          />
                          {'Self Employed'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Celebrity'}
                          />
                          {'Celebrity'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Un Employed'}
                          />
                          {'Un Employed'}
                        </div>
                      </div>

                    </FormGroup>
                  </Form>
                  <DropdownItem divider />
                  <DropdownItem header >Age</DropdownItem>
                  <div className='d-flex'>
                    <div className='p-2'>
                      <Input
                        placeholder='Min'
                      />
                    </div>
                    <div className='p-2'>
                      <Input
                        placeholder='Max'
                      />
                    </div>
                  </div>
                  <div className='p-2'>
                    <Input
                      placeholder='annual income'
                    />
                  </div>
                  <div className='p-2'>
                    <Input
                      placeholder='Enter City'
                    />
                  </div>
                          <div className='d-flex justify-content-center px-2'>
                          <Button className='seatchButton' onClick={(e)=>toggleSearch(e)} >Search</Button>
                          </div>



                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Col>


        </Row>
      </Form>
    </div>
  )
}

export default Filters