import { StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Weather from './composant/Weather'; 
import Forecast from './composant/Forecast';


export default function App() {
 //const [location, setLocation] = useState(null);
 const [errorMsg, setErrorMsg] = useState(null);
  const API_KEY= "15626f454139e8469b3dad9c96994f02";
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [icone, setIcone] = useState(null);
  const [previsions, setPrevisions] = useState([]);
  const [joursDisponibles, setJoursDisponibles] = useState([]);
  const [jourSelectionne, setJourSelectionne] = useState(null);
  const [ville, setVille] = useState(null);


  useEffect(() => {
    // Demande d'acces à la loc de l'utilisateur
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission refusée pour accéder à la position');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location.coords);

      // Url des API
      const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&lang=fr&units=metric`
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&lang=fr&units=metric`;

      // Météo actuelle
       fetch(weather)
        .then(response => response.json())
        .then(data => {
          setTemperature(data.main.temp); 
          setIcone(data.weather[0].icon); 
          setDescription(data.weather[0].description); 
          setVille(data.name);
        })
        .catch(error => console.error('Erreur météo actuelle :', error));

      // prévisions
      fetch(forecast)
        .then(response => response.json())
        .then(data => {
          setPrevisions(data.list);
          // Extraire les jours uniques
          const jours = [...new Set(data.list.map(item => item.dt_txt.split(' ')[0]))];
          setJoursDisponibles(jours);
          setJourSelectionne(jours[0]); // prend le premier jour par défaut
        })
        .catch(error => console.error('Erreur prévisions :', error));
    })();
  }, []);

  // Filtrer les prévisions du jour sélectionné
  const previsionsDuJour = previsions.filter(item => item.dt_txt.startsWith(jourSelectionne));

  // jour au format ecrit
  const formatJour = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };














  return (
     


    <ScrollView style={styles.container}>


      {/*{errorMsg ? (
        <Text style={styles.erreur}>{errorMsg}</Text>
      ) : location ? (
        <Text style={styles.position}>Latitude : {location.latitude}, Longitude : {location.longitude}</Text>
      ) : (
        <Text style={styles.chargement}>Chargement de la position...</Text>
      )}*/}

      

   {temperature && description && (
   
   <Weather temperature={temperature} description={description} icone={icone} ville={ville} /> 
   )}


      {/*  Appel composant Forecast */}
      <Forecast joursDisponibles={joursDisponibles} jourSelectionne={jourSelectionne}
       setJourSelectionne={setJourSelectionne}previsionsDuJour={previsionsDuJour} 
       formatJour={formatJour} />
    </ScrollView>
    


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  erreur: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  position: {
    fontSize: 16,
    textAlign: 'center', 
  },
  chargement: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  


});