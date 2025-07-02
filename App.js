import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_KEY= "15626f454139e8469b3dad9c96994f02";
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [icone, setIcone] = useState(null);
  const [previsions, setPrevisions] = useState([]);
  const [joursDisponibles, setJoursDisponibles] = useState([]);
  const [jourSelectionne, setJourSelectionne] = useState(null);

  useEffect(() => {
    // Demande d'acces à la loc de l'utilisateur
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission refusée pour accéder à la position');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Url des API
      const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&lang=fr&units=metric`;
      const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&lang=fr&units=metric`;

      // météo actuelle
      fetch(weather)
        .then(response => response.json())
        .then(data => {
          setTemperature(data.main.temp); 
          setIcone(data.weather[0].icon); 
          setDescription(data.weather[0].description); 
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

  // Format jour lisible
  const formatJour = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };









  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      {errorMsg ? (
        <Text style={styles.erreur}>{errorMsg}</Text>
      ) : location ? (
        <Text style={styles.position}>Latitude : {location.latitude}, Longitude : {location.longitude}</Text>
      ) : (
        <Text style={styles.chargement}>Chargement de la position...</Text>
      )}

      {temperature && (
        <View style={styles.blocActuel}>
          <Text style={styles.titre}>Météo actuelle :</Text>
          <Text style={styles.texte}>Température : {temperature} °C</Text>
          <Text style={styles.texte}>Météo : {description}</Text>

          {/* Affichage de l'icone, laisse le style ici */}
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${icone}@2x.png` }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      )}

        {/* A partir d'ici, prévisions */}
      <ScrollView horizontal contentContainerStyle={styles.listeJours}>
        {joursDisponibles.map((jour, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.boutonJour,
              jour === jourSelectionne && styles.boutonJourActif
            ]}
            onPress={() => setJourSelectionne(jour)}
          >
            <Text style={styles.texteJour}>{formatJour(jour)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Prévisions du jour choisi */}
      {previsionsDuJour.length > 0 && (
        <ScrollView horizontal contentContainerStyle={styles.previsionsContainer}>
          {previsionsDuJour.map((item, index) => {
            const heure = item.dt_txt.split(' ')[1].slice(0, 5);
            return (
              <View key={index} style={styles.cartePrevision}>
                <Text style={styles.heure}>{heure}</Text>

                {/* Affichage de l'icone, laisse le style ici */}
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                  style={{ width: 50, height: 50 }}/>
                <Text style={styles.texte}>{item.main.temp} °C</Text>
                <Text style={styles.texte}>{item.weather[0].description}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
container: {
  marginTop: 50,
},
});