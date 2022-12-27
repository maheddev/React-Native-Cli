import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Maps({route, navigation}) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDbfbWiIvjK79U_aI8urPCbcxcMWEVirW4';
  const mapRef = useRef();
  //const { currentLoc, destLoc, Average, price } = route.params;
  const currentLoc = {latitude: '31.4296798', longitude: '74.2304474'};
  const Average = 30;
  const price = 221;
  const destLoc = {latitude: '32.4945', longitude: '74.5229'};
  const [Expense, setExpense] = useState();
  const [Distance, setDistane] = useState();
  console.log(parseFloat(currentLoc.latitude));
  console.log(destLoc);
  console.log(Average);
  console.log(Distance);
  console.log('Price = ', price);
  useEffect(() => {
    const currentLoc = {latitude: '31.4296798', longitude: '74.2304474'};
    const Average = 30;
    const price = 221;
    const destLoc = {latitude: '32.4945', longitude: '74.5229'};
    var one;
    one = (Distance / Average) * price;
    setExpense(Math.round(one).toFixed(2));
    console.log('Ones', one);
  });
  console.log(Expense);
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', top: 10, zIndex: 1, left: 8}}>
        <Pressable
          onPress={() => {
            navigation.navigate("Dashboard");
          }}>
          <Icon name="arrow-back-circle" size={40} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.Mapmain}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: parseFloat(currentLoc.latitude),
            longitude: parseFloat(currentLoc.longitude),
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
            strokeColor="green"
            strokeWidth={5}
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
