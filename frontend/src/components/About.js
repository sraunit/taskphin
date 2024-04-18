import React from 'react'
export default function About() {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
   
    padding: "50px",
    
  };
  return (
    <div className="about" style={MODAL_STYLES}>
      <h1 className='text-5xl underline'>Connect with me</h1>
      <button className="text-5xl opacity-95 hover:text-white p-8" onClick={() => window.location = 'mailto:paltiw018@gmail.com'} ><i className='fa fa-google' style={{fontSize:'48px'}}></i></button>
      <button className="text-5xl opacity-95 hover:text-white p-8"  onClick={()=>  window.open('https://www.linkedin.com/in/palash-tiwari-048349202/', "_blank")}><i className='fa fa-linkedin' style={{fontSize:'48px'}}></i></button>
      <button className="text-5xl opacity-95 hover:text-white p-8"  onClick={()=>  window.open('https://github.com/palash018', "_blank")}><i className='fa fa-github' style={{fontSize:'48px'}}></i></button>

    </div>
  )
}
