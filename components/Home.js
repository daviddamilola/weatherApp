import React from 'react';
import { View,TouchableHighlight, StyleSheet, Text, TextInput, Button,PermissionsAndroid,Platform, SafeAreaView, FlatList} from 'react-native';
import Rainy from '../assets/rainy.svg';
import { useFonts } from '@use-expo/font';
// import { AppLoading } from 'expo';
import helpers from '../utils/css';
import Geolocation from '@react-native-community/geolocation';
import useAppContext from '../AppContext';
import api from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_KEY} from 'react-native-dotenv';
import {weatherConditions} from '../weatherCond';
import LocInfo from "./LocInfo";
import Notif from '../assets/Notif.svg';
import Reload from '../assets/reload.svg';
import EachLoc from './EachLoc';



const styles = StyleSheet.create({
    ...helpers,
    container:{
        flex: 1,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    bg: {
        flex: 2,
        backgroundColor: '#10B8ED',
    },
    details:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 2,
        backgroundColor: '#e8e8e8',
    },
    card:{
        borderRadius: 5,
        elevation: 4,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 5,
    },
    smHeight: {
        minHeight: 120,
    },
    lgHeight: {
        height: 170,
    },
    overlay: {
        top: '-10%'
    },
    nav:{
        backgroundColor: 'white',
        height: 50,
    },
    mainLoc: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainLocText: {
        fontSize: 46,
        marginRight: 10,
        color: '#FFFFFF',
    },
    mainCloudText: {
        fontSize: 26,
        marginRight: 10,
        color: '#FFFFFF',
        
    },
    cloud:{
        marginBottom: 10,
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        width: 330,
        marginTop: 10,
        
    },
    button: {
        backgroundColor: '#10B8ED',
    }

})

export default function Home({navigator}){

    const [text, setText] = React.useState('');
    const reload = React.useRef(0);

    const triggerReload = () => {reload.current += 1}
    const { 
        setDetails,
        location,
        setLocation,
        moreLocations,
        setMoreLocations,
        watchId,
        setWatchId,
        weather,
        setWeather,
        setForecasts,
        setHours,
    } = useAppContext();

    const handleSubmit = () => {
        getByLocation(text)
        setDetails({
            location: text
        })
        setText('')
    }

    React.useEffect(() => {
        if(location.currentLongitude && location.currentLatitude){
            const {currentLongitude, currentLatitude} = location;
            getInArea(currentLatitude, currentLongitude);
            api.get(`/onecall?lat=${location.currentLatitude}&lon=${location.currentLongitude}&exclude=minutely&appid=${API_KEY}`).then(response => {
                setForecasts(response.data);
                setHours(response.data.hourly);
            }).catch(err => console.log('error is', err, err.response))
        }
    }, [location])

    React.useEffect(() => {
        if(Platform.OS === 'ios'){
            callLocation();
          }else{
            async function requestLocationPermission() {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    'title': 'Location Access Required',
                    'message': 'Please accept to turn on location so we can show you the weather for our location'
                  }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  //To Check, If Permission is granted
                  callLocation();
                } else {
                  alert("Permission Denied");
                }
              } catch (err) {
                alert("err",err);
                console.warn(err)
              }
            }
            requestLocationPermission();
          } 

        return Geolocation.clearWatch(watchId);
    }, [reload.current])

    const callLocation = () => {
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
               setLocation({
                   ...location,
                   currentLongitude:currentLongitude,
                   currentLatitude:currentLatitude 
                });
                getWeatherDetails(currentLatitude, currentLongitude)
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );

          setWatchId(Geolocation.watchPosition((position) => {
              console.log(position);
              const currentLongitude = JSON.stringify(position.coords.longitude);
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
              setLocation({
                ...location,
                currentLongitude:currentLongitude,
                currentLatitude:currentLatitude 
             });
          }));

          console.log(location, watchId)
       }

       const getWeatherDetails = (lat, lon) => {
           console.log(lat, lon)
           api.get(`weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then(response => {
                console.log(response.data)
                setDetails({
                    location: response.data.name
                })
                setWeather({
                    ...weather,
                    location: response.data.name,
                    cloud: response.data.weather[0].main,
                    temperature: response.data.main.temp,
                })
                
            })
            .catch(err => {
                console.log(err?.response)
            })
       }
       const getByLocation = (city) => {
        api.get(`weather?q=${city}&appid=${API_KEY}`)
        .then(response => {
            setLocation({
                currentLatitude: response.data.coord.lat,
                currentLongitude: response.data.coord.lon
            })

            setWeather({
                ...weather,
                location: response.data.name,
                cloud: response.data.weather[0].main,
                temperature: response.data.main.temp,
            })
            console.log(response.data)
        })
        .catch(err => {
            console.log(err?.response)
        })
       }

       const getInArea = (lat, lon) => {
        api.get(`/find?lat=${lat}&lon=${lon}&cnt=10&appid=${API_KEY}`)
        .then(response => {
            setMoreLocations(response.data.list)
            console.log(response)
        })
        .catch(err => {
            console.log(err?.response)
        })
       }


    let [fontsLoaded] = useFonts({
        'Montserrat': require('../assets/fonts/Montserrat-Bold.otf'),
        'MontserratReg': require('../assets/fonts/Montserrat-Regular.otf'),
        'MontserratLight': require('../assets/fonts/Montserrat-Light.otf'),
      });

      if (!fontsLoaded) {
        return <View></View>;
      } else {
        return(
            <View style={styles.container}>
                        <View style={styles.bg}>
                            <View style={styles.header}>
                                <LocInfo />
                                <TouchableHighlight onPress={() => {triggerReload()}}><View><Reload style={styles.notif}/></View></TouchableHighlight> 
                            </View>
                            <View style={styles.details}>
                                <View style={[styles.cloud]}>
                                    <Text style={[styles.mainCloudText, styles.white]}>
                                        {weather.cloud}
                                    </Text>
                                </View>
                                <View style={[styles.mainLoc]}>
                                    <Text style={[styles.mainLocText, styles.white]}>{weather.temperature}</Text>
                                    <MaterialCommunityIcons
                                    size={72}
                                    name={weatherConditions[weather.cloud].icon}
                                    color={'#fff'}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.board}>
                            <View style={[styles.card, styles.overlay, styles.smHeight, styles.input]}>
                            <TextInput
                                style={{height: 50, width: '90%', borderWidth: 4,borderRadius: 10, padding: 10, borderColor: '#e8e8e8',}}
                                placeholder="enter location!"
                                onChangeText={text => setText(text)}
                                defaultValue={text}
                            />
                            <View style={styles.buttonStyle}><Button color='#10B8ED' title='Submit' onPress={() => handleSubmit()}></Button></View>
                            </View>
                            <SafeAreaView style={styles.container} style={[styles.card, styles.lgHeight]}>
                                <FlatList
                                    data={moreLocations}
                                    renderItem={({ item }) => <EachLoc weatherInfo={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </SafeAreaView>
                        </View>
            </View>
        )
    }
}