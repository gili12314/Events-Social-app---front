// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import EventDetailPage from "./pages/EventDetailPage";
import Navbar from "./components/Navbar";
import NotificationsPage from "./pages/NotificationsPage";
import GoogleCallbackPage from "./pages/GoogleCallbackPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/google-callback" element={<GoogleCallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
