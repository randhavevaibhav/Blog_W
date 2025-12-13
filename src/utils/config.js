import {
  DEV_API_BASE_URL,
  PROD_API_BASE_URL,
  ENV,
} from "../utils/envVariables";
const config = {
  DEV: {
    API: DEV_API_BASE_URL,
    ENV,
  },
  PROD: {
    API: PROD_API_BASE_URL | "https://blog-w-api.vercel.app",
    ENV,
  },
};
export default config[ENV];
