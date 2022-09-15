import axios from "axios";
import * as Config from "../constans/ConfigApi"

export default function ApiCaller(endpoin,method = 'GET',body){
    return axios({
        method:method,
        url: `${Config.API_URL}${endpoin}`,
        data: body
    }).catch(err => {
        console.log(err)
    })
}