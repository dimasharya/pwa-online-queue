import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import TheSuspense from "../components/TheSuspense";

export const Api = () => {
  //const { apiOrigin = "http://localhost:3001", audience } = getConfig();
  const { apiOrigin = "http://localhost:4000", audience } = getConfig();
  
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/tenant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <div>
      <button
        color="primary"
        className="mt-5"
        onClick={callApi}
        disabled={!audience}
      >
        Ping API
      </button>
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
          </div>
        )}
    </div>
  );
};
