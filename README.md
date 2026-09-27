# Jogo da Memória

Trabalho prático de Programação Mobile (React Native + Expo + SQLite).

Desenvolvido por **Eduardo e Ronaldo**.

## Como executar

```bash
npm install --legacy-peer-deps
npx expo start
```

Abra no celular com o app **Expo Go** (leia o QR Code) ou aperte `a` para abrir no emulador Android.

## Funcionalidades

- **Cadastro de figuras**: imagem (galeria ou câmera, com recorte quadrado) + descrição, ambas obrigatórias; listagem e exclusão. Dados salvos em SQLite e imagens copiadas para o armazenamento do app.
- **Temas**: Animais e Marcas (figuras que já vêm no app) e Minhas figuras (cadastradas pelo usuário).
- **Dificuldades**: a partida sorteia as figuras do tema, duplica em pares e embaralha as cartas.

  | Nível   | Pares | Cartas | Grade | Pontos iniciais |
  | ------- | ----- | ------ | ----- | --------------- |
  | Fácil   | 4     | 8      | 2 × 4 | 600             |
  | Médio   | 6     | 12     | 3 × 4 | 1000            |
  | Difícil | 10    | 20     | 4 × 5 | 1800            |

- **Jogo**: tela própria, sem a barra de abas. Contador de erros, pares encontrados, barra de progresso e resultado final. Sair ou reiniciar no meio da partida pede confirmação.
- **Bônus**
  - Cronômetro em tempo real (começa na primeira jogada).
  - Animações de exibir, virar e esconder cartas e de acerto do par (React Native `Animated`).
  - Ranking com os 5 melhores resultados (jogador, pontuação, tema, dificuldade, data), salvo em SQLite.

Pontuação: pontos iniciais do nível − 25 por erro − 2 por segundo (mínimo 10). Empates são decididos pelo menor tempo.

## Estrutura

```
src/
  app/          Telas (Expo Router)
    (abas)/     Início, Figuras, Jogar (escolha de tema e nível) e Ranking
    partida.js  Tela do jogo, aberta por cima das abas
  components/   Componentes reutilizáveis (carta, botão, seletores, modais...)
  database/     SQLite: criação das tabelas, migrações e consultas
  hooks/        Lógica do jogo e cronômetro
  styles/       Estilos de cada tela/componente
  theme/        Cores, espaçamentos, fontes e sombras (design central)
  utils/        Dificuldades, embaralhamento, formatação e pontuação
```
