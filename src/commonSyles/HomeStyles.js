import loginbackpage from '../Assets/couple.svg'
import styled from '@emotion/styled';
export const LoginBack = styled.image`
background-image: url(${loginbackpage});
  background-size: 1445px 100%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-repeat: no-repeat;
  position: relative;
    @media (min-width:0px) and (max-width:1150px) {
    background-image: url(${loginbackpage});
    background-size: 105px;
    background-repeat: no-repeat;
    background-position: left top;
    background-color: #D9D9D9;
    display: flex;
    justify-content: center;
  }
`;
export const TextSize = styled.div`
font-size: ${(props) => props['font-size']?? '12px'};
text-align: ${(props) => props['text-align']?? 'center'};
color:${(props) => props['Color-code']?? ''};
line-height:${(props) => props['line-height']?? ''};
font-weight:${(props) => props['font-weight']?? 0};
@media (min-width:0px) and (max-width:668px) {
font-size: ${(props) => props['font-size']== '64px'?'30.31px' :'14px'};
color:${(props) => props['mobile-color']??''};
line-height:${(props) => props['line-height'] == '76px'? '35.99px': '19px'};
text-align: ${(props) => props['text-align']?? 'center'};
}
`;
export const DisplayBox = styled.div`
display: ${(props) => props['display']?? 'flex'};
justify-content:${(props) => props['justify-content']?? 'center'};
padding:${(props) => props['padding']?? ''};
flex-direction:${(props) => props['flex-direction']?? 'none'};
@media (min-width:768px) and (max-width:884px) {
padding:15px;
}
@media (min-width:0px) and (max-width:668px) {
padding:8px;
position:relative;
}
`;
export const TextBoxMargin = styled.div`
margin-top: ${(props) => props['margin-top']?? '0px'};
margin-left:${(props) => props['margin-left']?? '0px'};
margin-right:${(props) => props['margin-right']?? '0px'};
margin-bottom:${(props) => props['margin-bottom']?? '0px'};
@media (min-width:768px) and (max-width:884px) {
margin-left:${(props) => props['margin-left']? '48px' :'0px'};
margin-right:0px;
margin-bottom:0px;
};
@media (min-width:0px) and (max-width:668px) {
position:absolute;
margin-top: ${(props) => props['margin-top'] == '6%'?'195px': '0px'};
}
`;
export const TextBoxMarginright = styled.div`
margin-right:${(props) => props['margin-right']?? '0px'};
@media (min-width:0px) and (max-width:884px) {
margin-right:0px;
};
`;
export const Chooseusstyle = styled.div`
display: ${(props) => props['display']?? 'flex'};
justify-content:${(props) => props['justify-content']?? 'center'};
@media (min-width:0px) and (max-width:668px) {
font-size: ${(props) => props['mobile-font-size']?? '12px'};
}
};
`;