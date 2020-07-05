import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';


const styles = StyleSheet.create({
    card:{
        backgroundColor: '#10B8ED',
        borderRadius: 4,
        padding: 15,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circle: {
        borderRadius: 120,
        height: 40,
        width: 40,
        backgroundColor: '#FFFFFF'
    },
    cloudText: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#FFFFFF',
    },
    timeBox: {
        height: 70,
        width: 70,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontWeight: 'bold',
        color: '#10B8ED',
        fontSize: 20,
    }
})

const CloudCard = ({details}) => {
    console.log(details)
    const formatHrs = (dateStr) => {
        const date = new Date(dateStr)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes 
        return strTime;
    }
    
  return(
      <>
        <View style={styles.card}>
           <View>
              <Text style={styles.cloudText}>{details.weather[0].description}</Text>
              <Image
        style={styles.circle}
        source={{
          uri: `http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`,
        }}
      />
           </View>
           <View>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{formatHrs(details.dt)}</Text>
                </View>
           </View>
        </View>
     </>
  )
}

export default CloudCard;