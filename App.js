import React, {useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import todosStorage from './storages/todosStorage';
import {v4 as uuidv4} from 'uuid';
import {createTodo, removeTodo} from './lib/todos';

const App = () => {
  const today = new Date();

  const [todos, setTodos] = useState([]);

  const onInsert = text => {
    const todo = {
      id: uuidv4(),
      text,
      done: false,
    };

    createTodo(todo)
      .then(() => {
        setTodos(todos.concat(todo));
      })
      .catch(console.error);
    console.log(todos);
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList
              todos={todos}
              onToggle={onToggle}
              onRemove={onRemove}
              removeTodo={removeTodo}
            />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
