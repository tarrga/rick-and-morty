import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import Character from './components/pages/Character';
import { RickMortyProvider } from './components/context/rickMorty/RickMortyContext';
import { AlertProvider } from './components/context/alert/AlertContext';
import Episode from './components/pages/Episode';

function App() {
  return (
    <RickMortyProvider>
      <AlertProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/character/:login' element={<Character />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='episode/:id' element={<Episode />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AlertProvider>
    </RickMortyProvider>
  );
}

export default App;
