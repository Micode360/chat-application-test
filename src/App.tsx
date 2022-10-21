import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Darshboard from "./components/darshboard";


function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Darshboard />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
