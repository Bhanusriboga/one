import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import FooterBar from './FooterBar'
import PageContainer from './PageContainer'
import { fetchUserInfo } from '../../redux/slices/AuthSlice'
import './Dashboard.scss'
import { getCaste } from '../../redux/slices/users'
// import ComingSoon from '../ComingSoon/ComingSoon'
import TermsAndConditions from "../Signup/TermsAndConditions.jsx";
import { terms_conditios} from "../Signup/assets"
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfWorker], { type: 'application/javascript' }));

const Dashboard = () => {
  const dispatch=useDispatch()
  const [termsCondition, setTermsCondition] = useState(false);
  const getUSerInfo=async()=>{
    await dispatch(fetchUserInfo())
    await dispatch(getCaste())
   }
  useEffect(() => {
    getUSerInfo()
  },[])
  const botRef=React.createRef(null)
  const scrollToBottom=()=>{
    botRef?.current?.scrollIntoView({behavior:'smooth'})
  }
  const setTrueTermAndConditions=()=>{
    setTermsCondition(true)
  }
  return (
    <div className='h-100 w-100 pgback'>
      <div className='pageHeader'>
        <Header scrollToBottom={scrollToBottom}/>
      </div>
      <div className='pageContainer conwidth'>
        {/* <ComingSoon/> */}
        {termsCondition && (
        <div className="terms-condition-parent overlay " onClick={() => setTermsCondition(false)}>
          <div className="terms-condition">
            <TermsAndConditions pdfUrl={terms_conditios} />
          </div>
        </div>
      )}
        <PageContainer/>
        <div className='pageFooter' ref={botRef}>
        <FooterBar setTermsCondition={setTrueTermAndConditions} />
      </div>
      </div>


    </div>
  )
}

export default Dashboard