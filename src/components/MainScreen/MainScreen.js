import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import UserApi from '../../../server/routes/userApi';
import NoteApi from '../../../server/routes/noteApi';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MainScreenStyle';
import { Modal, Provider, Portal } from 'react-native-paper';
import NoteScreen from '../NoteScreen/NoteScreen';
import dateFormat from 'dateformat';
import firestore from '@react-native-firebase/firestore';
import { List, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = ({ route, navigation }) => {
	const { userId, email } = route.params;
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ mapListVisible, setMapListVisible ] = useState(true); //false Map - true list
	const [ userData, setUserData ] = useState({});
	const [ notesData, setNotesData ] = useState([]);
	const [ noteData, setNoteData ] = useState({});

	let userApi = new UserApi();
	let noteApi = new NoteApi();

	const fetchUser = async () => {
		const user = await userApi.getUser(userId);
		if (user.firstName == '' || user.lastName == '') {
			navigation.replace('Signup', {
				userId: userId,
				email: email
			});
			return false
		} else setUserData(user);
		return true
	};
	useEffect(() => {
		let userSuccess=fetchUser();
		if(!userSuccess)
			return
		let ref = firestore().collection('Notes').orderBy('date', 'desc');
		const unsubscribe = ref.onSnapshot((snapshot) => {
			var arrayData = [];
			snapshot.forEach((snapshot) => {
				let data = snapshot.data();
				if (snapshot.data().isHide === false) {
					if (snapshot.data().userId === userId) arrayData.push(data);
				}
			});
			console.log('Array data ', arrayData);
			setNotesData(arrayData);
		});
		return () => unsubscribe();
	}, []);

	const Logout = async () => {
		auth().signOut().then(navigation.replace('Login'));
		try {
			await AsyncStorage.clear();
		} catch (exception) {
			console.log(exception);
		}
	};
	const deleteNote = (noteId) => {
		noteApi.deleteNote(noteId);
	};
	const handleClick = (item) => {
		setNoteData(item);
		setModalVisible(true);
	};
	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => {
				handleClick(item);
			}}
		>
			<ListItem bottomDivider>
				<Icon name="map-marker" size={50} color="black" />
				<ListItem.Content>
					<ListItem.Title>{item.title}</ListItem.Title>
					<ListItem.Subtitle>
						{item.body} {dateFormat(item.date.toDate(), 'd/m/yyyy - h:MM TT')}
					</ListItem.Subtitle>
				</ListItem.Content>
				<Icon name="minus" size={30} color="red" onPress={() => deleteNote(item.id)} />
				<ListItem.Chevron />
			</ListItem>
		</TouchableOpacity>
	);

	return (
		<Provider>
			<Portal>
				<Modal animationType="slide" visible={modalVisible}>
					<NoteScreen
						style={styles.AddNoteContainer}
						ModalVisible={setModalVisible}
						userId={userId}
						note={noteData}
						setNoteData={setNoteData}
					/>
				</Modal>
			</Portal>

			<Text style={styles.welcomeText}>
				Welcome {userData.firstName} {userData.lastName}
			</Text>

			<Icon onPress={() => Logout()} name="sign-out" size={30} color="black" style={styles.LogoutButton} />
			{notesData.length>0?(
				<>
			{!mapListVisible ? (
				<View style={styles.container}>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={styles.map}

					>
						{notesData.map(note=>(

						<Marker key={id}
						coordinate={{ latitude: note.location.latitude, longitude: note.location.longitude }}
						pinColor={'purple'}
						title={note.title}
						onPress={() => handleClick(note)}
					    >
						</Marker>
						))} 

						
					</MapView>
				</View>
			) : (
				<FlatList data={notesData} renderItem={renderItem} keyExtractor={(item) => item.id} />
			)}
			<View style={{ flexDirection: 'row' }}>
				<Icon
					onPress={() => setMapListVisible(false)}
					name="map"
					size={40}
					color="black"
					style={styles.buttonStyle}
				/>
				<Icon
					onPress={() => setMapListVisible(true)}
					name="list"
					size={40}
					color="black"
					style={styles.buttonStyle}
				/>
			</View>
			</>)

			:(<Text>Notes are empty</Text>)}

			<Icon
				onPress={() => setModalVisible(true)}
				name="plus-circle"
				size={70}
				color="green"
				style={styles.addButton}
			/>
		</Provider>
	);
};

export default MainScreen;
