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
import PropTypes from 'prop-types';
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
    props.handleFilters({ marital, occupation });//avoid eslint error  have add this so 
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
                data-testid="religion-select"
              >
                <option value={''}>Select Religion</option>
                {religion.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup onChange={(e) => handleSelect(e, "cast")} data-testid="cast-input">
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
          <Col md={3}>
            <FormGroup onChange={(e) => handleSelect(e, "subcast")} data-testid="subcast-input">
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
            <Button className='seatchButton' onClick={handleBasicSearch} data-testid="basic-search-button" >Search</Button>
          </Col>
          <Col md={3} className='d-flex align-items-center mt-5'>
            <FormGroup className='mb-4'>
              <Dropdown isOpen={dropdownOpen} toggle={(e) => toggle(e)} className='advancedfilters' data-testid="advanced-filters-dropdown">
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
                          data-testid="marital-single"
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
                          data-testid="marital-married"
                        // checked={marital === 'Married'? true:false}
                        />
                        {'Married'}
                      </div>

                      <div>
                        <Input
                          name="radio1"
                          type="radio"
                          value={'Widowed'}
                          data-testid="marital-widowed"
                        // checked={marital === 'Widowed'? true:false}
                        />
                        {' Widowed'}
                      </div>
                      <div>

                        <Input
                          name="radio1"
                          type="radio"
                          value={'Diversed'}
                          data-testid="marital-divorced"
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
                            data-testid="occupation-business-owner"
                          />
                          {' Bussiness Owener '}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Governament employee'}
                            data-testid="occupation-government-employee"
                          />
                          {'Governament employee'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Corporate Employee'}
                            data-testid="occupation-corporate-employee"
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
                            data-testid="occupation-self-employed"
                          />
                          {'Self Employed'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Celebrity'}
                            data-testid="occupation-celebrity"
                          />
                          {'Celebrity'}
                        </div>
                        <div>
                          <Input
                            name="radio1"
                            type="radio"
                            value={'Un Employed'}
                            data-testid="occupation-unemployed"
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
                      type='number'
                      step="0.01"
                        placeholder='Min'
                        data-testid="age-min"
                      />
                    </div>
                    <div className='p-2'>
                      <Input
                       type='number'
                       step="0.01"
                        placeholder='Max'
                        data-testid="age-max"
                      />
                    </div>
                  </div>
                  <div className='p-2'>
                    <Input
                     type='number'
                     step="0.01"
                      placeholder='annual income'
                      data-testid="annual-income" 
                    />
                  </div>
                  <div className='p-2'>
                    <Input
                      placeholder='Enter City'
                      data-testid="city-input"
                    />
                  </div>
                          <div className='d-flex justify-content-center px-2'>
                          <Button className='seatchButton' onClick={(e)=>toggleSearch(e)} data-testid="advanced-search-button">Search</Button>
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

Filters.propTypes = {
  handleBasic: PropTypes.func.isRequired,
  handleFilters: PropTypes.func.isRequired,
};
export default Filters;