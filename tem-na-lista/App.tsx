
import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { PRODUTOS } from './dados/produtos';

import { Produto } from './interfaces/Produto';

import CartaoResultado from './components/CartaoResultado';
import ListaProdutos from './components/ListaProdutos';

export default function App() {
  // Permissão da câmera
  const [permissao, pedirPermissao] = useCameraPermissions();

  // Código que foi lido
  const [codigoLido, setCodigoLido] = useState<string | null>(null);

  // Trava para impedir leituras repetidas
  const travaLeitura = useRef(false);

  // Procura o produto na lista
  const produtoEncontrado: Produto | undefined =
    PRODUTOS.find(
      (produto) => produto.codigo === codigoLido
    );

  // Função chamada quando a câmera identifica um código
  function handleBarcodeScanned(
    resultado: BarcodeScanningResult
  ) {
    // Impede que a leitura aconteça mais de uma vez
    if (travaLeitura.current) {
      return;
    }

    travaLeitura.current = true;

    console.log('Código lido:', resultado.data);

    setCodigoLido(resultado.data);
  }

  // Reinicia a leitura
  function escanearNovamente() {
    travaLeitura.current = false;
    setCodigoLido(null);
  }

  // Enquanto verifica a permissão
  if (!permissao) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={styles.textoCarregando}>
          Verificando permissão da câmera...
        </Text>
      </View>
    );
  }

  // Tela exibida quando não existe permissão
  if (!permissao.granted) {
    return (
      <SafeAreaView style={styles.permissaoContainer}>
        <Text style={styles.tituloPermissao}>
          Tem na lista?
        </Text>

        <Text style={styles.textoPermissao}>
          Precisamos acessar a câmera do seu celular
          para ler os códigos de barras dos produtos
          e verificar se eles estão cadastrados.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={
            permissao.canAskAgain
              ? pedirPermissao
              : () => Linking.openSettings()
          }
        >
          <Text style={styles.textoBotao}>
            {permissao.canAskAgain
              ? 'Permitir câmera'
              : 'Abrir configurações'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Tela principal do aplicativo
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>
          Tem na lista?
        </Text>

        <Text style={styles.headerSubtitulo}>
          LEITOR DE CÓDIGO DE BARRAS
        </Text>
      </View>

      {/* Área da câmera */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['ean13'],
          }}
          onBarcodeScanned={
            codigoLido === null
              ? handleBarcodeScanned
              : undefined
          }
        />

        {/* Moldura sobre a câmera */}
        <View style={styles.molduraContainer}>
          <View style={styles.moldura}>
            <Text style={styles.textoMoldura}>
              Posicione o código aqui
            </Text>
          </View>
        </View>
      </View>

      {/* Cartão de resultado */}
      <CartaoResultado
        codigoLido={codigoLido}
        produto={produtoEncontrado}
      />

      {/* Botão para uma nova leitura */}
      {codigoLido !== null && (
        <TouchableOpacity
          style={styles.botao}
          onPress={escanearNovamente}
        >
          <Text style={styles.textoBotao}>
            Escanear novamente
          </Text>
        </TouchableOpacity>
      )}

      {/* Lista de produtos */}
      <ListaProdutos
        produtos={PRODUTOS}
        codigoSelecionado={
          produtoEncontrado ? codigoLido : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#166534',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitulo: {
    fontSize: 11,
    color: '#DCFCE7',
    marginTop: 4,
    letterSpacing: 1,
  },
  cameraContainer: {
    height: 230,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222222',
  },
  molduraContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moldura: {
    width: '80%',
    height: 85,
    borderWidth: 3,
    borderColor: '#22C55E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoMoldura: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: '#00000099',
    padding: 5,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#166534',
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  textoCarregando: {
    marginTop: 12,
    color: '#555555',
  },
  permissaoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 25,
  },
  tituloPermissao: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 15,
  },
  textoPermissao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444444',
    lineHeight: 24,
    marginBottom: 25,
  },
});
