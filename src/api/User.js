import React, { useState } from "react";
import { getConfig } from "../config";
import { useAuth0 } from "@auth0/auth0-react";
import APICALL from "./APICALL";

export const User = () => {
  let userData;
  const { domain } = getConfig();

  const { getAccessTokenSilently, user } = useAuth0();

  const token = getAccessTokenSilently();

  var options = {
    method: "GET",
    url: `https://${domain}/api/v2/users`,
    params: { q: `email:"${user.email}"`, search_engine: "v3" },
    headers: { authorization: `Bearer ${token}` },
  };

  // const response = await fetch(`${apiOrigin}/api/getUser`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // const responseData = await response.json();

APICALL.request(options).then((res) => (userData = res.data));

  return userData;
};
