import React from "react";
import  {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function Navbar(props) {
  const navigate = useNavigate();
function handleLogout(){
  sessionStorage.removeItem('token');
  props.setValidity(false);
  navigate('/');

}

  return (
    <div className="flex place-content-around bg-gradient-to-r bg-gray-800 p-1">
      <span className="my-2 bg-white border-2 border-indigo-300 rounded-lg p-2 ">
        <span className="text-blue-700 text-lg">Taskphin</span>
      </span>
      <ul className=" flex place-content-center">
        <li className="mr-6 mx-4 my-3">
          <Link to='/' className="text-blue-500 hover:text-blue-800 text-lg">
            Home
          </Link>
        </li>
        <li className="mr-6 my-3 mx-4">
          <Link to="/about" className="text-blue-500 hover:text-blue-800 text-lg">
            About
          </Link>
        </li>
        <li className="mr-6 my-3 mx-4">
        <Link onClick={()=>window.open("https://github.com/palash018?tab=repositories","_blank")} className="text-blue-500 hover:text-blue-800 text-lg">
            Link
          </Link>
        </li>
        <li className="mr-6 my-3 mx-4">
          {
          (!props.validity&&(<button className="text-gray-400 cursor-not-allowed text-lg">
            Disable
          </button>))||(props.validity&&(<Link to="/dashboard" className="text-blue-500 hover:text-blue-800 text-lg">
            Dashboard
          </Link>))
          }
        </li>
      </ul>
      {props.validity&&(<ul className=" flex place-content-center">
       
        <li className="mr-6 mx-4 my-2">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold my-2 py-1 px-3 rounded" onClick={handleLogout}>

            Logout
          </button>
        </li>
        
      </ul>)}
      {!props.validity&&(<ul className=" flex place-content-center">
       
        <li className="mr-6 mx-4 my-2">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold my-2 py-1 px-3 rounded" onClick={props.login}>
            Login
          </button>
        </li>
        <li className="mr-6 mx-4 my-2">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold my-2 py-1 px-3 rounded" onClick={props.signup}>
            Signup
          </button>
        </li>
      </ul>)}
    </div>
  );
}
