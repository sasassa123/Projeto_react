const db = require('../db');


function validarJogo(dados) {
  const erros = [];

  if (!dados.titulo || dados.titulo.trim().length < 2) {
    erros.push('O título deve ter pelo menos 2 caracteres.');
  }
  if (!dados.genero || dados.genero.trim().length === 0) {
    erros.push('O gênero é obrigatório.');
  }
  if (!dados.plataforma || dados.plataforma.trim().length === 0) {
    erros.push('A plataforma é obrigatória.');
  }
  const ano = Number(dados.anoLancamento);
  if (!ano || ano < 1970 || ano > 2100) {
    erros.push('O ano de lançamento deve ser um número válido (ex: 2023).');
  }
  if (!dados.desenvolvedora || dados.desenvolvedora.trim().length === 0) {
    erros.push('A desenvolvedora é obrigatória.');
  }
  if (dados.nota !== undefined && dados.nota !== null && dados.nota !== '') {
    const nota = Number(dados.nota);
    if (isNaN(nota) || nota < 0 || nota > 10) {
      erros.push('A nota deve ser um número entre 0 e 10.');
    }
  }

  return erros;
}


exports.listarJogos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [jogos] = await db.query(
      'SELECT * FROM jogos ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [totalRows] = await db.query('SELECT COUNT(*) as total FROM jogos');
    const total = totalRows[0].total;

    res.json({
      dados: jogos,
      paginacao: {
        paginaAtual: page,
        totalPaginas: Math.ceil(total / limit),
        totalItens: total
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar jogos.', erro: erro.message });
  }
};


exports.buscarJogoPorId = async (req, res) => {
  try {
    const [linhas] = await db.query('SELECT * FROM jogos WHERE id = ?', [req.params.id]);
    if (linhas.length === 0) {
      return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
    }
    res.json(linhas[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao buscar jogo.', erro: erro.message });
  }
};


exports.criarJogo = async (req, res) => {
  const erros = validarJogo(req.body);
  if (erros.length > 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
  }

  const { titulo, genero, plataforma, anoLancamento, desenvolvedora, nota, descricao } = req.body;

  try {
    const [resultado] = await db.query(
      `INSERT INTO jogos (titulo, genero, plataforma, anoLancamento, desenvolvedora, nota, descricao)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, genero, plataforma, anoLancamento, desenvolvedora, nota || null, descricao || '']
    );
    res.status(201).json({ id: resultado.insertId, mensagem: 'Jogo criado com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao criar jogo.', erro: erro.message });
  }
};


exports.atualizarJogo = async (req, res) => {
  const erros = validarJogo(req.body);
  if (erros.length > 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
  }

  const { titulo, genero, plataforma, anoLancamento, desenvolvedora, nota, descricao } = req.body;

  try {
    const [resultado] = await db.query(
      `UPDATE jogos SET titulo = ?, genero = ?, plataforma = ?, anoLancamento = ?,
       desenvolvedora = ?, nota = ?, descricao = ? WHERE id = ?`,
      [titulo, genero, plataforma, anoLancamento, desenvolvedora, nota || null, descricao || '', req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
    }
    res.json({ mensagem: 'Jogo atualizado com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao atualizar jogo.', erro: erro.message });
  }
};

exports.deletarJogo = async (req, res) => {
  try {
    const [resultado] = await db.query('DELETE FROM jogos WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Jogo não encontrado.' });
    }
    res.json({ mensagem: 'Jogo removido com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao remover jogo.', erro: erro.message });
  }
};
