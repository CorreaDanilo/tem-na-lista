
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import { Produto } from '../interfaces/Produto';

interface Props {
  produtos: Produto[];
  codigoSelecionado: string | null;
}

export default function ListaProdutos({
  produtos,
  codigoSelecionado,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Produtos cadastrados
      </Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.codigo}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selecionado =
            item.codigo === codigoSelecionado;

          return (
            <View
              style={[
                styles.item,
                selecionado && styles.itemSelecionado,
              ]}
            >
              <View style={styles.informacoes}>
                <Text style={styles.nome}>
                  {item.nome}
                </Text>

                <Text style={styles.codigo}>
                  {item.codigo}
                </Text>
              </View>

              {selecionado && (
                <Text style={styles.check}>✓</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 5,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  itemSelecionado: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
    borderWidth: 2,
  },
  informacoes: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  codigo: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  check: {
    color: '#16A34A',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
