import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Movies from "./component/Movies";
import Watchlist from "./component/Watchlist";
import History from "./component/History";
import Banner from "./component/Banner";
import LoginPage from "./component/LoginPage";
import CreateAccountPage from "./component/CreateAccountPage";
import MovieDetailPage from "./component/MovieDetailPage";
import Support from "./component/Support";
import AdminDashboard from "./component/AdminDashboard";
import { FeedbackProvider } from "./component/FeedbackContext"; // Added import

function App() {
  const [watchlist, setWatchlist] = useState([]);
  // Initialize login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("movieApp");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieApp", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddWatchlist = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      setWatchlist((prev) => [...prev, movieObj]);
    }
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const updatedWatchlist = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    setWatchlist(updatedWatchlist);

    let deletedHistory =
      JSON.parse(localStorage.getItem("deletedHistory")) || [];
    if (!deletedHistory.some((movie) => movie.id === movieObj.id)) {
      deletedHistory.push(movieObj);
      localStorage.setItem("deletedHistory", JSON.stringify(deletedHistory));
    }
  };

  // Persist login state in localStorage on login
  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  // Remove login state from localStorage on logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
  };

  return (
    <FeedbackProvider>
      <Router>
        {isLoggedIn ? (
          <AuthenticatedApp
            watchlist={watchlist}
            handleAddWatchlist={handleAddWatchlist}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onLogout={handleLogout}
            userEmail={userEmail}
          />
        ) : (
          <UnauthenticatedApp onLogin={handleLogin} />
        )}
      </Router>
    </FeedbackProvider>
  );
}

function AuthenticatedApp({
  watchlist,
  handleAddWatchlist,
  handleRemoveFromWatchList,
  searchQuery,
  setSearchQuery,
  onLogout,
  userEmail,
}) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admindashboard";

  return (
    <>
      {!hideNavbar && (
        <Navbar
          setSearchQuery={setSearchQuery}
          onLogout={onLogout}
          userEmail={userEmail}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                handleAddWatchlist={handleAddWatchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist}
                searchQuery={searchQuery}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          }
        />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/support" element={<Support />} />
        {/* Redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function UnauthenticatedApp({ onLogin }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      {/* Redirect all unknown routes to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
