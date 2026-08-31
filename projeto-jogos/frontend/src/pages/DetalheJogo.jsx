import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Aviso from '../components/Aviso';

export default function DetalheJogo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogo, setJogo] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get(`/jogos/${id}`)
      .then((resposta) => setJogo(resposta.data))
      .catch(() => setErro('Jogo não encontrado, ou o backend não está rodando.'))
      .finally(() => setCarregando(false));
  }, [id]);

  async function excluirJogo() {
    if (!window.confirm(`Remover "${jogo.titulo}" do catálogo?`)) return;
    try {
      await api.delete(`/jogos/${id}`);
      navigate('/');
    } catch {
      setErro('Erro ao remover o jogo.');
    }
  }

  if (carregando) return <p className="estado-info">Carregando...</p>;

  if (erro) {
    return (
      <section className="pagina-detalhe">
        <Aviso tipo="erro" mensagens={erro} />
        <Link to="/" className="botao botao--secundario">
          ← Voltar ao catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="pagina-detalhe">
      <Link to="/" className="link-voltar">
        ← Voltar ao catálogo
      </Link>

      <div className="detalhe-jogo">
        <div className="detalhe-jogo__cabecalho">
          <div>
            <span className="eyebrow">{jogo.plataforma}</span>
            <h1>{jogo.titulo}</h1>
          </div>
          {jogo.nota && (
            <div className="detalhe-jogo__nota">
              <span>★ {Number(jogo.nota).toFixed(1)}</span>
              <small>nota</small>
            </div>
          )}
        </div>

        <div className="detalhe-jogo__grade">
          <div>
            <span className="detalhe-jogo__label">Gênero</span>
            <p>{jogo.genero}</p>
          </div>
          <div>
            <span className="detalhe-jogo__label">Ano de lançamento</span>
            <p>{jogo.anoLancamento}</p>
          </div>
          <div>
            <span className="detalhe-jogo__label">Desenvolvedora</span>
            <p>{jogo.desenvolvedora}</p>
          </div>
        </div>

        {jogo.descricao && (
          <div className="detalhe-jogo__descricao">
            <span className="detalhe-jogo__label">Descrição</span>
            <p>{jogo.descricao}</p>
          </div>
        )}

        <div className="detalhe-jogo__acoes">
          <Link to={`/editar/${jogo.id}`} className="botao botao--primario">
            Editar jogo
          </Link>
          <button className="botao botao--perigo" onClick={excluirJogo}>
            Excluir jogo
          </button>
        </div>
      </div>
    </section>
  );
}
