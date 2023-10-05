import { getConfig } from "../config";

//const { apiOrigin = "https://paw-online-queue-api.herokuapp.com", audience } = getConfig();
const { apiOrigin = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL, audience } = getConfig();

export function getAllTenant() {
    return fetch(`${apiOrigin}/api/tenant`).then((data) => data.json());
}

export function getTenant(id) {
  return fetch(`${apiOrigin}/api/tenant/${id}`).then((data) => data.json());
}
