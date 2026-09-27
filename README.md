# Jogo da Memória

Trabalho prático de Programação Mobile (React Native + Expo + SQLite).

Desenvolvido por **Eduardo e Ronaldo**.

## Como executar

```bash
npm install --legacy-peer-deps
npx expo start
```

Abra no celular com o app **Expo Go** (leia o QR Code).

## Funcionalidades

- **Cadastro de figuras**: imagem (galeria ou câmera) + descrição, ambas obrigatórias; listagem e exclusão. Dados salvos em SQLite e imagens copiadas para o armazenamento do app.
- **Jogo**: sorteia 6 figuras, duplica em 6 pares e embaralha em 12 cartas. Contador de erros, pares encontrados e resultado final.
- **Bônus**
  - Cronômetro em tempo real (começa na primeira jogada).
  - Animações de virar, exibir e esconder cartas (React Native `Animated`).
  - Ranking com os 5 melhores resultados (jogador, pontuação, data), salvo em SQLite.

Pontuação: 1000 − 25 por erro − 2 por segundo (mínimo 10).

## Estrutura

```
src/
  app/          Telas (Expo Router): início, figuras, jogo, ranking
  components/   Componentes reutilizáveis (carta, botão, modais...)
  database/     SQLite: criação das tabelas e consultas
  hooks/        Lógica do jogo e cronômetro
  styles/       Estilos de cada tela/componente
  theme/        Cores, espaçamentos, fontes e sombras (design central)
  utils/        Embaralhamento, formatação e pontuação
```
