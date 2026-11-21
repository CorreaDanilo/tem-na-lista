
import { View, Text, StyleSheet } from 'react-native';
import { Produto } from '../interfaces/Produto';

interface Props {
  codigoLido: string | null;
  produto: Produto | undefined;
}

export default function CartaoResultado({
  codigoLido,
  produto,
}: Props) {
  // Nenhum código foi lido
  if (codigoLido === null) {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>Resultado da leitura</Text>
        <Text style={styles.aguardando}>
          Aponte para um código de barras
        </Text>
      </View>
    );
  }

  // Produto encontrado
  if (produto) {
    return (
      <View style={[styles.card, styles.encontrado]}>
        <Text style={styles.titulo}>✅ Produto encontrado</Text>

        <Text style={styles.nome}>{produto.nome}</Text>

        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </Text>

        <Text style={styles.codigo}>
          Código: {codigoLido}
        </Text>
      </View>
    );
  }

  // Produto não encontrado
  return (
    <View style={[styles.card, styles.naoEncontrado]}>
      <Text style={styles.titulo}>
        ❌ Produto não encontrado
      </Text>

      <Text style={styles.codigo}>
        Código lido: {codigoLido}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 10,
  },
  aguardando: {
    color: '#777777',
    fontSize: 15,
  },
  encontrado: {
    borderLeftWidth: 5,
    borderLeftColor: '#16A34A',
  },
  naoEncontrado: {
    borderLeftWidth: 5,
    borderLeftColor: '#DC2626',
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 5,
  },
  preco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16A34A',
    marginBottom: 5,
  },
  codigo: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
});
