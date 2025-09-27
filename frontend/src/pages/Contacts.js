
import '../styles/contacts.css';

export default function Contacts() {
  return (
    <div className="contacts-page">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}