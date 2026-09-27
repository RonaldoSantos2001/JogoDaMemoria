export const LIMITE_RANKING = 5;

export async function listarMelhoresRecordes(db, limite = LIMITE_RANKING) {
  return db.getAllAsync(
    'SELECT * FROM recordes ORDER BY pontuacao DESC, tempo ASC, erros ASC LIMIT ?',
    limite
  );
}

export async function inserirRecorde(db, { jogador, pontuacao, erros, tempo, tema, dificuldade }) {
  if (!jogador?.trim()) throw new Error('Informe o nome do jogador.');

  await db.runAsync(
    'INSERT INTO recordes (jogador, pontuacao, erros, tempo, tema, dificuldade, data) VALUES (?, ?, ?, ?, ?, ?, ?)',
    jogador.trim(),
    pontuacao,
    erros,
    tempo,
    tema,
    dificuldade,
    new Date().toISOString()
  );
}

export async function limparRecordes(db) {
  await db.runAsync('DELETE FROM recordes');
}
