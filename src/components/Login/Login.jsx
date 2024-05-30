import { useNavigate } from "react-router-dom";
import "./login.css"

function Login(){
    
    const navi=useNavigate()
   
    const onPassword=(e)=>{
      
    }
    const onEmail=()=>{
        
    }
    const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.getElementById("login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      const emailaddress=document.getElementById("email")
      const emailerror=document.getElementById("emailpara")
      const emailaddress2=document.getElementById("email2")
      const emailerror2=document.getElementById("emailpara2")
      
      
      
      function generateOTP() {
        var phoneNumber = document.getElementById("phone").value;
        console.log(phoneNumber)
        if (!phoneNumber) {
          alert("Please enter a phone number.");
          return;
        }
         if(isValidPhoneNumber(phoneNumber)){
        var otp = Math.floor(100000 + Math.random() * 900000);
        alert("OTP sent to your phone: " + otp);
        // Show the OTP input section
        document.getElementById("otpSection").style.display = "block";
        // Store OTP in session storage
        sessionStorage.setItem("otp", otp);
         }
         else{
          alert("please enter valid phone number");
         }
      }
        
      function isValidPhoneNumber(phoneNumber) {
        var phoneNumberPattern = /^[0-9]{10}$/; // Accepts only 10-digit numbers
        console.log(phoneNumber)
        return phoneNumberPattern.test(phoneNumber);
      }
  
      // Function to validate phone number and generate OTP
      function validateAndGenerateOTP() {
        var phoneNumber = document.getElementById("phone").value;
        if (!isValidPhoneNumber(phoneNumber)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }
      }
      // Function to verify OTP
      function verifyOTP() {
        var otpInput = document.getElementById("otp").value;
        var otpGenerated = sessionStorage.getItem("otp");
  
        if (!otpGenerated) {
          alert("Please generate OTP first.");
          return;
        }
  
        if (otpInput === otpGenerated) {
          document.getElementById("message").innerHTML = "OTP Verified Successfully!";
        } else {
          document.getElementById("message").innerHTML = "Invalid OTP. Please try again.";
        }
      }
      
  function showpassword() {
    
} 

const onSignupClick=()=>{
    navi("./register")
}

    return(
        
    <div className="wrapper">
        
    <div className="title-text">
      <div className="title login">Login Form</div>
      <div className="title signup">Signup Form</div>
    </div>
    <div className="form-container">
      <div className="slide-controls">
        <input type="radio" name="slide" id="login"/>
        <input type="radio" name="slide" id="signup" onClick={onSignupClick}/>
        <label htmlFor="login" className="slide login">Login</label>
        <label htmlFor="signup" className="slide signup">Signup</label>
        <div className="slider-tab"></div>
      </div>
      <div className="form-inner">
        <form action="#" className="login">
          <div className="field">
            <input type="text" placeholder="Username/Mobile" onChange={onEmail} required id="email"/>
            
          </div>
          <div className="field">
            <p id="hai">
				<input type="password" value="" className="bi bi-eye-slash" onChange={onPassword} name="password" id="password" placeholder="Password"/>
				<i className="bi bi-eye-slash" id="togglePassword" onClick={showpassword}></i>
			</p>
          </div>
          <div className="pass-link"><a href="forgotpasseword.html">Forgot password?</a></div>

          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value="Login" id="loginbutton"/>
          </div>
          
          <div className="signup-link">Not a member? <a href="">Signup now</a></div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "center" }}>
            <p style={{marginTop: "20px"}} >or signup with</p>
            <div style={{display: "flex"}} >
            <a href="#" className="fa fa-facebook" ></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-instagram"></a>
        </div>
        </div>
        </form>
        <form action="#" className="signup">
            <div className="field" style={{display: "inlineFlex"}}>
                
                <input type="text"    placeholder="+91 mobilenumber"  id="phone"  style={{width: "fitContent"}} />
                <button type="submit" className="btn btn-outline-secondary" style={{marginLeft: "10px"}} onClick={generateOTP} >verify</button>
               
              </div>
          <div className="field" id="otpSection" >
            <div className="sendotp">
                <div className="verifyotpwidth">
            <input type="text" placeholder="enter otp" required id="otp" style={{width: "200px", marginLeft: "50px",maxlength:"6"}}/ >
            <button type="button" className="btn btn-outline-primary" style={{left: "40px", width: "80px"}} onClick={verifyOTP}>Submit</button><br/>
          </div></div></div><p  id="message"></p>
          <div className="field">
            <input type="text" placeholder="username" required id="email2" />
            
            </div>
            <div className="field">
                <input type="password" placeholder="Create password" required/>
            </div>
          <div className="field">
            <input type="password" placeholder="Confirm password" required/>
          </div>
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value="Signup"/>
          </div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center" ,alignItems: "center" }}>
            <p style={{marginTop: "20px"}} >or signup with</p>
            <div style={{display: "flex"}} >
            <a href="#" className="fa fa-facebook" ></a>
            <a href="#" className="fa fa-google"></a>
            <a href="#" className="fa fa-instagram"></a>
        </div>
        </div>
        </form>
      </div>
    </div>
  </div>)
        
    
}
export default Login