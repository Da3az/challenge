import React from "react";
import LogoSvg from '../logo.svg'

const Nav = () => (
    <div className="p-6 flex flex items-center justify-center">
        <img className="p-4" src={LogoSvg} alt="logo" width={250}/>
        <h1 className="font-bold">Technical Challenge</h1>
    </div>
)

export default Nav