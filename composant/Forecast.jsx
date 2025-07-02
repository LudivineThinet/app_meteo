import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const Forecast = ({ joursDisponibles, jourSelectionne, setJourSelectionne, previsionsDuJour, formatJour, styles }) => {
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
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    boutonJour: {
        padding: 10,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    boutonJourActif: {
        backgroundColor: '#007bff',
    },
    texteJour: {
        color: '#333',
    },
    previsionsContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    cartePrevision: {
        marginRight: 10,
        alignItems: 'center',
    },
    heure: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    texte: {
        textAlign: 'center',
    }
    });     

export default Forecast;
