import React, { useState} from 'react';
import { Form, FormItem } from 'react-native-form-component';
import { SafeAreaView} from 'react-native';
import dateFormat from "dateformat";
import styles from './NoteScreenStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteApi from '../../../server/routes/noteApi';
import Note from '../../../server/models/Note';
import Geolocation from '@react-native-community/geolocation';

const NoteScreen = (props) => {
	let note=props.note;

    const [ date, setDate ] = useState(new Date(Date.now()));
    const [ title, setTitle ] = useState(note.title??'');
    const [ body, setBody ] = useState(note.body??'');
	const [location,setLocation]=useState({})
	let idProps=note.id
    let noteApi=new NoteApi();
	const finish = async () => {
		if(!idProps){
			idProps=await noteApi.getAllNotesCount()
		}
		
		Geolocation.getCurrentPosition(
			(position) => {
			  console.log(position.coords.latitude)
			  let locationObj={
				  "latitude":position.coords.latitude,
				  "longitude":position.coords.longitude
				}
				let noteObj=new Note(idProps,date,title,body,props.userId,locationObj)
				noteApi.addNote(noteObj)
			  
			},
			(error) => {
			  // See error code charts below.
			  console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);

        
		
		
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