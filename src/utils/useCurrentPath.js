import { matchRoutes, useLocation } from "react-router-dom"

const routes = [{ path: "/" }]

export const useCurrentPath = () => {
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location)
  return route.path
}