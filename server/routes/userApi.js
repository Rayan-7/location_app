import firestore from '@react-native-firebase/firestore';
class userApi {
    constractor() { }
    addUser(user) {
        firestore().collection('Users').doc(user.id).set(user).then(() => {
            console.log('User added!');
        });
    }
    async getUser(id) {
        return firestore().collection('Users').doc(id).get().then(snapshot => {
            return snapshot.data()
        })
    }
}
export default userApi; 