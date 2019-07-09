import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

class ToDo extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func,
    unCompleteToDo: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      toDoValue: props.text,
    };
  }

  toggleCompleteToDo = () => {
    const { isCompleted, id } = this.props;
    const { completeToDo, unCompleteToDo } = this.props;

    if (isCompleted) {
      unCompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };
  finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };
  controlInput = (text) => {
    this.setState({
      toDoValue: text,
    });
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { id, text, isCompleted } = this.props;
    const { deleteToDo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleCompleteToDo}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.unCompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText,
              ]}
              value={toDoValue}
              multiline
              onChangeText={this.controlInput}
              returnKeyType={'done'}
              onBlur={this.finishEditing}
            />
          ) : (
            <Text
              style={[styles.text, isCompleted ? styles.completedText : styles.unCompletedText]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this.finishEditing}>
              <View>
                <Text style={styles.actionContainer}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this.startEditing}>
              <View>
                <Text style={styles.actionContainer}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteToDo(id)}>
              <View>
                <Text style={styles.actionContainer}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  unCompletedCircle: {
    borderColor: '#f23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unCompletedText: {
    color: '#353539',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 15,
    width: width / 2,
  },
});

export default ToDo;
