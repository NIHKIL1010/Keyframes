
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/navbar.css';

export default function Navbar() {
  const location = useLocation();

  useEffect(() => {
    // Remove previous background classes
    document.body.className = '';

    // Map paths to background classes
    const bgMap = {
      '/dashboard': 'bg-home',
      '/dashboard/home': 'bg-home',
      '/dashboard/myaccount': 'bg-account',
      '/dashboard/services': 'bg-services',
      '/dashboard/notifications': 'bg-notifications',
      '/dashboard/portfolio': 'bg-portfolio',
      '/dashboard/pricing': 'bg-pricing',
      '/dashboard/contacts': 'bg-contacts',
    };

    // Find matching class (startsWith for subpaths)
    let applied = false;
    Object.keys(bgMap).forEach((path) => {
      if (location.pathname === path || location.pathname.startsWith(path)) {
        document.body.classList.add(bgMap[path]);
        applied = true;
      }
    });

    // Fallback if no match
    if (!applied) {
      document.body.classList.add('bg-home');
    }
  }, [location]);

  return (
    <nav className="navbar">
      <img
        src={process.env.PUBLIC_URL + '/images/logo.jpg'}
        alt="KEYFRAMES Logo"
        className="logo"
      />
      <ul>
        <li><Link to="/dashboard/home">Home</Link></li>
        <li><Link to="/dashboard/myaccount">My Account</Link></li>
        <li><Link to="/dashboard/services">Our Services</Link></li>
        <li><Link to="/dashboard/notifications">Notifications</Link></li>
        <li><Link to="/dashboard/portfolio">Portfolio</Link></li>
        <li><Link to="/dashboard/pricing">Pricing</Link></li>
        <li><Link to="/dashboard/contacts">Contacts</Link></li>
      </ul>
    </nav>
  );
}
