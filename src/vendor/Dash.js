import React, { useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import './Dash.css';
import { useDispatch, useSelector } from 'react-redux';
import { graphApi } from '../redux/slices/AdminUsers';


const CustomWidget = () => {
    const dispatch =useDispatch()
    const {data} = useSelector(state=>state.adminUsers)
    const fetchusersData = async()=>{
       await dispatch(graphApi())
    }
    useEffect(()=>{
        fetchusersData()
    },[])
    const formattedData = data?.graphDtos?.map(item => ({
        name: item?.date,
        sales: item?.noOfUsers
    }));
    return (
        <div className='graphmaindiv'>
            {/* <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                <Row>
                    <Col xs="6" sm="6" md="3">
                        <Card className="dashboard-card today-users-card position-relative">
                            <CardBody className="text-left dashboard-col today-users-col">
                                <div className="dashboard-card-text mb-1">Today Users</div>
                                <div className="dashboard-card-number mb-0">40,689</div>
                                <HiMiniUsers className="dashboard-icon today-users-icon position-absolute" />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" sm="6" md="3">
                        <Card className="dashboard-card total-users-card position-relative">
                            <CardBody className="text-left dashboard-col total-users-col">
                                <div className="dashboard-card-text mb-1">Total Users</div>
                                <div className="dashboard-card-number mb-0">10,293</div>
                                <FaUsers className="dashboard-icon total-users-icon position-absolute" />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div> */}
            <div className="dashboard-container">
      <h1 className="dashboard-title mb-3">Dashboard</h1>
      <Row>
        <Col md="3" sm="2" xs="6" className='me-md-5'>
          <Card className="dashboard-card today-users-card position-relative">
            <CardBody className="text-left">
              <div className="dashboard-card-text mb-1">Today Users</div>
              <div className="dashboard-card-number mb-0">{data?.totalTodayUsers}</div>
              <HiMiniUsers className="dashboard-icon today-users-icon position-absolute" />
            </CardBody>
          </Card>
        </Col>
        <Col md="3" sm="2" xs="6" >

          <Card className="dashboard-card total-users-card position-relative">
            <CardBody className="text-left">
              <div className="dashboard-card-text mb-1">Total Users</div>
              <div className="dashboard-card-number mb-0">{data?.totalNoOfUsers}</div>
              <FaUsers className="dashboard-icon total-users-icon position-absolute" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
            <div className='Graphdiv'>
                <div className="row">
                    <div className="col-12">
                        <div className="chart-container-fluid "  style={{backgroundColor:"white", height:"400px",borderRadius:"10px", margin:"0px 20px"}} >
                            
                            <ResponsiveContainer width="95%" height={300} ml-5 >
                            <h3 className='sales-head mb-4 pt-4'>Sales Details</h3>
                                <AreaChart
                                    data={formattedData}
                                    margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                                >
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4880FF" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#4880FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid className="custom-cartesian-grid" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#4880FF"
                                        fill="url(#colorSales)"
                                        dot={{ stroke: '#4880FF', strokeWidth: 2, fill: '#fff', r: 4 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomWidget;
