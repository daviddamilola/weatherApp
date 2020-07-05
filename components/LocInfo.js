import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { useFonts } from '@use-expo/font';
import useAppContext from '../AppContext';

 
const styles = StyleSheet.create({
    locInfo:{
        
      },
      loc: {
        fontWeight: "600",
        fontSize: 17,
      },
      subloc: {
        fontWeight: "normal",
        fontSize: 17,
      },
      white: {
        color: '#FFFFFF',
      },
      mont: {
        fontFamily: 'Montserrat',
      },
      montReg: {
        fontFamily: 'MontserratReg',
      },
      montLight: {
        fontFamily: 'MontserratLight',
      }
})

export default function InfoLoc(){
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/Montserrat-Bold.otf'),
        'MontserratReg': require('../assets/fonts/Montserrat-Regular.otf'),
        'MontserratLight': require('../assets/fonts/Montserrat-Light.otf'),
      });

      const { headerDetails } = useAppContext();
      const date = new Date();
     
        return(
              <View style={styles.locInfo}>
                  <Text style={[styles.loc, styles.white, styles.mont]}>{headerDetails.location}</Text>
                  <Text style={[styles.white, styles.montLight, styles.submont]}>{`${date.getUTCFullYear()} - ${date.getMonth()} - ${date.getDay()}`}</Text>
              </View>
        )
     
}