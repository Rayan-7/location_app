import React, { useState, useEffect } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	console.log(email + ' ' + password);

	
	useEffect(() => {
		getDataStorage()
		
	}, []);

	const getDataStorage = async () => {
		try {
		  let value = await AsyncStorage.getItem('@storage_Key')
		  value=JSON.parse(value)
		  if(value !== null) {
			auth()
			.signInWithEmailAndPassword(value.email, value.password)
			.then(async (res) => {
				navigation.replace('MainScreen', {
					userId: res.user.uid,
					email: email
				});
			})
		  }
		} catch(e) {
		  // error reading value
		}
	  }

	const setStorageData = async (email,password) => {
		let obj={"email":email,"password":password}
		try {
			const jsonValue = JSON.stringify(obj);
			await AsyncStorage.setItem('@storage_Key', jsonValue);
		} catch (e) {
			// saving error
		}
	};

	const finish = () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (res) => {
				setStorageData(email,password)
				navigation.replace('MainScreen', {
					userId: res.user.uid,
					email: email
				});
			})
			.catch((error) => {
				if (error.code === 'auth/user-not-found') {
					auth()
						.createUserWithEmailAndPassword(email, password)
						.then((res) => {
							navigation.replace('Signup', {
								userId: res.user.uid,
								email: email
							});
						})
						.catch((error) => {
							if (error.code === 'auth/email-already-in-use') {
								console.log('That email address is already in use!');
							}

							if (error.code === 'auth/invalid-email') {
								console.log('That email address is invalid!');
							}

							console.error(error);
						});
				}
			});
	};
	return (
		<SafeAreaView>
			<Form buttonText="Login" onButtonPress={() => finish()}>
				<FormItem
					label="Email"
					isRequired
					value={email}
					placeholder="Email"
					onChangeText={(email) => setEmail(email)}
					asterik
				/>

				<FormItem
					label="Password"
					placeholder="Password"
					isRequired
					value={password}
					maxLength={15}
					onChangeText={(password) => setPassword(password)}
					secureTextEntry={true}
					asterik
				/>
			</Form>
		</SafeAreaView>
	);
};

export default Login;
