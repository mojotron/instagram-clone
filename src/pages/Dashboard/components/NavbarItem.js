import React from 'react';
import { Link } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

const NavbarItem = ({ icon, link, headings, handleClick }) => {
  // {...(condition ? { onClick: () => {handleClick()}} : {})}
  const { screenSize, fixedSize } = useScreenSizeContext();

  const component = (
    <li
      onClick={handleClick !== null ? handleClick : undefined}
      className="Navbar__item"
      style={{ marginBottom: screenSize !== 'small' ? '2rem' : null }}
    >
      {icon}
      {screenSize === 'large' && !fixedSize && <h2>{headings}</h2>}
    </li>
  );

  if (link !== null) return <Link to={link}>{component}</Link>;

  return component;
};

export default NavbarItem;
