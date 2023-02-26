import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './page/main/Main';
import { LoginPage } from './page/auth/Login';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;
