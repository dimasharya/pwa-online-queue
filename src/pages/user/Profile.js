import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import TheSuspense from "../../components/TheSuspense";
import { PenIcon } from "../../assets/svg";
import { useForm } from "react-hook-form";
import {
  editRekamMedis,
  getLastNoRekamMedis,
  getRekamMedis,
  setRekamMedisBaru,
} from "../../api/RekamMedis";

const Profile = () => {
  const { user, logout } = useAuth0();

  const [dataRekamMedis, setDataReakamMedis] = useState({
    nama: "",
    alamat: "",
    no_telepon: "",
    nomor_rekam: "",
    user_id: user.email,
  });

  const getDataRekamMedis = async () =>
    await getRekamMedis(user.email).then((res) => {
      if (res.length !== 0) {
        setDataReakamMedis(res);
      }
    });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      await getRekamMedis(user.email).then((res) => {
        if (res.length !== 0) {
          setDataReakamMedis(res);
        }
      });
    };
    if (mounted) {
      fetchData();
    }
    return () => (mounted = false);
  }, []);

  const { register, handleSubmit } = useForm();

  const [edit, setEdit] = useState(false);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  function viewData() {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-800">{dataRekamMedis.nama}</h2>
        <h4 className="text-gray-500 mb-4">{user.name}</h4>
      </>
    );
  }

  function editForm() {
    return (
      <>
        <form className="flex flex-col" onSubmit={handleSubmit(saveData)}>
          <label
            htmlFor="email-address-icon"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nama
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
              </svg>
            </div>
            <input
              type="text"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(
                "nama",
                { value: dataRekamMedis.nama },
                { required: true }
              )}
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Alamat
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
              >
                <path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM176 128c35.35 0 64 28.65 64 64s-28.65 64-64 64s-64-28.65-64-64S140.7 128 176 128zM272 384h-192C71.16 384 64 376.8 64 368C64 323.8 99.82 288 144 288h64c44.18 0 80 35.82 80 80C288 376.8 280.8 384 272 384zM496 320h-128C359.2 320 352 312.8 352 304S359.2 288 368 288h128C504.8 288 512 295.2 512 304S504.8 320 496 320zM496 256h-128C359.2 256 352 248.8 352 240S359.2 224 368 224h128C504.8 224 512 231.2 512 240S504.8 256 496 256zM496 192h-128C359.2 192 352 184.8 352 176S359.2 160 368 160h128C504.8 160 512 167.2 512 176S504.8 192 496 192z" />
              </svg>
            </div>
            <input
              type="text"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(
                "alamat",
                { value: dataRekamMedis.alamat },
                { required: true }
              )}
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nomor Telepon
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
              >
                <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
              </svg>
            </div>
            <input
              type="phone"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(
                "no_telepon",
                { value: dataRekamMedis.no_telepon },
                { required: true }
              )}
            />
          </div>
          <button
            type="submit"
            className="text-white w-full bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-3"
          >
            Simpan
          </button>
        </form>
      </>
    );
  }

  async function saveData(props) {
    let data = {
      nama: props.nama,
      alamat: props.alamat,
      no_telepon: props.no_telepon,
      nomor_rekam: dataRekamMedis.nomor_rekam,
      user_id: user.email,
    };

    let nomor_rekam_terakhir;

    await getLastNoRekamMedis().then((res) => {
      nomor_rekam_terakhir = parseInt(res.nomor_rekam) + 1;
    });

    const existRekamMedis = await getRekamMedis(user.email);

    if (existRekamMedis.length === 0) {
      // jika belum ada nomor rekam medis
      data.nomor_rekam = nomor_rekam_terakhir;
      await setRekamMedisBaru(user.email, data);
      await getDataRekamMedis()
      await setEdit(false)
    } else {
      // jika sudah ada nomor rekam medis
      await editRekamMedis(user.email, data)
      await getDataRekamMedis()
      await setEdit(false)
    }
  }

  return (
    <div className="grid justify-items-center items-center h-screen w-screen">
      <div className="max-w-xs  w-10/12 rounded-3xl bg-white">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setEdit(!edit)}
            type="button"
            className="text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
          >
            <svg className="h-3 w-3">
              <PenIcon />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center pt-2 px-8 pb-8">
          <img
            className="rounded-full w-48 h-48 my-5 ring-4 ring-gray-200"
            src={user.picture}
            alt="user_image"
          />
          {edit === false ? viewData() : editForm()}
          <button
            onClick={() => logoutWithRedirect()}
            className="text-white w-full bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-3"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <TheSuspense />,
});
