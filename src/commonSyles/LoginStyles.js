import styled from '@emotion/styled'
import loginbackpage from '../Assets/background.png'
export const LoginBack = styled.div`
background-image: url(${loginbackpage});
  background-size: 1445px 100%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-repeat: no-repeat;
  position: relative;
`;
export const WelcomeText = styled.div`
    top: 8%;
    font-weight: 700;
    margin-left:32px;
    font-size: 35px;
    color: white;
    position: relative;
    left: 108%;
  @media (min-width:0px) and (max-width:1115px) {
    top: 0%;
    margin-left:0px;
    font-size: 35px;
    display: flex;
     position: unset;
     flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #780024;
    left: 0%;
  }
`;
export const LogoText = styled.span`
margin-left: -15px;
      @media (min-width:0px) and (max-width:1115px) {
      margin-left: 0px;
      }
`;
export const DisplayFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
