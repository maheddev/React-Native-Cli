import {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dashboard({navigation}) {
  const [stateD, setState] = useState({
    currentLoc: {},
    destLoc: {},
  });
  const {currentLoc, destLoc} = stateD;
  const [Average, setAverage] = useState();
  const [price, setPrice] = useState();
  const [Expense, setExpense] = useState('....');

  function fetchCurrent(lati, lngi) {
    setState({
      ...stateD,
      currentLoc: {
        latitude: lati,
        longitude: lngi,
      },
    });
  }
  const fetchDest = (latD, lngD) => {
    setState({
      ...stateD,
      destLoc: {
        latitude: latD,
        longitude: lngD,
      },
    });
  };

  const onPressh = () => {
    console.log(currentLoc);
    navigation.navigate('Maps', {
      currentLoc: currentLoc,
      destLoc: destLoc,
      // Average: Average,
      Average: 30,
      //price: price,
      price: 220
    });
  };
  const addVehicle = () => {
    navigation.navigate('RegisterVehicle');
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Petrol', value: 'Petrol'},
    {label: 'Diesel', value: 'Diesel'},
    {label: 'CNG', value: 'CNG'},
  ]);

  return (
    <ScrollView
      contentContainerStyle={styles.mainScrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.View1}>
        <Pressable
          onPress={addVehicle}
          android_ripple={{color: '#ffffff', borderRadius: 10}}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          style={styles.pressable}>
          <Text style={styles.pressableText}>Add New Vehicle</Text>
        </Pressable>
        <GooglePlacesAutocomplete
          placeholder="Current Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const latC = details.geometry.location.lat.toString();
            const lngC = details.geometry.location.lng.toString();
            fetchCurrent(latC, lngC);
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 50,
              borderColor: '#000000',
              borderWidth: 2,
              color: 'black',
              borderRadius: 10,
              marginBottom: 10,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: 'AIzaSyDbfbWiIvjK79U_aI8urPCbcxcMWEVirW4',
            language: 'en',
          }}
        />

        {/* <Text style={styles.Text1}>Destination</Text> */}
        <GooglePlacesAutocomplete
          placeholder="Destination"
          fetchDetails={true}
          onPress={(data, details) => {
            const lat = details.geometry.location.lat.toString();
            const lng = details.geometry.location.lng.toString();
            fetchDest(lat, lng);
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 50,
              borderColor: '#000000',
              borderWidth: 2,
              color: 'black',
              borderRadius: 10,
              marginBottom: 10,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: 'AIzaSyDbfbWiIvjK79U_aI8urPCbcxcMWEVirW4',
            language: 'en',
          }}
        />
        <DropDownPicker
          placeholder="Please Select the Vehicle"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 2,
            height: 50,
          }}
        />
        <Pressable
          onPress={onPressh}
          android_ripple={{color: '#ffffff', borderRadius: 10}}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          style={styles.pressable}>
          <Text style={styles.pressableText}>CALCULATE EXPENESE!</Text>
        </Pressable>
      </View>
      <View style={styles.button1}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainScrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    flex: 0.1,
    backgroundColor: '#4270b1',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  View1: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 130,
    marginBottom: 20,
  },
  Text1: {
    fontSize: 20,
    color: '#4270b1',
    marginTop: 20,
  },
  Text2: {
    fontSize: 20,
    color: '#4270b1',
    marginVertical: 20,
  },
  button1: {
    flex: 0.2,
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: 'white',
    width: '100%',
    marginbottom: 20,
    borderColor: '#4270b1',
    borderBottomWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  pressable: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  pressableText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
