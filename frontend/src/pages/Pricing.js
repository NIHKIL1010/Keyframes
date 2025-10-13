

import '../styles/pricing.css';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();
  const plans = [
    { name: "Basic", price: "₹49/month", features: ["SEO", "Email Marketing"] },
    { name: "Pro", price: "₹99/month", features: ["SEO", "Email Marketing", "Social Media"] },
    { name: "Enterprise", price: "₹199/month", features: ["All Features", "Dedicated Manager"] },
  ];

  const handleSelectPlan = (planName) => {
    navigate("/payment-form", { state: { planName } });
  };

  return (
    <div className="pricing-page">
      <h2>Pricing Plans</h2>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button onClick={() => handleSelectPlan(plan.name)}>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
