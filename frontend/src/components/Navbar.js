import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="KEYFRAMES Logo" className="logo" />
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
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
