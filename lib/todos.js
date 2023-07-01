import firestore from '@react-native-firebase/firestore';

export const todosCollection = firestore().collection('todos');

export function createTodo({id, text, done}) {
  return todosCollection.doc(id).set({
    id,
    text,
    done,
  });
}

export async function getTodo(id) {
  const doc = await todosCollection.doc(id).get();
  return doc.data();
}
