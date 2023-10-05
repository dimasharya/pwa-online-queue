import { getConfig } from "../config";

//const { apiOrigin = "https://paw-online-queue-api.herokuapp.com", audience } = getConfig();
const { apiOrigin = "http://localhost:4000", audience } = getConfig();

export function getAllTenant() {
    return fetch(`${apiOrigin}/api/tenant`).then((data) => data.json());
}

export function getTenant(id) {
  return fetch(`${apiOrigin}/api/tenant/${id}`).then((data) => data.json());
}
