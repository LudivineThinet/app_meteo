import { StyleSheet, Text, ScrollView } from 'react-native';
import Weather from './composant/Weather'; 
import Forecast from './composant/Forecast';
import useWeather from './hooks/useweather';  



export default function App() {
  const {
    errorMsg,
    temperature,
    description,
    icone,
    ville,
    joursDisponibles,
    jourSelectionne,
    setJourSelectionne,
    previsionsDuJour,
    formatJour,
  } = useWeather();

  return (
    <ScrollView style={styles.container}>
      {errorMsg && <Text style={styles.erreur}>{errorMsg}</Text>}

      {temperature && description && (
        <Weather 
          temperature={temperature} 
          description={description} 
          icone={icone} 
          ville={ville} 
        />
      )}

      <Forecast 
        joursDisponibles={joursDisponibles} 
        jourSelectionne={jourSelectionne}
        setJourSelectionne={setJourSelectionne}
        previsionsDuJour={previsionsDuJour} 
        formatJour={formatJour} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
