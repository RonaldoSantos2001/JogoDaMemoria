import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { figurasStyles as styles } from '../styles/figuras.styles';
import { colors, spacing } from '../theme';
import Button from './Button';

const OPCOES_IMAGEM = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

export default function NovaFiguraModal({ visivel, nomeTema, onFechar, onSalvar }) {
  const insets = useSafeAreaInsets();
  const [imagem, setImagem] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function limpar() {
    setImagem(null);
    setDescricao('');
    setErro('');
    setSalvando(false);
  }

  function fechar() {
    limpar();
    onFechar();
  }

  async function escolherImagem(origem) {
    setErro('');
    const permissao =
      origem === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      setErro('Permissão negada. Libere o acesso nas configurações do aparelho.');
      return;
    }

    const resultado =
      origem === 'camera'
        ? await ImagePicker.launchCameraAsync(OPCOES_IMAGEM)
        : await ImagePicker.launchImageLibraryAsync(OPCOES_IMAGEM);

    if (!resultado.canceled && resultado.assets?.length) {
      setImagem(resultado.assets[0].uri);
    }
  }

  async function salvar() {
    // Validações obrigatórias do trabalho
    if (!imagem) {
      setErro('A figura precisa ter uma imagem.');
      return;
    }
    if (!descricao.trim()) {
      setErro('A figura precisa ter uma descrição.');
      return;
    }

    try {
      setSalvando(true);
      await onSalvar({ imagem, descricao });
      limpar();
    } catch (e) {
      setErro(e.message);
      setSalvando(false);
    }
  }

  return (
    <Modal visible={visivel} transparent animationType="slide" onRequestClose={fechar}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.modalOverlay} onPress={fechar}>
          <Pressable
            style={[styles.modalSheet, { paddingBottom: spacing.xl + insets.bottom }]}
            onPress={() => {}}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Nova figura</Text>
            {nomeTema ? <Text style={styles.modalSubtitle}>Tema: {nomeTema}</Text> : null}

            <Pressable style={styles.picker} onPress={() => escolherImagem('galeria')}>
              {imagem ? (
                <Image source={{ uri: imagem }} style={styles.pickerImage} resizeMode="cover" />
              ) : (
                <>
                  <Ionicons name="image-outline" size={40} color={colors.textMuted} />
                  <Text style={styles.pickerText}>Toque para escolher uma imagem</Text>
                </>
              )}
            </Pressable>

            <View style={styles.pickerActions}>
              <Button
                titulo="Galeria"
                icone="images-outline"
                variante="secondary"
                style={styles.pickerAction}
                onPress={() => escolherImagem('galeria')}
              />
              <Button
                titulo="Câmera"
                icone="camera-outline"
                variante="secondary"
                style={styles.pickerAction}
                onPress={() => escolherImagem('camera')}
              />
            </View>

            <View>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                value={descricao}
                onChangeText={(texto) => {
                  setDescricao(texto);
                  setErro('');
                }}
                placeholder="Ex.: Cachorro, Maçã, Foguete..."
                placeholderTextColor={colors.textFaint}
                style={styles.input}
                maxLength={40}
                returnKeyType="done"
              />
            </View>

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <View style={styles.modalActions}>
              <Button titulo="Cancelar" variante="ghost" style={styles.modalAction} onPress={fechar} />
              <Button
                titulo="Salvar"
                icone="checkmark"
                style={styles.modalAction}
                onPress={salvar}
                carregando={salvando}
              />
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
