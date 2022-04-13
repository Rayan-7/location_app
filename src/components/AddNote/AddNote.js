import React, { useState } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { SafeAreaView} from 'react-native';
import dateFormat from "dateformat";
import styles from './AddNoteStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteApi from '../../../server/routes/noteApi';
import Note from '../../../server/models/Note';

const AddNote = (props) => {
    const [ date, setDate ] = useState(new Date(Date.now()));
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    let noteApi=new NoteApi();
	const finish = async () => {
		let notesCount=await noteApi.getAllNotesCount()
        let noteObj=new Note(notesCount,date,title,body,props.userId)
        console.log("this is my id "+noteObj.id)
        noteApi.addNote(noteObj)
	};
	return (
		<SafeAreaView>
            <Icon onPress={()=>props.ModalVisible(false)} name="window-close" size={40} color="black" style={styles.windowClose}/>
			<Form buttonText="Save" onButtonPress={() => finish()}>
				<FormItem
					label="Date"
					value={dateFormat(date, "d/m/yyyy - h:MM TT")}
                    editable={false}
					onChangeText={(date) => setDate(date)}
				/>

				<FormItem
					label="Title"
					placeholder="type the title here"
					isRequired
					value={title}
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