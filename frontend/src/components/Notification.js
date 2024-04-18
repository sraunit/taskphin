import React from 'react'

export default function Notification(props) {
    const OVERLAY_STYLES_SUCESS = {
    position: "fixed",
    top: '10px',
    right:'10px',
    width:'300px',
    height:'50px',
    backgroundColor: "rgba(0,159,0,0.8)",
    borderRadius:'10px',
    zIndex: 1000,
  };
  const OVERLAY_STYLES_FAILURE={
    position: "fixed",
    top: '10px',
    right:'10px',
    width:'300px',
    height:'50px',
    backgroundColor: "rgba(250,38,59,0.8)",
    borderRadius:'10px',
    zIndex: 1000,
  }
  
  return (
    <div style={props.type?OVERLAY_STYLES_SUCESS:OVERLAY_STYLES_FAILURE}>
      <div className="flex place-content-center text-xl text-white">
         
            {props.message}
          
        </div>
    </div>
  )
}
