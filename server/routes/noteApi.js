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
    deleteNote(noteId) {
        firestore().collection('Notes').doc(`${noteId}`).update({
            isHide: true
        });
    }
    async getNote(id) {
        return firestore().collection('Notes').doc(`${id}`).get().then(snapshot => {
            return snapshot.data()
        })
    }
}
export default noteApi; 