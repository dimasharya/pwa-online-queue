import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import TheSuspense from "../../components/TheSuspense";

const Profile = () => {
  const { user, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div className="grid justify-items-center items-center h-screen">
      <div className="flex w-10/12 flex-col items-center rounded-3xl bg-white p-8">
        <img
          className="rounded-full w-48 h-48 my-5 ring-4 ring-gray-200"
          src={user.picture}
        />
        <h2 className="text-xl font-bold text-gray-800">{user.nickname}</h2>
        <h4 className="text-gray-500 mb-4">{user.name}</h4>
        <button
        onClick={() => logoutWithRedirect()}
        className="text-white w-full bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-3">
          Keluar
        </button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <TheSuspense />,
});
