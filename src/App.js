import { BrowserRouter as Router,  Route , Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home.component";
import Signup from "./components/signup/signup.component";

function App() {
  return (
    <div className="whole p-10 text-white text-center min-h-screen bg-slate-900">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
           <Route path="*" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
