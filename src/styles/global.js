import { StyleSheet } from "react-native";
import { Colors } from "./colors";



export const globalStyles = StyleSheet.create({

    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primaryDark,
      paddingBottom: 120
    },
  
    inputContainer:{
      width: '80%',
      backgroundColor: Colors.primaryDark,
    },
  
    input:{
      backgroundColor: Colors.primaryDark,
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 15,
      marginTop: 15,
      borderColor: Colors.primaryLight,
      borderWidth: 2,
      color: Colors.primaryLight,
      fontFamily: 'Montserrat-Italic'
    },
  
    buttonContainer:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40
  
    },
  
    button:{
      flexDirection: 'row',
      backgroundColor: Colors.primaryLight,
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    buttonText:{
      color: Colors.primaryDark,
      fontWeight: '700',
      fontSize: 16,
      fontFamily: 'Montserrat-Bold'
    },

    invertButton:{
      flexDirection: 'row',
      backgroundColor: Colors.primaryDark,
      borderColor: Colors.primaryLight,
      borderWidth: 2,
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'

    },
  
    invertButtonText:{
      color: Colors.primaryLight,
      fontWeight: '700',
      fontSize: 16,
      fontFamily: 'Montserrat-Bold'
    },

    buttonIcon:{
      paddingLeft: 10
    },
  
    textView:{
      paddingVertical: 25,
    },
  
    textUnderline:{
      paddingVertical: 5,
      textAlign: 'center',
      color: Colors.primaryLight,
      fontFamily: 'Montserrat',
      textDecorationLine: 'underline'
    },

    text:{
      paddingVertical: 5,
      textAlign: 'center',
      color: Colors.primaryLight,
      fontFamily: 'Montserrat',
    },

    title:{
      textAlign: 'center',
      color: Colors.primaryLight,
      fontSize: 20,
      fontFamily: 'Montserrat-Bold'
    },

    logo:{
      width: 150,
      height: 150,
      resizeMode: 'contain'
    },

    nusarTitle:{
      fontFamily: 'Nusar',
      color: Colors.primaryLight,
      fontSize: 26,
      textAlign: 'left',
      textTransform: 'uppercase',

    },
    secondaryText:{
      textAlign: 'left',
      color: Colors.postSecondaryColor,
      fontFamily: 'Montserrat-Italic',
    },
  
  })