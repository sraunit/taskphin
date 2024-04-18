import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import api from "../api_routes.txt";
import Notification from "./Notification";
import { useEffect } from "react";
import { useCallback } from "react";
export default function Boxedit(props) {
  const [type1, setType1] = useState("text");
  const [type2, setType2] = useState("text");
  const [loader, setLoader] = useState(false);
  const auth = "Bearer " + sessionStorage.getItem("token");
  const [notify, setNotification] = useState({ type: "", message: "" });
  const [creds, setCreds] = useState({
    name: "",
    description: null,
    startTime: null,
    endTime: null,
  });
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#353D7C",
    borderRadius: "50px",
    padding: "50px",
    zIndex: 1000,
  };
  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(128,128,128,.7)",
    zIndex: 1000,
  };
  function handle_response(res) {
    setNotification({ type: res.sucess, message: res.message });
  }
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: auth },
    
  };
  
  async function handle_submit() {
    setLoader(true);
    let api_url = await fetch(api);
    let url = await api_url.text();
    let obj = {
      name: props.edit.name,
      description: creds.description
        ? creds.description
        : props.edit.description,
      startTime: creds.startTime ? creds.startTime : props.edit.startTime,
      endTime: creds.endTime ? creds.endTime : props.edit.endTime,
    };
 
    
    if (
      obj.name.length !== 0 &&
      obj.startTime &&
      obj.endTime &&
      obj.startTime <= obj.endTime
    ) {
     
      fetch(url + "editcard", {...requestOptions,body:JSON.stringify(obj)})
        .then((res) => res.json())
        .then((res) => handle_response(res));
    }
  }
  function handle_out(e) {
    if (!e.target.value) {
      if (e.target.id === "endTime") {
        setType2("text");
      } else {
        setType1("text");
      }
    }
  }
  const cleanup = useCallback(() => {
    setLoader(false);

    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 7500);
  }, []);

  useEffect(() => {
    if (loader) {
      cleanup();
    }
  }, [notify]);

  const page = (
    <div style={OVERLAY_STYLES}>
      {notify.message.length && (
        <Notification
          type={notify.type}
          message={notify.message}
        ></Notification>
      )}
      <div style={MODAL_STYLES}>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold mb-5 py-1 p-3 rounded"
          onClick={props.click}
        >
          ❌
        </button>
        <form className="w-full max-w-sm content-center">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="description"
              >
                Description
              </label>
            </div>

          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="startTime"
              >
                Start Time
              </label>
            </div>
            
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="endTime"
              >
                End Time
              </label>
            </div>
            
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-gray-700 hover:bg-gray-800 hover:shadow-outline hover:border-1 focus:outline-none  text-white font-bold py-2 px-4 rounded hover:border-green-300"
                type="button"
                onClick={handle_submit}
              >
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  if (props.value ===false) {
    return null;
  }
  const loading = (
    <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLES}>
        <div className="flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    (!loader && page) || (loader && loading),
    document.getElementById("portal")
  );
}
