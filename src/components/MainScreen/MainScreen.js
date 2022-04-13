import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput,FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import UserApi from '../../../server/routes/userApi';
import NoteApi from '../../../server/routes/noteApi';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MainScreenStyle';
import { Modal, Provider, Portal } from 'react-native-paper';
import NoteScreen from '../NoteScreen/NoteScreen';
import dateFormat from "dateformat";
import firestore from '@react-native-firebase/firestore';
import { List, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = ({ route, navigation }) => {
	const { userId } = route.params;
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ mapListVisible, setMapListVisible ] = useState(true); //false Map - true list
	const [ userData, setUserData ] = useState({});
    const [ NoteSearch, setNoteSearch ] = useState('');
    const [notesData, setNotesData] = useState([])
    const [noteId,setNoteId]=useState({});
	let userApi = new UserApi();
    let noteApi = new NoteApi();

	const fetchData = async () => {
		const user = await userApi.getUser(userId);
		console.log('users ', user);
		setUserData(user);
	};
	useEffect(() => {
		fetchData();
	}, []);

    useEffect(() => {
        let ref=firestore().collection('Notes');
        let noteLowerCase=NoteSearch.toLowerCase()
        if(noteLowerCase){
          ref=ref.where('title', '>=', noteLowerCase).where('title', '<=', noteLowerCase + '~')
        }
        const unsubscribe = ref.onSnapshot(snapshot => {
          var arrayData = [];
          snapshot.forEach(snapshot => {
              let data = snapshot.data();
              if(snapshot.data().isHide===false)
              {
                 if(snapshot.data().userId===userId)
                  arrayData.push(data)

             }
    
          })
          console.log("array DATA "+arrayData)
          setNotesData(arrayData)
      })
        return () => unsubscribe()
      }, [NoteSearch])

	const Logout = async () => {
		auth().signOut().then(navigation.replace('Login'));
        try {
            await AsyncStorage.clear();
        }
        catch(exception) {
            console.log(exception)
        }
	};
    const deleteNote=(noteId)=>{
        noteApi.deleteNote(noteId)
    }
    const handleClick=(item)=>{
        setNoteId(item.id)
        setModalVisible(true)
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            handleClick(item)
          }}
        >
        <ListItem bottomDivider>

          <Icon name="map" size={50} color="black" />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.body} {dateFormat(item.date.toDate(), "d/m/yyyy - h:MM TT")}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon name="minus" size={30} color="red" onPress={() => deleteNote(item.id)} />
          <ListItem.Chevron />
        </ListItem>
        </TouchableOpacity>
      )
	return (
		<Provider>
			<Portal>
				<Modal animationType="slide" visible={modalVisible}>
					<NoteScreen style={styles.AddNoteContainer} ModalVisible={setModalVisible} userId={userId} noteId={noteId}/>
				</Modal>
			</Portal>

			<View>
				<Text>
					Welcome mr {userData.firstName} {userData.lastName}
				</Text>
				<Icon onPress={() => Logout()} name="sign-out" size={30} color="black" />
				{!mapListVisible ? (
					<View style={styles.container}>
						<MapView
							provider={PROVIDER_GOOGLE} // remove if not using Google Maps
							style={styles.map}
							region={{
								latitude: 37.78825,
								longitude: -122.4324,
								latitudeDelta: 0.015,
								longitudeDelta: 0.0121
							}}
						/>
					</View>
				) : (
					<View>
						<TextInput
							style={{ height: 40 }}
							placeholder="Type here to Search by title!"
							onChangeText={(newText) => setNoteSearch(newText)}
							defaultValue={NoteSearch}
						/>

						<FlatList data={notesData} 
                        renderItem={renderItem} 
                        keyExtractor={(item) => item.id}/>
					</View>
				)}
				<Icon onPress={() => setMapListVisible(false)} name="map" size={30} color="black" />
				<Icon onPress={() => setMapListVisible(true)} name="list" size={30} color="black" />
				<Icon
					onPress={() => setModalVisible(true)}
					name="plus-circle"
					size={50}
					color="green"
					style={styles.addButton}
				/>
			</View>
		</Provider>
	);
};

export default MainScreen;
