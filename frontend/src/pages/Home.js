

import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedButton from '../components/AnimatedButton';
import '../styles/home.css';

export default function Home() {
  const handleExplore = () => {
    const section = document.getElementById('our-services');
    if (section) {
      window.scrollTo({ top: section.offsetTop - 50, behavior: 'smooth' });
    } else {
      // fallback: navigate to services page
      window.location.href = '/services';
    }
  };

  return (
    <div className="home-page">
      {/* Animated background behind content */}
      <AnimatedBackground />

      {/* Gradient overlay for readability */}
      <div className="home-overlay"></div>

      {/* Foreground content */}
      <div className="home-content">
        <h1>Welcome to KEYFRAMES Dashboard</h1>
        <p>Your ultimate digital marketing partner</p>
        <AnimatedButton onClick={handleExplore}>
          Explore Services
        </AnimatedButton>
      </div>

      {/* Services section for scrolling */}
      <section id="our-services" className="our-services-section">
        {/* Your services content goes here */}
      </section>
    </div>
  );
}

