import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ImageDetection } from './pages/ImageDetection';
import { PestInformation } from './pages/PestInformation';
import { ExpertKnowledge } from './pages/ExpertKnowledge';
import { UserProfile } from './pages/UserProfile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProvider } from './contexts/UserContext';

function App() {
  const path = window.location.pathname;
  const isAuthPage = path === '/login' || path === '/register';

  // Wrap the entire app with UserProvider
  return (
    <UserProvider>
      {isAuthPage ? (
        path === '/login' ? <Login /> : <Register />
      ) : (
        <Layout>
          {path === '/detect' ? <ImageDetection /> :
           path === '/pests' ? <PestInformation /> :
           path === '/expert' ? <ExpertKnowledge /> :
           path === '/profile' ? <UserProfile /> :
           <Home />}
        </Layout>
      )}
    </UserProvider>
  );
}

export default App;