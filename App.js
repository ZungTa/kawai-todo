import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';
import ToDo from './todo';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
  state = {
    newToDo: '',
    loadedToDos: false,
    toDos: {},
  };

  componentDidMount() {
    this.loadToDos();
  }

  controlNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };

  loadToDos = () => {
    this.setState({
      loadedToDos: true,
    });
  };

  addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo === '') return;

    this.setState((prevState) => {
      const ID = uuidv1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newToDo,
          createdAt: Date.now(),
        },
      };
      const newState = {
        ...prevState,
        newToDo: '',
        toDos: {
          ...prevState.toDos,
          ...newToDoObject,
        },
      };

      return { ...newState };
    });
  };

  deleteToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      return { ...newState };
    });
  };

  unCompleteToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      return { ...newState };
    });
  };

  completeToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      return { ...newState };
    });
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;

    console.log(toDos);

    if (!loadedToDos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder='New To Do'
            value={newToDo}
            onChangeText={this.controlNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* <ToDo text={"Hello I'm a To Do"} /> */}
            {Object.values(toDos).map((toDo) => {
              console.log('todo??', toDo);

              return (
                <ToDo
                  key={toDo.id}
                  deleteToDo={this.deleteToDo}
                  completeToDo={this.completeToDo}
                  unCompleteToDo={this.unCompleteToDo}
                  {...toDo}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontWeight: '200',
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 100,

    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
  },
  toDos: {
    alignItems: 'center',
  },
});
