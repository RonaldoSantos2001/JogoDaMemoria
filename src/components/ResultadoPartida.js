import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, View } from 'react-native';

import { jogoStyles as styles } from '../styles/jogo.styles';
import { colors } from '../theme';
import { formatarTempo } from '../utils/formatar';
import Button from './Button';

function mensagemFinal(erros) {
  if (erros === 0) return 'Perfeito! Você não errou nenhuma vez!';
  if (erros <= 3) return 'Excelente memória, mandou muito bem!';
  if (erros <= 8) return 'Muito bom! Dá para melhorar ainda mais.';
  return 'Você concluiu o jogo! Continue treinando.';
}

// Área de exibição do resultado final da partida + registro no ranking.
// É montada apenas quando a partida termina, então o estado recomeça a cada partida.
export default function ResultadoPartida({
  erros,
  segundos,
  pontuacao,
  onSalvarRecorde,
  onJogarNovamente,
  onVerRanking,
}) {
  const [jogador, setJogador] = useState('');
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function salvar() {
    if (!jogador.trim()) {
      setErro('Digite seu nome para entrar no ranking.');
      return;
    }
    try {
      setSalvando(true);
      await onSalvarRecorde(jogador);
      setSalvo(true);
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onJogarNovamente}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.resultadoOverlay}>
          <View style={styles.resultado}>
            <View style={styles.resultadoIcone}>
              <Ionicons name="trophy" size={42} color={colors.warning} />
            </View>

            <Text style={styles.resultadoTitulo}>Fim de jogo!</Text>
            <Text style={styles.resultadoMensagem}>{mensagemFinal(erros)}</Text>

            <View style={styles.resultadoStats}>
              <View style={styles.resultadoStat}>
                <Text style={styles.resultadoStatValor}>{erros}</Text>
                <Text style={styles.resultadoStatLabel}>Erros</Text>
              </View>
              <View style={styles.resultadoStat}>
                <Text style={styles.resultadoStatValor}>{formatarTempo(segundos)}</Text>
                <Text style={styles.resultadoStatLabel}>Tempo</Text>
              </View>
              <View style={styles.resultadoStat}>
                <Text style={[styles.resultadoStatValor, { color: colors.primary }]}>{pontuacao}</Text>
                <Text style={styles.resultadoStatLabel}>Pontos</Text>
              </View>
            </View>

            {salvo ? (
              <View style={[styles.salvo, { alignSelf: 'stretch' }]}>
                <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                <Text style={styles.salvoTexto}>Recorde salvo no ranking!</Text>
              </View>
            ) : (
              <View style={styles.resultadoForm}>
                <TextInput
                  value={jogador}
                  onChangeText={(texto) => {
                    setJogador(texto);
                    setErro('');
                  }}
                  placeholder="Seu nome"
                  placeholderTextColor={colors.textFaint}
                  style={styles.input}
                  maxLength={20}
                  returnKeyType="done"
                  onSubmitEditing={salvar}
                />
                {erro ? <Text style={styles.erro}>{erro}</Text> : null}
                <Button
                  titulo="Salvar no ranking"
                  icone="podium-outline"
                  variante="success"
                  onPress={salvar}
                  carregando={salvando}
                />
              </View>
            )}

            <View style={styles.resultadoAcoes}>
              <Button titulo="Jogar novamente" icone="refresh" onPress={onJogarNovamente} />
              {salvo && <Button titulo="Ver ranking" variante="ghost" onPress={onVerRanking} />}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
