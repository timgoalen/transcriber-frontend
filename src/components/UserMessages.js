export default function UserMessages({ messages }) {
  return (
    <div className="user-message-container">
      <p className="user-message-content">{messages}</p>
    </div>
  );
}
