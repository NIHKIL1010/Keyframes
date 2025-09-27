import '../styles/notifications.css';
export default function Notifications() {
  const notifications = [
    { id: 1, message: "New marketing campaign launched!" },
    { id: 2, message: "Your portfolio has been approved." },
    { id: 3, message: "Reminder: Meeting at 3 PM." }
  ];

  return (
    <div className="page-content">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((note) => (
          <li key={note.id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
}
