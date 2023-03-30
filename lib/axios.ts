// import { ROUTE_PATH } from 'routes/paths';
// import { HTTP_STATUS } from 'constants/http-code.const';
// import { LOCAL_STORAGE } from 'constants/system.const';
import axios from 'axios';
import { environment } from 'environments/environment';

// INIT COMMON INSTANCE
const axiosConfigs = {
  baseURL: environment.apiUrl,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
};

//AXIOS INSTANCE WITHOUT AUTH, FOR PUBLIC API
export const instancePublic = axios.create(axiosConfigs);

// AXIOS INSTANCE
const instance = axios.create(axiosConfigs);

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   async (response) => {
//     return response.data;
//   },
//   async (error) => {
//     if (error.response.status === HTTP_STATUS.StatusUnauthorized) {
//       const refreshToken = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
//       try {
//         const rs = await axios.post(
//           `${environment.apiUrl}/authentication/refresh-token`,
//           {
//             refresh_token: refreshToken,
//           },
//           {
//             headers: {
//               Authorization: error.config.headers.Authorization,
//             },
//           }
//         );
//         const { access_token, token } = rs.data;
//         error.config.headers['Authorization'] = 'Bearer ' + access_token;
//         localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
//         return instance(error.config);
//       } catch (_error) {
//         return (window.location.href = ROUTE_PATH.AUTH.SIGNIN);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default instance;
