import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api_routes.txt";
import Box from "./Box";
import Boxedit from './Boxedit'
export default function Dashboard() {
  const [loader, setLoader] = useState(false);
 
  const [cards, setCards] = useState([]);
  const [options, setOptions] = useState(false);
  const [preview,setPreview] = useState(false);
  const [view, setView] = useState();
  const auth = "Bearer " + sessionStorage.getItem("token");
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: auth,
    },
  };
  
  const OVERLAY_STYLES = {
    position: "relative",
    width: "300px",
    height: "50px",
    backgroundColor: "rgba(0,159,0,0.8)",
    borderRadius: "10px",
    zIndex: 5000,
  };
  async function getcards() {
    setLoader(true);


    let api_url = await fetch(api);
    let url = await api_url.text();
    var url_1 = new URL(url + "/document/");
   
    fetch(url_1, requestOptions)
      .then((res) => res.json())
      .then((res) => setCards(res.documents));
      console.log(cards);
  }
  async function downloadCard(title){
    const requestOptions_download = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: auth,
      },
    };
    
    let api_url = await fetch(api);
    let url = await api_url.text();
    var url_1 = new URL(url + "/document/download/" + title);
  
    console.log(url_1);
    fetch(url_1, requestOptions_download)
      .then( res => res.blob() )
      .then( blob => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file)});
  }
  async function deletecard(title){
    const requestOptions_delete = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: auth,
      },
      body: JSON.stringify({title:title}),
    };
   

    let api_url = await fetch(api);
    let url = await api_url.text();
    var url_1 = new URL(url + "/document/");
    
  
    fetch(url_1, requestOptions_delete)
      .then((res) => res.json()).then(getcards());

  }




  useEffect(() => {
    getcards();
  
  }, []);
  
  function do_something() {
    if(options){
      getcards();
    }
    setOptions(!options);

  }
  
  
  const page = (
    <div>
      <div className="p-8 place-content-center">
       
<form class="flex items-center max-w-sm mx-auto">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Document" required />
    </div>
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

    </div>
      <button
        onClick={do_something}
        className="bg-gray-400 hover:bg-gray-800 text-white text-xl font-semibold ml-4 py-2 px-4  border-gray-400  rounded-full shadow"
      >
        &#43;
      </button>
      <Box value={options} click={do_something} refresh={getcards}></Box>
      
     
      <div className="p-8 place-content-center max-w-half">
       
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center overflow-y-auto">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Description
                    </th>
                    
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => {
                    return (
                      <tr className="bg-white border-b  hover:bg-gray-400" key={card._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-black">
                          {card.title}
                        </td>
                        <td className="text-md text-black font-light px-6 py-4 whitespace-nowrap">
                          {card.content}
                        </td>
                       
                        <td className="text-md text-black font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={()=>downloadCard(card.title)}className="bg-white hover:bg-indigo-100 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 rounded shadow">
                            View
                          </button>
                          <button onClick={()=>deletecard(card.title)}className="bg-red-200 hover:bg-rose-400 text-gray-800 font-semibold ml-4 py-2 px-4 border border-gray-400 rounded shadow">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
  return page;
}
