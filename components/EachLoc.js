import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import { useFonts } from '@use-expo/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {weatherConditions} from '../weatherCond';
import useAppContext from '../AppContext';

const styles = StyleSheet.create({
    card:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    mainLocText: {
        fontSize: 14,
        marginRight: 10,
        color: '#000',
    },
})

export default function EachLoc({weatherInfo}){
    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/Montserrat-Bold.otf'),
        'MontserratReg': require('../assets/fonts/Montserrat-Regular.otf'),
        'MontserratLight': require('../assets/fonts/Montserrat-Light.otf'),
      });

      const {setLocation, setWeather, weather, setDetails} = useAppContext();

      
      const date = new Date();

      const onClick = (details) => {
        setDetails({
            location: details.name
        })

        setLocation({
            currentLatitude: details.coord.lat,
            currentLongitude: details.coord.lon
        })

        setWeather({
            ...weather,
            location: details.name,
            cloud: details.weather[0].main,
            temperature: details.main.temp,
        })
      }
     
        return(
            <TouchableWithoutFeedback onPress={() => {onClick(weatherInfo)}} underlayColor="#10B8ED">
                <View style={styles.card}>
                                    <MaterialCommunityIcons
                                        size={40}
                                        name={weatherConditions[weatherInfo.weather[0].main].icon}
                                        color={'#000'}
                                    />
                                    <Text style={styles.mainLocText}>{weatherInfo.name}</Text>

                                    <Text style={styles.mainLocText}>{weatherInfo.main.temp}</Text>
                </View>
              </TouchableWithoutFeedback>
        )
     
}