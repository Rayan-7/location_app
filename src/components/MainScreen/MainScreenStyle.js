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
    buttonStyle:{
      marginHorizontal: 10,
        marginTop: 5,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'#fff',
    },
    LogoutButton:{
      position: 'absolute',
        top:0,
        right:10,
        marginBottom: 5,
    },
    welcomeText:{
        fontSize: 25,
        fontWeight: "bold",
        alignItems:'center',

    }

   });
export default styles