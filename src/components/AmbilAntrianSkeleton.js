import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function AmbilAntrianCard() {

  return (
    <>
      <div className="max-w-sm mt-2 mx-5 bg-white rounded-2xl border-0">
        <img
          className="rounded-t-2xl bg-gray-300"
          src="https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?cs=srgb&dl=pexels-linkedin-sales-navigator-2182979.jpg&fm=jpg"
          alt=""
        />
        <div className="animate-pulse p-5">
          <h5 className="-mb-1 text-xl truncate font-bold tracking-tight text-gray-800">
            
          </h5>
          <div className="flex items-center bg-gray-300 py-1 px-3 rounded-xl text-xs text-gray-300 gap-2">
              <span>PLACEHOLDER</span>
            </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center bg-gray-300 py-1 px-3 rounded-xl text-xs text-gray-300 gap-2">
              <span>PLACEHOLDER</span>
            </div>
            <div className="flex items-center bg-gray-300 py-1 px-3 rounded-xl text-xs text-gray-300 gap-2">
              <span>PLACEHOLDER</span>
            </div>
          </div>
          <div className="mt-4">
            <form>
              <div>
              <div className="flex mb-2 items-center bg-gray-300 py-1 px-3 rounded-xl text-xs text-gray-300 gap-2">
              <span>PLACEHOLDER</span>
            </div>
                <div
                  className="block px-3 py-2 w-full bg-gray-300 h-8 text-gray-600 text-sm font-semibold rounded-lg border border-gray-300 sm:text-xs focus:border-opacity-0 focus:ring-4 focus:ring-gray-300"
                />
              </div>
            </form>
          </div>
          <div className="mt-4 flex flex-row items-center border h-20 bg-gray-300 px-2 py-4 rounded-xl">
          </div>
            <button
              type="button"
              className="text-white w-full bg-gray-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-3 disabled:bg-gray-500"
            >
              Ambil Antrian
            </button>
        </div>
      </div>
    </>
  );
}
