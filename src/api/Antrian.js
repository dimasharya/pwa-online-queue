import { getConfig } from "../config";
import APICALL from "./APICALL";
import QueryString from "qs";
import axios from "axios";

const { apiOrigin = "http://localhost:3001", audience } = getConfig();

function validationBeforeAntrianPlacement() {}

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

export function getExistAntrian(tenantId, userId, day){
  return APICALL.get(`/api/antrian/exist?id=${tenantId}&user_id=${userId}&date=${day}&status=Antri`).then((res) => res.data)
}

export function getActiveAntrian(userId){
  return APICALL.get(`/api/antrian/${userId}?status=Antri`).then((res) => res.data)
}

export function getExpiredAntrian(userId){
  return APICALL.get(`/api/antrian/${userId}?status=Selesai`).then((res) => res.data)
}

export function setAntrianBaru(tenantId, data) {
  const option = {
    method: "POST",
    headers: {'content-type' : "application/x-www-form-urlencoded"},
    data: QueryString.stringify(data),
    url: `http://localhost:3001/api/antrian/${tenantId}`
  }
  return axios(option).then((res) => console.log(res))
}

export function getMyActiveTicket(userId){
  return APICALL.get()
}
