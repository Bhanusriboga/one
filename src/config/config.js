const baseURL = "http://192.168.29.168:8082/api/v1";//need to replace actual base url
const encryptionSalt="palisamandalu"
const endPoints = {
  regester: "/register",
  //simularly add other end points
  signup:"user-signup",
  login:"user-login"
}

export { baseURL, endPoints, encryptionSalt }