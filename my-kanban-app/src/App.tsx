// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Container, Box } from '@mui/material';
import { BoardProvider } from './context/BoardContext'; // Import BoardProvider
import { SERVER_URL } from './env'
import { CustomThemeProvider } from './context/ThemeContext';


function App() {
  return (
   <CustomThemeProvider>
    <Router>
      <BoardProvider> {}
        <Navbar />
        <Container component="main" maxWidth="lg" sx={{ mt: 2 }}>
          <Box sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Box>
        </Container>
        <Footer />
      </BoardProvider>
    </Router>
    </CustomThemeProvider>
  
  );
}

export default App;
