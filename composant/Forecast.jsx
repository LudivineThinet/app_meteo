import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import JourChoisi from './JourChoisi';

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
      <JourChoisi previsionsDuJour={previsionsDuJour} />


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
});

export default Forecast;

