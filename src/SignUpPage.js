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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import {FormBuilder} from 'react-native-paper-form-builder';
export default function SignUpPage({navigation}) {
  const [name, setName] = useState('');
  const [email, SetEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();
  const [cnic, setCnic] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const onPressShowPass = () => {
    if (hidePass == true) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
  };
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
    <ScrollView>
      {!waiting && (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.TitleView}>
            <Text style={styles.title}>SIGN UP FOR FREE!</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.InputTitle}>
              Please Input Data in All the Fields
            </Text>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setName(i);
              }}
            />

            {/* <Text style={styles.InputTitle}>Email Address</Text> */}
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                SetEmail(i);
              }}
            />
            <TextInput
            keyboardType= 'numeric'
              placeholder="Phone Number"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setPhone(i);
              }}
            />
            {/* <Text style={styles.InputTitle}>CNIC / Form - B Number</Text> */}
            <TextInput
              placeholder="CNIC / Passport Number"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setCnic(i);
              }}
            />

            {/* <Text style={styles.InputTitle}>Confirm Password</Text> */}
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#000"
                style={styles.input}
                onChangeText={i => {
                  setConfirmPassword(i);
                }}
                secureTextEntry={hidePass}
              />
              <Pressable style={styles.eye} onPress={onPressShowPass}>
                <Icon
                  name={!hidePass ? 'eye' : 'eyeo'}
                  size={30}
                  color="#000000"
                />
              </Pressable>
            </View>
            {/* <Text style={styles.InputTitle}>Password</Text> */}
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={i => {
                setPassword(i);
              }}
              secureTextEntry={hidePass}
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
                  SIGN UP!
                </Text>
              </Pressable>
              <Text style={{margin: 10}}>Already have an Account?</Text>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                android_ripple={{color: '#ffffff', borderRadius: 50}}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                style={styles.Button}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                  }}>
                  LOG IN NOW!
                </Text>
              </Pressable>
            </View>
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
    fontFamily: 'Poppins-Italic',
  },
  inputPass: {
    borderWidth: 1,
    width: '80%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
