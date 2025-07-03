import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';






const JourChoisi = ({ previsionsDuJour }) => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.previsionsContainer}>
      {previsionsDuJour.map((item, index) => {
        const heure = item.dt_txt.split(' ')[1].slice(0, 5);
        return (
          <View key={index} style={styles.cartePrevision}>
            <Text style={styles.heure}>{heure}</Text>

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
  );
};

const styles = StyleSheet.create({
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
});

export default JourChoisi;
