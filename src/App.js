import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Home";



function App() {
  return (
    <div className="app">   
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;