import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;