import React, {useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import todosStorage from './storages/todosStorage';
import {v4 as uuidv4} from 'uuid';
import {createTodo, getTodos, removeTodo, toggleTodo} from './lib/todos';

const App = () => {
  const today = new Date();

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fn = async () => {
      const todoData = await getTodos();
      setTodos(todoData);
    };
    fn();
  });

  const onInsert = text => {
    const todo = {
      id: uuidv4(),
      text,
      done: false,
    };

    createTodo(todo);
  };

  const onToggle = id => {
    let data = {};
    todos.map(todo => {
      if (todo.id === id) {
        data = {...todo, done: !todo.done};
      }
    });
    toggleTodo(data);
  };

  const onRemove = id => {
    removeTodo(id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length == 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
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
