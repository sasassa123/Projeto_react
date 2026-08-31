import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Listagem from './pages/Listagem';
import FormularioJogo from './pages/FormularioJogo';
import DetalheJogo from './pages/DetalheJogo';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-conteudo">
        <Routes>
          <Route path="/" element={<Listagem />} />
          <Route path="/novo" element={<FormularioJogo />} />
          <Route path="/editar/:id" element={<FormularioJogo />} />
          <Route path="/jogos/:id" element={<DetalheJogo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
