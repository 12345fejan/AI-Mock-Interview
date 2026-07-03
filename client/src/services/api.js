import axios from "axios";

const API = axios.create({
     baseURL: "https://ai-mock-interview-paxo.onrender.com/api"
    // baseURL:"http://localhost:5000/api"
});

API.interceptors.request.use((config)=>{

const token=localStorage.getItem("token");

if(token){

config.headers.Authorization=`Bearer ${token}`;

}

return config;

});

// API.interceptors.response.use(

// (response)=>response,

// (error)=>{

// if(error.response?.status===401){

// localStorage.clear();

// window.location="/login";

// }

// return Promise.reject(error);

// }

// );

API.interceptors.response.use(

  (response) => response,

  (error) => {

    const url = error.config?.url || "";

    // Login/Register par redirect mat karo
    if (
      error.response?.status === 401 &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/register")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location = "/login";
    }

    return Promise.reject(error);
  }

);

 export default API;