import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './page/main/Main';
import { LoginPage } from './page/auth/Login';
import { ErrorPage } from './page/error/ErrorPage';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/redux-store';
function App() {
  return <>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/*" element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>;
}

export default App;
