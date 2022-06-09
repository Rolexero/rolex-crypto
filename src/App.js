import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';

function App() {
  return (
    <div className="bg-brightRed">
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
