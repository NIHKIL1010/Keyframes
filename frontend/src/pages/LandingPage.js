import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import AnimatedBackground from '../components/AnimatedBackground';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <AnimatedBackground /> {/* optional animation layer */}
      <div className="container">
        <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="KEYFRAMES Logo" className="logo" />
        <h1>KEYFRAMES</h1>
        <p>Your ultimate digital marketing partner</p>
        <div className="buttons">
          <button onClick={() => navigate('/')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}


import '../styles/LandingPage.css'; // new CSS just for landing page
import AnimatedBackground from '../components/AnimatedBackground';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <AnimatedBackground />
      <div className="container">
        <img
          src="/images/logo.jpg" // logo in public/images
          alt="KEYFRAMES Logo"
          className="logo"
        />
        <h1>KEYFRAMES</h1>
        <p>Your ultimate digital marketing partner</p>
        <div className="buttons">
          <button onClick={() => navigate('/')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}
