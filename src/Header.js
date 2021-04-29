import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


  
  const Header = () => {
    return (
      <div style={{}}>
          <div style={{textAlign:"center", paddingTop:"0.5rem", fontSize:25, backgroundColor:"#24292e", color:"#FFFFFF" }}>
              Webversion KaKao
          </div>
          {/* <div style={{display:"flex",paddingTop:"1rem", marginLeft:"1rem"}}>
            <div style={{width:"25%", height:"40rem"}}>
            Chat List
            <div style={{ minHeight:"40rem",border:"1px solid #000000", marginRight:"2rem"}}>
            </div>
            </div>
            <div style={{width:"25%", height:"40rem"}}>
            Chat Room
            <div style={{ minHeight:"40rem",border:"1px solid #000000", marginRight:"2rem"}}>
            </div>
            </div>
           
          </div> */}
      </div>
    );
  };
  
  export default Header;