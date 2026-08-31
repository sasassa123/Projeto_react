import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Aviso from '../components/Aviso';

export default function Listagem() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    buscarJogos(pagina);
  }, [pagina]);

  async function buscarJogos(paginaAtual) {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get(`/jogos?page=${paginaAtual}&limit=6`);
      setJogos(resposta.data.dados);
      setTotalPaginas(resposta.data.paginacao.totalPaginas || 1);
    } catch (err) {
      setErro(
        'Não foi possível carregar os jogos. Verifique se o backend está rodando em http://localhost:3001.'
      );
    } finally {
      setCarregando(false);
    }
  }

  async function excluirJogo(id, titulo) {
    if (!window.confirm(`Remover "${titulo}" do catálogo?`)) return;
    try {
      await api.delete(`/jogos/${id}`);
      buscarJogos(pagina);
    } catch (err) {
      setErro('Erro ao remover o jogo. Tente novamente.');
    }
  }

  return (
    <section className="pagina-listagem">
      <div className="pagina-listagem__topo">
        <div>
          <span className="eyebrow">Biblioteca pessoal</span>
          <h1>Catálogo de Jogos</h1>
        </div>
        <Link to="/novo" className="botao botao--primario">
          + Adicionar jogo
        </Link>
      </div>

      <Aviso tipo="erro" mensagens={erro} />

      {carregando && <p className="estado-info">Carregando jogos...</p>}

      {!carregando && jogos.length === 0 && !erro && (
        <div className="estado-vazio">
          <p>Nenhum jogo cadastrado ainda.</p>
          <Link to="/novo" className="botao botao--primario">
            Cadastrar o primeiro jogo
          </Link>
        </div>
      )}

      <div className="grade-jogos">
        {jogos.map((jogo) => (
          <article key={jogo.id} className="cartao-jogo">
            <div className="cartao-jogo__topo">
              <span className="cartao-jogo__plataforma">{jogo.plataforma}</span>
              {jogo.nota && (
                <span className="cartao-jogo__nota" title="Nota">
                  ★ {Number(jogo.nota).toFixed(1)}
                </span>
              )}
            </div>
            <h2 className="cartao-jogo__titulo">{jogo.titulo}</h2>
            <p className="cartao-jogo__meta">
              {jogo.genero} · {jogo.anoLancamento} · {jogo.desenvolvedora}
            </p>
            <div className="cartao-jogo__acoes">
              <Link to={`/jogos/${jogo.id}`} className="botao botao--secundario">
                Ver detalhes
              </Link>
              <Link to={`/editar/${jogo.id}`} className="botao botao--texto">
                Editar
              </Link>
              <button
                className="botao botao--perigo"
                onClick={() => excluirJogo(jogo.id, jogo.titulo)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button disabled={pagina <= 1} onClick={() => setPagina((p) => p - 1)}>
            ← Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button disabled={pagina >= totalPaginas} onClick={() => setPagina((p) => p + 1)}>
            Próxima →
          </button>
        </div>
      )}
    </section>
  );
}
