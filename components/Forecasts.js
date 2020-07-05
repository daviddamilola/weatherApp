import * as React from 'react';
import { Text, Button, StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import FadeInView from '../FadeInView';
import CloudCard from '../components/CloudCard';
import axios from 'axios';
import { API_KEY} from 'react-native-dotenv';
import useAppContext from '../AppContext';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
    }
});

 const Forecasts = ({navigation}) => {
    const {location, setForecasts, hours, setHours} = useAppContext();

    const [currHours, setCurrHours] = React.useState([])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(hours.length > 1){
               setCurrHours(hours)
            }
        });
    
        return unsubscribe;
      }, [navigation, hours]);

      

    return(
      <SafeAreaView style={styles.container}>
          {currHours.length > 0 ? 
            <FlatList
                data={currHours}
                renderItem={({item, index}) => <CloudCard key={index} details={item}/>}
            />:
            <></>
        }
    </SafeAreaView>
    )
  }

  export default Forecasts;