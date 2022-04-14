import React, { useState,useEffect } from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { SafeAreaView} from 'react-native';

import dateFormat from "dateformat";
import styles from './NoteScreenStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteApi from '../../../server/routes/noteApi';
import Note from '../../../server/models/Note';

const NoteScreen = (props) => {
	let note=props.note;
	console.log("aaa "+note.title)
    const [ date, setDate ] = useState(new Date(Date.now()));
    const [ title, setTitle ] = useState(note.title??'');
    const [ body, setBody ] = useState(note.body??'');
	let idProps=note.id
    let noteApi=new NoteApi();
	const finish = async () => {
		if(!idProps){
			idProps=await noteApi.getAllNotesCount()
		}

        let noteObj=new Note(idProps,date,title,body,props.userId)
        console.log("this is my id "+noteObj.id)
        noteApi.addNote(noteObj)
		ModalClose();
	};
	const ModalClose=()=>{
		props.ModalVisible(false)
		props.setNoteData('')
	}


	return (
		<SafeAreaView>
            <Icon onPress={()=>ModalClose()} name="window-close" size={40} color="black" style={styles.windowClose}/>
			<Form buttonText="Save" onButtonPress={() => finish()}>
				<FormItem
					label="Date"
					value={dateFormat(date, "d/m/yyyy - h:MM TT")}
                    editable={false}
			
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

export default NoteScreen;