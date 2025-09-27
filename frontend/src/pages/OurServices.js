import '../styles/services.css';

export default function OurServices() {
  return (
    <div className="services-page">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <img src={process.env.PUBLIC_URL + '/images/service1.png'} alt="SEO"/>
          <h3>SEO Optimization</h3>
        </div>
        <div className="service-card">
          <img src={process.env.PUBLIC_URL + '/images/service2.png'} alt="Social Media"/>
          <h3>Social Media Marketing</h3>
        </div>
        <div className="service-card">
          <img src={process.env.PUBLIC_URL + '/images/service3.png'} alt="Analytics"/>
          <h3>Analytics & Reports</h3>
        </div>
        <div className="service-card">
          <img src={process.env.PUBLIC_URL + '/images/service4.jpg'} alt="Creative"/>
          <h3>Creative Campaigns</h3>
        </div>
        <div className="service-card">
          <img src={process.env.PUBLIC_URL + '/images/service5.jpg'} alt="PPC"/>
          <h3>PPC Advertising</h3>
        </div>
      </div>
    </div>
  );
}


