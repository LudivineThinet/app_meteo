import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const Forecast = ({ joursDisponibles, jourSelectionne, setJourSelectionne, previsionsDuJour, formatJour }) => {
  return (
    <View>
      {/* choix du jour */}
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
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.texte}>{item.main.temp} °C</Text>
                <Text style={styles.texte}>{item.weather[0].description}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listeJours: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    gap: 10,
  },
  boutonJour: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boutonJourActif: {
    borderColor: '#000',
    borderWidth: 2,
  },
  texteJour: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#333',
    flexWrap: 'wrap',
  },
  previsionsContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    gap: 15,
    justifyContent: 'center',
  },
  cartePrevision: {
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 100,
  },
  heure: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  texte: {
    fontSize: 14,
    textAlign: 'center',
  },
})

    

export default Forecast;
