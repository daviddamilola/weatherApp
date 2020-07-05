import React, { createContext, useState, useContext} from 'react';

const AppContext = createContext({});

export const AppProvider = ({children}) => {

    const [headerDetails, setHeaderDetails] = useState({
        location: 'Lagos',
        time: '',
        date: '',
        notifications: [],
    })

    const [location, setLocation] = React.useState({
        currentLongitude: null,//Initial Longitude
        currentLatitude: null,//Initial Latitude
    })

    const [moreLocations, setMoreLocations] = React.useState([])

    const [watchId, setWatchId] = React.useState(null);

    const [forecasts, setForecasts] = React.useState({});

    const [hours, setHours] = React.useState([])

    const [weather, setWeather] = React.useState({
        location: 'lagos',
        temperature: '20f',
        cloud: 'Rain',
        time: new Date().getUTCFullYear(),
    })

    const setDetails = (newDetails={}) => {
        setHeaderDetails({...headerDetails, ...newDetails})
    }

    return (
        <AppContext.Provider value={{headerDetails, setDetails, location, setLocation, moreLocations, setMoreLocations, watchId, setWatchId, weather, setWeather, forecasts, setForecasts, hours, setHours}}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppContext() {
    const context = useContext(AppContext)

    return context
};