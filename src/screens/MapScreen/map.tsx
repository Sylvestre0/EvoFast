// import React, { useEffect, useState } from 'react';
// import { View, Text,  Image, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { styles } from './mapStyle';

// export default function MapScreen() {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permissão negada', 'Não foi possível acessar a localização');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {userLocation ? (
//         <MapView style={styles.map} initialRegion={userLocation} showsUserLocation>
//           <Marker
//             coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
//             title="Evento"
//             description="Local do evento"
//           >
//             <View style={styles.markerContainer}>
//               <Image
//                 source={require('@/assets/images/Logo.png')}
//                 style={styles.markerImage}
//               />
//             </View>
//           </Marker>
//         </MapView>
//       ) : (
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Carregando mapa...</Text>
//         </View>
//       )}
//     </View>
//   );
// }

