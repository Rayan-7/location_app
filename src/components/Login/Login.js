import React, { useState } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView
} from 'react-native';
const Login = ({navigation}) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	console.log(email+ " "+password)

  const finish = () => {
    auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }
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
