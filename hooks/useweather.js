import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useWeather() {
  const API_KEY= "15626f454139e8469b3dad9c96994f02";
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [icone, setIcone] = useState(null);
  const [ville, setVille] = useState(null);
  const [previsions, setPrevisions] = useState([]);
  const [joursDisponibles, setJoursDisponibles] = useState([]);
  const [jourSelectionne, setJourSelectionne] = useState(null);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
    .then(({ status }) => {
      if (status !== 'granted') {
        setErrorMsg('Permission refusée pour accéder à la position');
        return Promise.reject('Permission refusée');
      }
      return Location.getCurrentPositionAsync({});
    })
    .then(location => {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`;

      fetch(weatherUrl)
      .then(res => res.json())
      .then(data => {
        setTemperature(data.main.temp);
        setDescription(data.weather[0].description);
        setIcone(data.weather[0].icon);
        setVille(data.name);
      })
      .catch(err => console.error('Erreur météo actuelle :', err));

      fetch(forecastUrl)
      .then(res => res.json())
      .then(data => {
        setPrevisions(data.list);
        const jours = [...new Set(data.list.map(item => item.dt_txt.split(' ')[0]))];
        setJoursDisponibles(jours);
        setJourSelectionne(jours[0]);
      })
      .catch(err => console.error('Erreur prévisions :', err));

    })
    .catch(err => {
      if (err !== 'Permission refusée') console.error(err);
    });
  }, []);

  const previsionsDuJour = previsions.filter(item => item.dt_txt.startsWith(jourSelectionne));

  const formatJour = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return {
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
  };
}
