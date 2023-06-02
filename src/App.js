import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./components/LoginPage";
import Home from "./components/Home";
import MovieInfo from "./components/MovieInfo";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
