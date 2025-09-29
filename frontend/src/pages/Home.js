/*
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedButton from '../components/AnimatedButton';
import '../styles/global.css';


export default function Home() {
  return (
    <div className="dashboard-home">
      <AnimatedBackground />
      <div style={{
        textAlign: 'center',
        color: 'white',
        paddingTop: '100px',
        zIndex: 1,
        position: 'relative'
      }}>
        <h1>Welcome to KEYFRAMES Dashboard</h1>
        <p>Your ultimate digital marketing partner</p>
        <AnimatedButton onClick={() => alert('Explore services!')}>Explore Services</AnimatedButton>
      </div>
    </div>
  );
}

*/
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedButton from '../components/AnimatedButton';
import '../styles/home.css';

export default function Home() {
  const handleExplore = () => {
    const section = document.getElementById('our-services');
    if (section) {
      window.scrollTo({ top: section.offsetTop - 50, behavior: 'smooth' });
    } else {
      // optional: navigate to services page
      window.location.href = '/services';
    }
  };

  return (
    <div className="home-page">
      {/* Animated background behind content */}
      <AnimatedBackground />

      {/* Overlay for readability */}
      <div className="home-overlay"></div>

      {/* Foreground content */}
      <div className="home-content">
        <h1>Welcome to KEYFRAMES Dashboard</h1>
        <p>Your ultimate digital marketing partner</p>
        <AnimatedButton onClick={handleExplore}>
          Explore Services
        </AnimatedButton>
      </div>
    </div>
  );
}
