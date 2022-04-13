import firestore from '@react-native-firebase/firestore';
class noteApi {
    constractor() { }
    addNote(note) {
        firestore().collection('Notes').doc(`${note.id}`).set(note).then(() => {
            console.log('note added!');
        });
    }
    async getAllNotesCount() {
        return firestore().collection('Notes').get().then(snap => {
            return snap.size
        });
    }
}
export default noteApi; 