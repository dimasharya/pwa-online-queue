import { getConfig } from "../config";
import APICALL from "./APICALL";
import axios from "axios";
import QueryString from "qs";

const { apiOrigin = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL, audience } = getConfig();
//const { apiOrigin = "http://localhost:4000", audience } = getConfig();

export function getRekamMedis(userId) {
  return APICALL.get(`/api/rekam/${userId}`).then((res) => res.data);
}

export function getLastNoRekamMedis() {
  return APICALL.get(`/api/rekamlast`).then((res) => res.data);
}

export function setRekamMedisBaru(userId, data) {
  const option = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: QueryString.stringify(data),
    url: `${apiOrigin}/api/rekam/${userId}`,
  };
  return axios(option).then((res) => res.data);
}

export function editRekamMedis(userId, data) {
  const option = {
    method: "PUT",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: QueryString.stringify(data),
    url: `${apiOrigin}/api/rekam/${userId}`,
  };
  return axios(option).then((res) => res.data);
}
