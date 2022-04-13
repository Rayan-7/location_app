import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    AddNoteContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',  
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    addButton:{
        position: 'absolute',
        bottom:0,
        right:10,
      
    },
   });
export default styles