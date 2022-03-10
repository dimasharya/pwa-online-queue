import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

export default function PrivateRoute() {
    const {isAuthenticated} = useAuth0()
    return(
        <>
        {isAuthenticated ? <Navigate to="app/" /> : ""}
        </>
    )
};
