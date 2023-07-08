import { Logo } from './Logo';
import PropTypes from 'prop-types';

NavBar.propTypes = {
  children : PropTypes.node,
}

export function NavBar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
}


