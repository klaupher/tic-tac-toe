import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [board, setBoard] = useState([]);
  const [restMove, setRestMove] = useState(0);
  const [winner, setWinner] = useState('');

  function iniciarJogo(player) {
    setCurrentPlayer(player);

    setRestMove(9);
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setTela('jogo');
  }

  function jogar(row, column) {
    board[row][column] = currentPlayer;
    setBoard([...board]);

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    checkWinner(board, row, column);
  }

  function checkWinner(board, row, column) {
    if (
      board[row][0] !== '' &&
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2]
    )
      return finishGame(board[row][0]);

    if (
      board[0][column] !== '' &&
      board[0][column] === board[1][column] &&
      board[1][column] === board[2][column]
    )
      return finishGame(board[0][column]);

    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    )
      return finishGame(board[0][0]);

    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    )
      return finishGame(board[0][2]);

    if (restMove - 1 === 0) return finishGame('');

    setRestMove(restMove - 1);
  }

  function finishGame(player) {
    setWinner(player);
    setTela('ganhador');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
    default:
      return getTelaMenu();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subTitle}>Selecione o primeiro jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}
          >
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}
          >
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>

        {board.map((row, rowNumber) => {
          return (
            <View key={rowNumber} style={styles.inlineItems}>
              {row.map((column, columnNumber) => {
                return (
                  <TouchableOpacity
                    key={columnNumber}
                    style={styles.boxJogador}
                    onPress={() => jogar(rowNumber, columnNumber)}
                    disabled={column !== ''}
                  >
                    <Text
                      style={column == 'X' ? styles.jogadorX : styles.jogadorO}
                    >
                      {column}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
        <TouchableOpacity
          style={styles.backMenu}
          onPress={() => setTela('menu')}
        >
          <Text style={styles.textBack}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subTitle}>Resultado Final</Text>

        {winner === '' && <Text style={styles.ganhador}>Nenhum ganhador</Text>}

        {winner !== '' && (
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View
              style={styles.boxJogador}
            >
              <Text style={winner === 'X' ? styles.jogadorX : styles.jogadorO}>
                {winner}
              </Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.backMenu}
          onPress={() => setTela('menu')}
        >
          <Text style={styles.textBack}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  jogadorX: {
    fontSize: 40,
    color: '#553fda',
  },
  jogadorO: {
    fontSize: 40,
    color: '#da3f3f',
  },
  inlineItems: {
    flexDirection: 'row',
  },
  backMenu: {
    margin: 20,
  },
  textBack: {
    color: '#4e6fe4',
  },
  ganhador: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    margin: 10
  }
});
