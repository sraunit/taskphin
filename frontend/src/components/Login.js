import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import api from "../api_routes.txt";
import Notification from "./Notification";
import {useNavigate } from "react-router-dom";;
export default function Login(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
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
  const [creds, setcreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [notify, setNotification] = useState({ type: "", message: "" });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  };
  function updateusername(e) {
    setcreds({ ...creds, username: e.target.value });
   
  }

  function updatepassword(e) {
    setcreds({ ...creds, password: e.target.value });

  }

  const cleanup = useCallback(() => {
    setLoader(false);
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 7500);
  }, []);
  function executelogin(res) {
    if (res.token) {
      sessionStorage.setItem("token", res.token);
      props.setValidity(true);
      navigate("/dashboard");
      props.click();
    }
    setNotification({
      type: res.sucess,
      message: res.message ? res.message : "Login successful",
    });
    
  }
  async function sendlogin() {
    setLoader(true);
    let api_url = await fetch(api);
    let url = await api_url.text();

  
    fetch(url + "/auth/login", requestOptions)
      .then((res) => res.json())
      .then((res) => executelogin(res));
  }
  useEffect(() => {
    if (loader) {
      cleanup();
    }
  }, [notify]);
  if (!props.open) {
    return null;
  }
  const page = (
    <div style={OVERLAY_STYLES}>
      {notify.message.length && (
        <Notification
          type={notify.type}
          message={notify.message}
        ></Notification>
      )}
      <div style={MODAL_STYLES}>
        <div className="flex place-content-center">
          <div className="bg-grey-lighter pos-10 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-gradient-to-r from-slate-200 via-gray-400 to-slate-200 px-9 py-12 rounded shadow-md text-black w-full ">
                <button
                  className="bg-slate-700 hover:bg-slate-900 text-white font-bold my-2 py-1 px-3 rounded"
                  onClick={props.click}
                >
                  ❌
                </button>
                <h1 className="mb-8 text-3xl text-center">Login</h1>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded"
                  name="username"
                  onChange={updateusername}
                  placeholder="Username"
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 mt-12 rounded mb-4"
                  name="password"
                  onChange={updatepassword}
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-slate-700 text-white hover:bg-slate-900 focus:outline-none my-1"
                  onClick={sendlogin}
                >
                  Login
                </button>
              </div>

              <div className="text-grey-dark mt-6">
                Don't have an account?
                <button
                  type="submit"
                  className="text-center py-3 rounded bg-slate- text-black hover:bg-slate- focus:outline-none my-1"
                  onClick={props.click1}
                >
                  Signup
                </button>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
