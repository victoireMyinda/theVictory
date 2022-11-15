import React from "react";
import "./style.css";

const SideBarRow = ({ Icon, title }) => {


  // style={({ isActive }) => (isActive ? activeStyle : undefined)}

  return (
    <div className="sidebarrow">
      <Icon className='sidebarrow__icon' />
      <h2 className='sidebarrow__title'>{title}</h2>
    </div>
  )
}

export default SideBarRow;
