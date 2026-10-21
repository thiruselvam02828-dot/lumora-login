import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("lumora_user") || "null");

  if (!user) return <Navigate to="/" replace />;

  const logout = () => {
    localStorage.removeItem("lumora_user");
    navigate("/");
  };

  return (
    <div className="page">
      <div className="card dashboard">
        <div className="logo">
          <span className="logo-mark">L</span>
          <span className="logo-text">Lumora</span>
        </div>
        <h1>Hello, {user.name} 👋</h1>
        <p className="subtitle">You are logged in as {user.email}</p>
        <p className="subtitle">This is a dummy dashboard page.</p>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
