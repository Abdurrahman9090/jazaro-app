import axios from "axios";
// eslint-disable-next-line no-process-env
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;

export const BackendInstance = axios.create({
  baseURL: `${backendUrl}/api/`,
  withCredentials: true,
});

export const config = {
  headers: {
    "Content-Type": " application/json ", // application/x-www.form-urlencoded
  },
};
