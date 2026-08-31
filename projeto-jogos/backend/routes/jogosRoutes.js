const express = require('express');
const router = express.Router();
const jogosController = require('../controllers/jogosController');

router.get('/', jogosController.listarJogos);
router.get('/:id', jogosController.buscarJogoPorId);
router.post('/', jogosController.criarJogo);
router.put('/:id', jogosController.atualizarJogo);
router.delete('/:id', jogosController.deletarJogo);

module.exports = router;
