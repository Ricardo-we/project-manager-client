import './css/assets.css';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { NavBar } from './components/NavBar';
import { ProjectDetailView } from './views/ProjectDetailView';

export const AppContext = createContext(null);

function App() {
  const [userDataInStorage, setUserDataInStorage] = useLocalStorage('user', '');

  return (
    <AppContext.Provider value={{userDataInStorage, setUserDataInStorage}}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login/>}/>
          <Route path='/home' element={<><NavBar/><Home/></>}/>
          <Route path='/project/:projectId' element={<><NavBar/><ProjectDetailView/></>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
