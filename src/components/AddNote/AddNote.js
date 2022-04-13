import React, { useState } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { SafeAreaView} from 'react-native';
const AddNote = () => {
    const [ date, setDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	console.log(email + ' ' + password);

	const finish = () => {
		
	};
	return (
		<SafeAreaView>
			<Form buttonText="Save" onButtonPress={() => finish()}>
				<FormItem
					label="Date"
					value={date}
					onChangeText={(date) => setDate(date)}
					asterik
				/>

				<FormItem
					label="Title"
					placeholder="type the title here"
					isRequired
					value={title}
					maxLength={15}
					onChangeText={(title) => setTitle(title)}
					asterik
				/>
                <FormItem
					label="Body"
					placeholder="type the body here"
					isRequired
					value={body}
					maxLength={256}
                    textArea={true}
					onChangeText={(body) => setBody(body)}
					asterik
				/>
			</Form>
		</SafeAreaView>
	);
};

export default AddNote;