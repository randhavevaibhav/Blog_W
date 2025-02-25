import { API_BASE_URL, ENV, LOCAL_API_BASE_URL } from "./constants"
const config = {

    DEV:{
        API:LOCAL_API_BASE_URL
    },
    PROD:{
        API:API_BASE_URL
    }
}

export default config[ENV];