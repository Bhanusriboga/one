const baseURL = "https://pr-pellisambanalu-springboot-service.azurewebsites.net/api/v1";//need to replace actual base url
//  const baseURL = "http://192.168.29.169:8082/api/v1"
const encryptionSalt="palisamandalu"
const endPoints = {
  regester: "/register",
  //simularly add other end points
  signup:"user-signup",
  login:"user-login",
  getAllUsers:"users/users-active",
  userByStatus:"users-by-status",
  userStatus:"user-status",
  userInfo:"user-info?userId=",
  otpverify:"user-otp-verification",
  reSendOtp:"request-mobile-otp",
  requestMobileOtp:"request-mobile-otp?mobile=",
  mobileOtpVerify:"verify-mobile-otp",
  requestEmailOtp:"request-email-otp?email=",
  changePassword:"change-password",
  deleteAccount:"profile",
  verifyEmailOtp:"verify-email-otp"
}

export { baseURL, endPoints, encryptionSalt }      