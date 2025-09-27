
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

