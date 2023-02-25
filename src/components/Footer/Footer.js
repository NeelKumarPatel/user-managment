import React from "react";


const date = new Date();
const year = date.getFullYear();

const Footer = () => {
    return (
        <div style={{ textAlign:"center",background:"black", color:"white", height:"32px", justifyContent: "center" }}>
            &copy; {year} All rights reserved
        </div>
    )
}

export default Footer;