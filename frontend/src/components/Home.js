import React from "react";

export default function Home() {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
   
    padding: "50px",
    
  };
  return (
    <div className="home">
      <div style={MODAL_STYLES} className="box-border rounded-3xl p-4 text-white text-xl border-2 bg-slate-700 ">
      <p>This webapp is made for Taskphin as WYSWYG editor.
      </p>

      </div>
    </div>
  );
}
