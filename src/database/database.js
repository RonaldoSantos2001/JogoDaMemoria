import { FIGURAS_PADRAO } from './figurasPadrao';

export const DATABASE_NAME = 'jogodamemoria.db';

// Executado uma vez ao abrir o banco (via SQLiteProvider): cria as tabelas
// e aplica as migrações (coluna de tema, figuras padrão).
export async function initDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS figuras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imagem TEXT NOT NULL,
      descricao TEXT NOT NULL,
      criado_em TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS recordes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jogador TEXT NOT NULL,
      pontuacao INTEGER NOT NULL,
      erros INTEGER NOT NULL,
      tempo INTEGER NOT NULL,
      data TEXT NOT NULL
    );
  `);

  // user_version guarda quais migrações já rodaram. Assim as figuras padrão
  // são inseridas uma única vez e não voltam depois que o usuário exclui alguma.
  const { user_version: versao } = await db.getFirstAsync('PRAGMA user_version');

  if (versao < 1) {
    await db.withTransactionAsync(async () => {
      for (const [chave, figura] of figurasDoTema('animais')) {
        await db.runAsync(
          'INSERT INTO figuras (imagem, descricao, criado_em) VALUES (?, ?, ?)',
          chave,
          figura.descricao,
          new Date().toISOString()
        );
      }
    });
    await db.execAsync('PRAGMA user_version = 1');
  }

  if (versao < 2) {
    // Temas: figuras antigas cadastradas pelo usuário vão para "Minhas figuras"
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        ALTER TABLE figuras ADD COLUMN tema TEXT NOT NULL DEFAULT 'personalizado';
        UPDATE figuras SET tema = 'animais' WHERE imagem LIKE 'padrao:%';
        ALTER TABLE recordes ADD COLUMN tema TEXT;
      `);
      for (const [chave, figura] of figurasDoTema('marcas')) {
        await db.runAsync(
          'INSERT INTO figuras (imagem, descricao, tema, criado_em) VALUES (?, ?, ?, ?)',
          chave,
          figura.descricao,
          figura.tema,
          new Date().toISOString()
        );
      }
    });
    await db.execAsync('PRAGMA user_version = 2');
  }

  if (versao < 3) {
    // Dificuldades: recordes antigos foram jogados no nível médio (12 cartas)
    await db.execAsync(`
      ALTER TABLE recordes ADD COLUMN dificuldade TEXT NOT NULL DEFAULT 'medio';
      PRAGMA user_version = 3;
    `);
  }
}

function figurasDoTema(tema) {
  return Object.entries(FIGURAS_PADRAO).filter(([, figura]) => figura.tema === tema);
}
