import { Directory, File, Paths } from 'expo-file-system';

import { ehFiguraPadrao } from './figurasPadrao';

const PASTA_IMAGENS = 'figuras';

// Copia a imagem escolhida (que fica no cache e pode ser apagada pelo sistema)
// para a pasta permanente do app.
function salvarImagemLocal(uriOrigem) {
  try {
    const pasta = new Directory(Paths.document, PASTA_IMAGENS);
    if (!pasta.exists) pasta.create();

    const extensao = uriOrigem.split('.').pop()?.split('?')[0] || 'jpg';
    const destino = new File(pasta, `figura_${Date.now()}.${extensao}`);
    new File(uriOrigem).copy(destino);
    return destino.uri;
  } catch (erro) {
    console.warn('Não foi possível copiar a imagem, usando o caminho original.', erro);
    return uriOrigem;
  }
}

function apagarImagemLocal(uri) {
  try {
    const arquivo = new File(uri);
    if (arquivo.exists) arquivo.delete();
  } catch (erro) {
    console.warn('Não foi possível apagar a imagem.', erro);
  }
}

export async function listarFiguras(db, tema) {
  return db.getAllAsync('SELECT * FROM figuras WHERE tema = ? ORDER BY id DESC', tema);
}

// Quantidade de figuras em cada tema, ex.: { animais: 12, marcas: 14 }
export async function contarFigurasPorTema(db) {
  const linhas = await db.getAllAsync('SELECT tema, COUNT(*) AS total FROM figuras GROUP BY tema');
  return Object.fromEntries(linhas.map((linha) => [linha.tema, linha.total]));
}

export async function contarFiguras(db) {
  const linha = await db.getFirstAsync('SELECT COUNT(*) AS total FROM figuras');
  return linha?.total ?? 0;
}

export async function inserirFigura(db, { imagem, descricao, tema }) {
  if (!imagem) throw new Error('Selecione uma imagem para a figura.');
  if (!descricao?.trim()) throw new Error('Informe uma descrição para a figura.');

  const uriSalva = salvarImagemLocal(imagem);
  const resultado = await db.runAsync(
    'INSERT INTO figuras (imagem, descricao, tema, criado_em) VALUES (?, ?, ?, ?)',
    uriSalva,
    descricao.trim(),
    tema,
    new Date().toISOString()
  );
  return resultado.lastInsertRowId;
}

export async function excluirFigura(db, figura) {
  await db.runAsync('DELETE FROM figuras WHERE id = ?', figura.id);
  // Figuras padrão vêm empacotadas no app: não há arquivo para apagar.
  if (!ehFiguraPadrao(figura.imagem)) apagarImagemLocal(figura.imagem);
}
