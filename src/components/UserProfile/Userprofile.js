import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, CardText } from "reactstrap";
import { CiSquareMinus, CiHeart } from "react-icons/ci";
import { FaHeart, FaMinusSquare } from "react-icons/fa";
import { User } from "./Data";
import Userinnerpeofile from "./Userinnerprofile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Userprofile.css";
import { useSelector } from 'react-redux';
import { 
    //ImgIcons, 
    UserName, 
    // UserPrimeImage 
} from '../../commonSyles/VewProfilestles';
import { useDispatch } from 'react-redux';
import { getSelectedUserInfo,setSelectedUserInfoEmpty} from '../../redux/slices/users'
import { useParams } from "react-router-dom";
const Userprofile = () => {
  const [imageSrc, setImageSrc] = useState("");
  // const image = ["Image2.jpeg", "Image3.jpeg", "Image4.jpeg", "Image5.jpeg"];
  const [image,setImage]=useState(["","",""])
  // const [isMobileView, setIsMobileView] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const { selelectedUserInfo } = useSelector(state => state.users);
  const [userInfo, setUserInfo]= useState()
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=>{
    if(id){
      dispatch(getSelectedUserInfo(id));
    }
  },[id])

  useEffect(() => {
    if(selelectedUserInfo){
      setUserInfo(User(selelectedUserInfo))
      setImage(selelectedUserInfo?.imageUrls || []);
      if (selelectedUserInfo?.imageUrls && selelectedUserInfo.imageUrls.length > 0) {
        setImageSrc(selelectedUserInfo.imageUrls[0]);
      } else {
        setImageSrc('');
      }
    }
  }, [selelectedUserInfo]);

  useEffect(() => {
    return () => {
      removedata() 
    };
  }, [id, dispatch]);
const removedata=async()=>{
  await dispatch(setSelectedUserInfoEmpty());
}
  const handleCardClick = (image) => {
    setImageSrc(image);
  };

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleMinusClick = () => {
    setIsMinusClicked(!isMinusClicked);
  };

  const CardComponent = () => (
    <Card className="border-0 position-relative" style={{ height: "auto" }}>
      <div className="ratio ratio-1x1" style={{ objectFit: "cover" }}>
        <img
          src={imageSrc}
          alt="Card image cap"
          className="rounded img-fluid w-100 h-100"
        />
      </div>
      <CardBody className="d-flex flex-wrap justify-content-between p-2 position-absolute w-100">
        {isMinusClicked ? (
          <FaMinusSquare className="icons fs-1" onClick={handleMinusClick} />
        ) : (
          <CiSquareMinus className="icons fs-1" onClick={handleMinusClick} />
        )}
        {isHeartClicked ? (
          <FaHeart className="icons fs-1" onClick={handleHeartClick} />
        ) : (
          <CiHeart
            className="icons fs-1"
            data-testid="clickheart"
            onClick={handleHeartClick}
          />
        )}
      </CardBody>
    </Card>
  );
  const Datac = () => (
    <CardBody className="body">
      <div className="row">
        {userInfo?.personalData?.map((user, ind) => {
          return (
            <div className="d-flex justify-content-between" key={ind}>
              <CardText className="mb-3 w-50">{user.key}</CardText>
              <CardText className="mb-3 w-50">{user.value}</CardText>
            </div>
          );
        })}
      </div>
    </CardBody>
  );
  return (
    <>
              <UserName>{userInfo?.userName}</UserName>
    <Container className="main">
      {/* {isMobileView ? (
        <>
        <FaArrowLeft className="pt-1 title" />
          <UserName>{userInfo?.userName}</UserName>
          <div className="row">
            <div className="col-12 m-1">
              <CardComponent />
            </div>
          </div>
          <div className="row">
            {image.map((image, index) => (
              <div key={index} className="col-6 col-sm-6 col-md-3">
                <button
                  className="ratio ratio-4x3 border-0"
                  onClick={() => handleCardClick(image)}>
                  <img
                    src={image}
                    alt="Clickable card"
                    className="fixed-img img-fluid rounded"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 m-1">
              <Card className="h-100">
                <Datac />
              </Card>
            </div>
          </div>
        </>
      ) : (
        <> */}

          <div className="row">
            <div className="col-md-5 m-1">
              <CardComponent />
            </div>
            <div className="col-md-5 m-1">
              <Card className="h-100 border-0">
                <Datac />
              </Card>
            </div>
          </div>
          <div className="row justify-content-left">
            {image?.map((image, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-3 custom-card">
                <button
                  className="ratio ratio-4x3 border-0 "
                  onClick={() => handleCardClick(image)}>
                  <img
                    src={image}
                    alt="Clickable card"
                    className="fixed-img img-fluid rounded"
                  />
                </button>
              </div>
            ))}
          </div>
        {/* </>
      )} */}
      <Userinnerpeofile userData={userInfo}/>
    </Container>
    </>
  );
};

export default Userprofile;
