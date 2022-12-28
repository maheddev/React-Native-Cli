import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import GetLocation from 'react-native-get-location';
import MateriaIcons from 'react-native-vector-icons/MaterialIcons';
export default function Maps({route, navigation}) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDbfbWiIvjK79U_aI8urPCbcxcMWEVirW4';
  const mapRef = useRef();
  const {currentLoc, destLoc, Average, price} = route.params;
  const [Expense, setExpense] = useState();
  const [Distance, setDistane] = useState();
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);
  const [originL, setOL] = useState(parseFloat(currentLoc.latitude));
  const [originA, setOA] = useState(parseFloat(destLoc.longitude));
  const [isLP, setLP] = useState(false);
  const [P, setP] = useState(true);
  const [func, setFunc] = useState('standard');
  console.log(parseFloat(currentLoc.latitude));
  console.log(destLoc);
  console.log(Average);
  console.log(Distance);
  console.log('Price = ', price);
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
  })
    .then(location => {
      setCurrentLat(location.latitude);
      setCurrentLong(location.longitude);
      console.log(
        'your Latitude is: ' +
          currentLat +
          ' Your Longitude is: ' +
          currentLong,
      );
      //console.log(location)
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  // onLocatioPress = () => {
  //   setLP(!LP)
  //   console.log("LP is "+isLP)
  //   if (isLP) {
  //     setOL(currentLat);
  //     setOA(currentLong);
  //   } else {
  //     setOL(parseFloat(currentLoc.latitude));
  //     setOA(parseFloat(destLoc.longitude));
  //   }
  // };
  useEffect(() => {
    const Average = 30;
    const price = 221;
    var one;
    one = (Distance / Average) * price;
    setExpense(Math.round(one).toFixed(2));
    console.log('Ones', one);
  });
  console.log('Current Location of the User is: ' + currentLat);
  console.log(Expense);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: 10, zIndex: 1, left: 8}}>
        <Pressable
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Icon name="arrow-back-circle" size={40} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.Mapmain}>
        <MapView
          mapType={func}
          showsTraffic={true}
          ref={mapRef}
          Region={{
            latitude: originL,
            longitude: originA,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: parseFloat(currentLoc.latitude),
              longitude: parseFloat(currentLoc.longitude),
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
          />
          <Marker
            coordinate={{
              latitude: parseFloat(destLoc.latitude),
              longitude: parseFloat(destLoc.longitude),
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
          />
          <Marker
            coordinate={{
              latitude: currentLat,
              longitude: currentLong,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}>
            <Icon size={30} name="location" color="Blue" />
          </Marker>
          <MapViewDirections
            origin={{
              latitude: parseFloat(currentLoc.latitude),
              longitude: parseFloat(currentLoc.longitude),
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
            destination={{
              latitude: parseFloat(destLoc.latitude),
              longitude: parseFloat(destLoc.longitude),
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="red"
            strokeWidth={2}
            optimizeWaypoints={true}
            onReady={result => {
              setDistane(result.distance);
              console.log(`Distance: ${result.distance} km`);
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 30,
                  bottom: 300,
                  left: 30,
                  right: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <View style={{position: 'absolute', bottom: 100, zIndex: 1, right: 8}}>
        <Pressable onPress={() => {
          if (P == true) {
            setP(false);
            setFunc("satellite")
          }
          else{
            setP(true);
            setFunc("standard")
          }
        }}>
          <Icon name={P? "earth-outline": "earth"} size={40} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.DataView}>
        <Text style={styles.Text2}>Fuel Expense: Rs. {Expense}</Text>
        {/* <Text style={styles.Text2}>
          Expense (Round Trip): Rs. {Math.round(Expense * 2).toFixed(2)}
        </Text> */}
        <Text style={styles.Text2}>
          Distance: {Math.round(Distance).toFixed(1)} Kms
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Mapmain: {
    flexDirection: 'column-reverse',
    borderTopWidth: 12,
    // borderTopWidth: 100,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: 100,
  },
  Text2: {
    fontSize: 20,
    marginBottom: 2,
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
  },
  DataView: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
    paddingVertical: 5,
    width: '95%',
    borderRadius: 10,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 5,
    position: 'absolute',
    bottom: 2,
  },
});
