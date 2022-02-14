import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Login(params) {
    const { loginWithRedirect } = useAuth0()
    return(
        loginWithRedirect()
    )
};
