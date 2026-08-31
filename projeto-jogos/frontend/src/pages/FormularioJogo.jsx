import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Aviso from '../components/Aviso';

const ESTADO_INICIAL = {
  titulo: '',
  genero: '',
  plataforma: '',
  anoLancamento: '',
  desenvolvedora: '',
  nota: '',
  descricao: ''
};

export default function FormularioJogo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  const [dados, setDados] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState([]);
  const [carregando, setCarregando] = useState(modoEdicao);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (modoEdicao) {
      api
        .get(`/jogos/${id}`)
        .then((resposta) => setDados(resposta.data))
        .catch(() => setErros(['Não foi possível carregar os dados do jogo.']))
        .finally(() => setCarregando(false));
    }
  }, [id, modoEdicao]);

  function atualizarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  async function enviarFormulario(e) {
    e.preventDefault();
    setErros([]);
    setSalvando(true);

    try {
      if (modoEdicao) {
        await api.put(`/jogos/${id}`, dados);
      } else {
        await api.post('/jogos', dados);
      }
      navigate('/');
    } catch (err) {
      const mensagensBackend = err.response?.data?.erros;
      setErros(
        mensagensBackend || ['Erro ao salvar o jogo. Verifique os dados e tente novamente.']
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p className="estado-info">Carregando dados do jogo...</p>;

  return (
    <section className="pagina-formulario">
      <span className="eyebrow">{modoEdicao ? 'Editar registro' : 'Novo registro'}</span>
      <h1>{modoEdicao ? 'Editar jogo' : 'Cadastrar jogo'}</h1>

      <Aviso tipo="erro" mensagens={erros} />

      <form onSubmit={enviarFormulario} className="formulario">
        <div className="campo">
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            type="text"
            value={dados.titulo}
            onChange={(e) => atualizarCampo('titulo', e.target.value)}
            placeholder="Ex: Hollow Knight"
          />
        </div>

        <div className="campo-linha">
          <div className="campo">
            <label htmlFor="genero">Gênero *</label>
            <input
              id="genero"
              type="text"
              value={dados.genero}
              onChange={(e) => atualizarCampo('genero', e.target.value)}
              placeholder="Ex: RPG, Ação, Aventura"
            />
          </div>
          <div className="campo">
            <label htmlFor="plataforma">Plataforma *</label>
            <input
              id="plataforma"
              type="text"
              value={dados.plataforma}
              onChange={(e) => atualizarCampo('plataforma', e.target.value)}
              placeholder="Ex: PC, PS5, Switch"
            />
          </div>
        </div>

        <div className="campo-linha">
          <div className="campo">
            <label htmlFor="anoLancamento">Ano de lançamento *</label>
            <input
              id="anoLancamento"
              type="number"
              value={dados.anoLancamento}
              onChange={(e) => atualizarCampo('anoLancamento', e.target.value)}
              placeholder="Ex: 2023"
            />
          </div>
          <div className="campo">
            <label htmlFor="nota">Nota (0 a 10)</label>
            <input
              id="nota"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={dados.nota || ''}
              onChange={(e) => atualizarCampo('nota', e.target.value)}
              placeholder="Ex: 9.5"
            />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="desenvolvedora">Desenvolvedora *</label>
          <input
            id="desenvolvedora"
            type="text"
            value={dados.desenvolvedora}
            onChange={(e) => atualizarCampo('desenvolvedora', e.target.value)}
            placeholder="Ex: FromSoftware"
          />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows={4}
            value={dados.descricao || ''}
            onChange={(e) => atualizarCampo('descricao', e.target.value)}
            placeholder="Uma breve descrição do jogo..."
          />
        </div>

        <div className="formulario__acoes">
          <button type="button" className="botao botao--texto" onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button type="submit" className="botao botao--primario" disabled={salvando}>
            {salvando ? 'Salvando...' : modoEdicao ? 'Salvar alterações' : 'Cadastrar jogo'}
          </button>
        </div>
      </form>
    </section>
  );
}
