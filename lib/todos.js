import firestore from '@react-native-firebase/firestore';

export const todosCollection = firestore().collection('todos');

export function createTodo({id, text, done}) {
  return todosCollection.doc(id).set({
    id,
    text,
    done,
  });
}

export async function getTodos() {
  const data = await todosCollection.get();
  const todos = data.docs.map(doc => ({
    ...doc.data(),
  }));
  return todos;
}

export async function toggleTodo(data) {
  return await todosCollection.doc(data.id).update({done: data.done});
}

export function removeTodo(id) {
  return todosCollection.doc(id).delete();
}
