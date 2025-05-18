import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import PokemonDetails from './pages/Details/PokemonDetails';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;