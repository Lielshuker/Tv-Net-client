// import axios from "axios"

// export async function loginUser({ username, password }) {
//   return await axios.post(`http://localhost:5000/auth/login`, { username, password })
//     .then(function (response) { console.log(response); return response.data['access_token'] })
//     .catch(function (error) { console.log(error); });
// }

// export async  function getProfile(token) {
//   return await axios.post(`http://localhost:5000/auth/profile`, {headers: { Authorization: 'Bearer ' + token}})
//   .then(function (response) { console.log(response); return response.data})
//   .catch((error) => {
//     if (error.response) {
//       console.log(error.response)
//       console.log(error.response.status)
//       console.log(error.response.headers)
//       }
//   })}
