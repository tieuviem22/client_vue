import axios from "axios";
import JwtService from "@/store/jwt.service";
// import '../assets/mixin';
// import router from "../../router";

/**
 * Service to call HTTP request via Axios
 */

var token = JwtService.getToken();
const ApiService = {
    getApi(url ) {
        return axios.get(
        process.env.VUE_APP_BASE_URL + url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    postApi(url, params) {
        return axios
        .post(
          process.env.VUE_APP_BASE_URL + url,
          params,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
    },
    


};

export default ApiService;
