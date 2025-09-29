import '../styles/portfolio.css';

export default function Portfolio() {
  const projects = [
    { name: "Project One", link: "https://youtu.be/yG79TTcZIAs?si=t-IxJd8sLJfUCm-5" },
    { name: "Project Two", link: "https://drive.google.com/drive/folders/1DykCAU3a4mapCFDE8Xwc0Jcw8m6gngVy" },
    { name: "Project Three", link: "https://youtu.be/l9ZAU1w81rY?si=KfHdzCEUd2i5cxcZ" }
  ];

  return (
    <div className="portfolio-page">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <div className="portfolio-card" key={index}>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              {project.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
