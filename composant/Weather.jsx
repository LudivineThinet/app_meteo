import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

const getBackgroundImage = (description) => {
  if (!description) return require('../assets/default.jpg'); 
  if (description.includes('ciel dégagé')) return require('../assets/soleil.jpg');
  if (description.includes('fragmentés')) return require('../assets/nuageux.jpg');
  if (description.includes('pluie')) return require('../assets/pluie.jpg');
  if (description.includes('orage')) return require('../assets/orage.jpg');
  if (description.includes('neige')) return require('../assets/neige.jpg');
  if (description.includes('quelques')) return require('../assets/fewClouds.jpg');

  return require('../assets/default.jpg');
};



// météo actuelle
const Weather = ({ temperature, description, icone, ville }) => {

  console.log(" getbackgroundImage(description) : ", getBackgroundImage(description));

  console.log("temperature : ", temperature);

  return (
    
    <View>
     <ImageBackground
      source={getBackgroundImage(description)}
      style={styles.weatherBackground}
      imageStyle={{ borderRadius: 10 }}>
      {temperature && (
        <View style={styles.container}>
             <Text style={styles.titre}>
          {ville ? `Météo à ${ville}` : 'Météo actuelle :'}</Text>
            <Text style={styles.texte}>Température : {temperature} °C</Text>
            <Text style={styles.texte}>Météo : {description}</Text>

            {/* Affichage de l'icone, laisse le style ici */}
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${icone}@2x.png` }}
              style={{ width: 50, height: 50 }}
            />
            
          </View>
      )}
     </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texte: {
    fontSize: 16,
    marginBottom: 5,
  },
  weatherBackground: {
  marginTop: 20,
  borderRadius: 10,
  overflow: 'hidden',
},
}); 

export default Weather;
