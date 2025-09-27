import '../styles/portfolio.css';

export default function Portfolio() {
  const projects = [
    process.env.PUBLIC_URL + '/images/portfolio1.jpg',
    process.env.PUBLIC_URL + '/images/portfolio2.jpg',
    process.env.PUBLIC_URL + '/images/portfolio3.jpg'
  ];

  return (
    <div className="portfolio-page">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {projects.map((img, index) => (
          <div className="portfolio-card" key={index}>
            <img src={img} alt={`Project ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
