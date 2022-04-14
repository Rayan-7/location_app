import React, { useState } from 'react';
import {SafeAreaView} from 'react-native';

import { Form, FormItem, Picker } from 'react-native-form-component';
import User from '../../../server/models/User';
import api from '../../../server/routes/userApi'

const Signup = ({ route, navigation }) => {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const { userId, email } = route.params;
const Finish = () => {
    if(!firstName||!lastName)
        return
    const userObj = new User(userId,email,firstName, lastName,gender)
    const userApi = new api()
    console.log("user object "+userObj)
    userApi.addUser(userObj)
    navigation.replace("MainScreen", {
        userId: userId
    })
}
return (
    <SafeAreaView>

        <Form buttonText="Signup" onButtonPress={() => Finish()}>

            <FormItem
                label="Name"
                isRequired
                placeholder="Enter your name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
                maxLength={30}
                asterisk
            />
            <FormItem
                label="LastName"
                placeholder="Enter your LastName"
                isRequired
                value={lastName}
                maxLength={15}
                onChangeText={text => setLastName(text)}
                asterisk
            />

            <Picker
                items={[
                    { label: 'male', value: 1 },
                    { label: 'female', value: 2 },
                ]}
                placeholder="select your gender"
                label="Gender"
                selectedValue={gender}
                onSelection={(item) => setGender(item.value)}
            />
        </Form>

    </SafeAreaView>

);


}


export default Signup;