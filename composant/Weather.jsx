import { StyleSheet, Text, View, Image } from 'react-native';

// météo actuelle
const Weather = ({ temperature, description, icone }) => {
  return (
    <View>
      {temperature && (
        <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
}); 

export default Weather;
