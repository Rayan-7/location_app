import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Api from '../../../server/routes/userApi';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MainScreenStyle';
import { Modal, Provider, Portal } from 'react-native-paper';
import AddNote from '../AddNote/AddNote';
const MainScreen = ({ route, navigation }) => {
	const { userId } = route.params;
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ userData, setUserData ] = useState({});
	let api = new Api();

	const fetchData = async () => {
		const user = await api.getUser(userId);
		console.log('users ', user);
		setUserData(user);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const Logout = () => {
		auth().signOut().then(navigation.replace('Login'));
	};
	return (
		<Provider>
			<Portal>
				<Modal animationType="slide" visible={modalVisible}>
					<AddNote style={styles.AddNoteContainer} setCoursesData={setModalVisible} />
				</Modal>
			</Portal>

			<View>
				<Text>
					Welcome mr {userData.firstName} {userData.lastName}
				</Text>
				<Icon onPress={() => Logout()} name="sign-out" size={30} color="black" />
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
				<Icon onPress={() => Logout()} name="map" size={30} color="black" />
				<Icon onPress={() => Logout()} name="list" size={30} color="black" />
				<Icon onPress={() => setModalVisible(true)} name="plus-circle" size={50} color="green" style={styles.addButton} />
			</View>
		</Provider>
	);
};

export default MainScreen;
