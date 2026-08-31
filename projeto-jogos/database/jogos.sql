

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS crud_jogos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE crud_jogos;

CREATE TABLE IF NOT EXISTS jogos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  genero VARCHAR(80) NOT NULL,
  plataforma VARCHAR(80) NOT NULL,
  anoLancamento INT NOT NULL,
  desenvolvedora VARCHAR(120) NOT NULL,
  nota DECIMAL(3,1) DEFAULT NULL,
  descricao TEXT,
  criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jogos (titulo, genero, plataforma, anoLancamento, desenvolvedora, nota, descricao) VALUES
('The Legend of Zelda: Breath of the Wild', 'Aventura', 'Switch', 2017, 'Nintendo', 9.7, 'Um jogo de mundo aberto onde Link explora o reino de Hyrule livremente, resolvendo puzzles e enfrentando desafios.'),
('God of War Ragnarok', 'Ação', 'PS5', 2022, 'Santa Monica Studio', 9.5, 'Kratos e Atreus enfrentam o Ragnarok em uma jornada épica pelos nove reinos nórdicos.'),
('Elden Ring', 'RPG', 'PC', 2022, 'FromSoftware', 9.6, 'Um RPG de ação em mundo aberto ambientado nas Terras Intermédias, criado em parceria com George R. R. Martin.'),
('Hollow Knight', 'Metroidvania', 'PC', 2017, 'Team Cherry', 9.0, 'Explore um vasto reino subterrâneo em ruínas cheio de inimigos e segredos ancestrais.'),
('Stardew Valley', 'Simulação', 'PC', 2016, 'ConcernedApe', 9.2, 'Herde a fazenda do seu avô e construa uma nova vida no campo, cultivando, pescando e fazendo amizades.');
