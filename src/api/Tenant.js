import { getConfig } from "../config";

const { apiOrigin = "http://localhost:3001", audience } = getConfig();

export function getAllTenant() {
    return fetch(`${apiOrigin}/api/tenant`).then((data) => data.json());
}

export function getTenant() {
  return fetch(`${apiOrigin}/api/tenant`).then((data) => data.json());
}
