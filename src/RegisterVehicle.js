import {
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
  Alert,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import {FormBuilder} from 'react-native-paper-form-builder';
export default function RegisterVehicle({navigation}) {
  const [reg, setReg] = useState('');
  const [model, SetModel] = useState('');
  const [phone, setPhone] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Petrol', value: 'Petrol'},
    {label: 'Diesel', value: 'Diesel'},
    {label: 'CNG', value: 'CNG'},
  ]);
  const cars = [
    {
      key: 0,
      carName: 'STV-07-1841',
      Model: 'Honda CD-70',
      fuelAverage: 50,
      fuelType: 'Petrol',
    },
    {
      key: 1,
      carName: 'STU-06-7544',
      Model: 'Toyota Corolla Altis',
      fuelAverage: 12,
      fuelType: 'Petrol',
    },
  ];

  const Item = ({title, Model, avg, type}) => (
    <Pressable style={styles.FlatList} onPress={()=>{
      navigation.navigate("Dashboard");
    }}>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.6
        }}>
        <Text style={styles.flatTitle}>{title}</Text>
        <Text style={{fontSize: 20, marginBottom:5, paddingLeft: 10, color: 'black', fontFamily: 'Poppins-Regular', marginTop: -10}}>{Model}</Text>
      </View>
      <View style={styles.FlatView}>
        <Text style={{marginBottom: 5, color: 'black', fontFamily: 'Poppins-Regular'}}>Fuel Average: {avg}</Text>
        <Text style={{marginBottom:5, color: 'black', fontFamily: 'Poppins-Regular'}}>Fuel Type: {type}</Text>
      </View>
    </Pressable>
  );

  const renderItem = ({item}) => (
    <Item
      title={item.carName}
      Model={item.Model}
      avg={item.fuelAverage}
      type={item.fuelType}
    />
  );
  const onPressS = () => {
    if (
      (name != '') &
      (email != '') &
      (phone != '') &
      (password != '') &
      (confirmPassword != '')
    ) {
      if (password == confirmPassword) {
        setWaiting(true);
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            firestore()
              .collection('User')
              .doc(email)
              .set({
                Name: name,
                Email: email,
                Number: phone,
                CNIC: cnic,
              })
              .then(() => {
                setWaiting(false);
                navigation.navigate('Dashboard');
                console.log('User added!');
              });
            setWaiting(false);
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setWaiting(false);
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setWaiting(false);
              console.log('That email address is invalid!');
            }
            if (error.code === 'auth/network-request-failed') {
              setWaiting(false);
              Alert.alert('Please check your Internet Connection!');
            }
            setWaiting(false);
            console.error(error);
          });
      } else {
        Alert.alert('Passwords Dont Match!');
      }
    } else {
      Alert.alert('Please Enter Data in All the Fields!');
    }
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardShouldPersistTaps="handled">
      {!waiting && (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.TitleView}>
            <Text style={styles.title}>Register New Vehicle!</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.InputTitle}>
              Please Input Data in All the Fields
            </Text>
            <TextInput
              placeholder="Vehicle Registeration Number"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setReg(i);
              }}
            />

            {/* <Text style={styles.InputTitle}>Email Address</Text> */}
            <TextInput
              placeholder="Vehicle Model Name"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                SetEmail(i);
              }}
            />
            <TextInput
              placeholder="Fuel Average (Km/Litre)"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setPhone(i);
              }}
            />
            {/* <Text style={styles.InputTitle}>CNIC / Form - B Number</Text> */}

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <View style={styles.ButtonSection}>
              <Pressable
                onPress={onPressS}
                android_ripple={{color: '#ffffff', borderRadius: 10}}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={styles.Button}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                  }}>
                  ADD VEHICLE
                </Text>
              </Pressable>
            </View>
            <Text style={(styles.title1)}>REGISTERED VEHICLES</Text>
            <Text style={styles.InputTitle}>
              Tap on the Vehicle to Edit
            </Text>
            <FlatList
              data={cars}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      )}
      {waiting && <Loader></Loader>}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  title1: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
    margin: -10
  },
  TitleView: {
    //backgroundColor: 'black',
    height: 100,
    justifyContent: 'center',
    zIndex: 1,
  },
  eye: {
    height: 50,
    position: 'absolute',
    right: 15,
    top: 10,
  },
  body: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    zIndex: 0,
  },
  Button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  ButtonSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 40,
  },
  InputTitle: {
    fontSize: 15,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'black',
  },
  inputPass: {
    borderWidth: 1,
    width: '80%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  FlatList: {
    borderColor: 'red',
    borderWidth: 2,
    paddingVertical: 2,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
    flex: 1,
  },
  flatTitle: {
    fontSize: 25,
    color: 'red',
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
    paddingTop: 5

  },
  FlatView: {
    flexDirection: 'column',
    flex: 0.4,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 16
  },
});
