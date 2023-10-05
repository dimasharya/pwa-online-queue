import { getConfig } from "../config";
import APICALL from "./APICALL";
import axios from "axios";
import QueryString from "qs";

//const { apiOrigin = "https://paw-online-queue-api.herokuapp.com", audience } = getConfig();
const { apiOrigin = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL, audience } = getConfig();

export function getAntrianAktif(tenantId, day) {
  return APICALL.get(
    `/api/antrian/activenow?id=${tenantId}&date=${day}&status=Aktif`
  ).then((res) => res.data);
}

export function getAntrianAll(tenantId, day) {
  return APICALL.get(`/api/antrian/all?id=${tenantId}&date=${day}`).then(
    (res) => res.data
  );
}

export function getLastAntrian(tenantId, day) {
  return APICALL.get(`/api/antrian/last?id=${tenantId}&date=${day}&status=Antri`
  ).then((res) => res.data);
}

export function getAntrianSelesai(tenantId, day) {
  return APICALL.get(`/api/antrian/selesai?id=${tenantId}&date=${day}&status=Selesai`
  ).then((res) => res.data);
}

export function getAntrianBatal(tenantId, day) {
  return APICALL.get(`/api/antrian/selesai?id=${tenantId}&date=${day}&status=Dibatalkan`
  ).then((res) => res.data);
}

export function getExistAntrian(tenantId, userId, day){
  return APICALL.get(`/api/antrian/exist?id=${tenantId}&user_id=${userId}&date=${day}&status=Antri`).then((res) => res.data)
}

export function getActiveAntrian(userId){
  return APICALL.get(`/api/antrian/${userId}?status=Antri`).then((res) => res.data)
}

export async function getExpiredAntrian(userId){
  let thedata, thedata1, thedata2
  await APICALL.get(`/api/antrian/${userId}?status=Selesai`).then((res) => thedata1 = [ ...res.data])
  await APICALL.get(`/api/antrian/${userId}?status=Dibatalkan`).then((res) => thedata2 = [ ...res.data])
  thedata = [...thedata1, ...thedata2]
  return thedata
}

export function setAntrianBaru(tenantId, data) {
  const option = {
    method: "POST",
    headers: {'content-type' : "application/x-www-form-urlencoded"},
    data: QueryString.stringify(data),
    url: `${apiOrigin}/api/antrian/${tenantId}`
  }
  return axios(option).then((res) => res.data)
}

export function setCancelAntrian(antrianId){
  const option = {
    method: "PUT",
    headers: {'content-type' : "application/x-www-form-urlencoded"},
    url: `${apiOrigin}/api/antrian/cancel?antrianId=${antrianId}`
  }
  return axios(option).then((res) => res.data)
}