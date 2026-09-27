// Temas do jogo. Cada figura pertence a um tema, e a partida sorteia figuras de um tema só.
export const TEMAS = [
  { id: 'animais', nome: 'Animais', icone: 'paw' },
  { id: 'marcas', nome: 'Marcas', icone: 'pricetag' },
  { id: 'personalizado', nome: 'Minhas figuras', icone: 'person' },
];

export const TEMA_INICIAL = 'animais';

export function nomeTema(id) {
  return TEMAS.find((tema) => tema.id === id)?.nome ?? id;
}

// Figuras que já vêm com o app (fotos e logos do Wikimedia Commons).
// No banco, a coluna "imagem" guarda a chave (ex.: "padrao:gato") em vez de um caminho de arquivo.
const PREFIXO = 'padrao:';

export const FIGURAS_PADRAO = {
  [`${PREFIXO}gato`]: { tema: 'animais', descricao: 'Gato', imagem: require('../../assets/figuras/animais/gato.jpg') },
  [`${PREFIXO}cachorro`]: { tema: 'animais', descricao: 'Cachorro', imagem: require('../../assets/figuras/animais/cachorro.jpg') },
  [`${PREFIXO}leao`]: { tema: 'animais', descricao: 'Leão', imagem: require('../../assets/figuras/animais/leao.jpg') },
  [`${PREFIXO}elefante`]: { tema: 'animais', descricao: 'Elefante', imagem: require('../../assets/figuras/animais/elefante.jpg') },
  [`${PREFIXO}girafa`]: { tema: 'animais', descricao: 'Girafa', imagem: require('../../assets/figuras/animais/girafa.jpg') },
  [`${PREFIXO}cavalo`]: { tema: 'animais', descricao: 'Cavalo', imagem: require('../../assets/figuras/animais/cavalo.jpg') },
  [`${PREFIXO}vaca`]: { tema: 'animais', descricao: 'Vaca', imagem: require('../../assets/figuras/animais/vaca.jpg') },
  [`${PREFIXO}panda`]: { tema: 'animais', descricao: 'Panda', imagem: require('../../assets/figuras/animais/panda.jpg') },
  [`${PREFIXO}coelho`]: { tema: 'animais', descricao: 'Coelho', imagem: require('../../assets/figuras/animais/coelho.jpg') },
  [`${PREFIXO}tigre`]: { tema: 'animais', descricao: 'Tigre', imagem: require('../../assets/figuras/animais/tigre.jpg') },
  [`${PREFIXO}zebra`]: { tema: 'animais', descricao: 'Zebra', imagem: require('../../assets/figuras/animais/zebra.jpg') },
  [`${PREFIXO}coruja`]: { tema: 'animais', descricao: 'Coruja', imagem: require('../../assets/figuras/animais/coruja.jpg') },

  [`${PREFIXO}apple`]: { tema: 'marcas', descricao: 'Apple', imagem: require('../../assets/figuras/marcas/apple.png') },
  [`${PREFIXO}samsung`]: { tema: 'marcas', descricao: 'Samsung', imagem: require('../../assets/figuras/marcas/samsung.png') },
  [`${PREFIXO}google`]: { tema: 'marcas', descricao: 'Google', imagem: require('../../assets/figuras/marcas/google.png') },
  [`${PREFIXO}microsoft`]: { tema: 'marcas', descricao: 'Microsoft', imagem: require('../../assets/figuras/marcas/microsoft.png') },
  [`${PREFIXO}nike`]: { tema: 'marcas', descricao: 'Nike', imagem: require('../../assets/figuras/marcas/nike.png') },
  [`${PREFIXO}adidas`]: { tema: 'marcas', descricao: 'Adidas', imagem: require('../../assets/figuras/marcas/adidas.png') },
  [`${PREFIXO}cocacola`]: { tema: 'marcas', descricao: 'Coca-Cola', imagem: require('../../assets/figuras/marcas/cocacola.png') },
  [`${PREFIXO}pepsi`]: { tema: 'marcas', descricao: 'Pepsi', imagem: require('../../assets/figuras/marcas/pepsi.png') },
  [`${PREFIXO}mcdonalds`]: { tema: 'marcas', descricao: "McDonald's", imagem: require('../../assets/figuras/marcas/mcdonalds.png') },
  [`${PREFIXO}netflix`]: { tema: 'marcas', descricao: 'Netflix', imagem: require('../../assets/figuras/marcas/netflix.png') },
  [`${PREFIXO}amazon`]: { tema: 'marcas', descricao: 'Amazon', imagem: require('../../assets/figuras/marcas/amazon.png') },
  [`${PREFIXO}youtube`]: { tema: 'marcas', descricao: 'YouTube', imagem: require('../../assets/figuras/marcas/youtube.png') },
  [`${PREFIXO}instagram`]: { tema: 'marcas', descricao: 'Instagram', imagem: require('../../assets/figuras/marcas/instagram.png') },
  [`${PREFIXO}spotify`]: { tema: 'marcas', descricao: 'Spotify', imagem: require('../../assets/figuras/marcas/spotify.png') },
};

export function ehFiguraPadrao(imagem) {
  return typeof imagem === 'string' && imagem.startsWith(PREFIXO);
}

// Retorna o "source" do <Image>: o asset empacotado ou o arquivo salvo no aparelho.
export function fonteImagem(imagem) {
  return FIGURAS_PADRAO[imagem]?.imagem ?? { uri: imagem };
}
