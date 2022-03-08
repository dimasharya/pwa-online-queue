import { getConfig } from "../config";

const { apiOrigin = "http://localhost:3001", audience } = getConfig();

export function getAllTenant() {
    return fetch(`${apiOrigin}/api/tenant`).then((data) => data.json());
}

export function getTenant(id) {
  return fetch(`${apiOrigin}/api/tenant/${id}`).then((data) => data.json());
}
