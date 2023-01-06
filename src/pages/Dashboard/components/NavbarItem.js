import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarItem = ({ icon, link, screenSize, headings, handleClick }) => {
  // {...(condition ? { onClick: () => {handleClick()}} : {})}
  const component = (
    <li
      onClick={handleClick !== null ? handleClick : undefined}
      className="Navbar__item"
      style={{ marginBottom: screenSize !== 'small' ? '2rem' : null }}
    >
      {icon}
      {screenSize === 'large' && <h2>{headings}</h2>}
    </li>
  );

  if (link !== null) return <NavLink to={link}>{component}</NavLink>;

  return component;
};

export default NavbarItem;
