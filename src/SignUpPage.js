import {
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import Loader from './Loader';
export default function SignUpPage({navigation}) {
  const [name, setName] = useState('');
  const [email, SetEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();
  const [cnic, setCnic] = useState('');
  const [waiting, setWaiting] = useState(false);

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
                navigation.navigate('dashboard');
                setWaiting(false);
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
    }
      else
      {
        Alert.alert('Please Enter Data in All the Fields!');
      } 
  };
  return (
    <ScrollView style={{backgroundColor: '#f5f0d7'}}>
      {!waiting && (
        <View style={{flex: 1}}>
          <View style={styles.TitleView}>
            <Text style={styles.title}>SIGN UP FOR FREE!</Text>
          </View>
          <View style={styles.body}>
            {/* <Text style={styles.InputTitle}>Full Name</Text> */}
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              onChangeText={i => {
                setName(i);
              }}
            />

            {/* <Text style={styles.InputTitle}>Email Address</Text> */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              onChangeText={i => {
                SetEmail(i);
              }}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              onChangeText={i => {
                setPhone(i);
              }}
            />
            {/* <Text style={styles.InputTitle}>CNIC / Form - B Number</Text> */}
            <TextInput
              placeholder="CNIC / Passport Number"
              style={styles.input}
              onChangeText={i => {
                setCnic(i);
              }}
            />
            {/* <Text style={styles.InputTitle}>Password</Text> */}
            <TextInput
              placeholder=" Password"
              style={styles.input}
              onChangeText={i => {
                setPassword(i);
              }}
            />
            {/* <Text style={styles.InputTitle}>Confirm Password</Text> */}
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              onChangeText={i => {
                setConfirmPassword(i);
              }}
            />
            <View style={styles.ButtonSection}>
            <Pressable
              onPress={onPressS}
              android_ripple={{color: '#ffffff', borderRadius: 10}}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              style={styles.Button}>
              <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
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
              <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
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
  TitleView: {
    backgroundColor: 'black',
  },
  body: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'center',
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
  },
  InputTitle: {
    fontSize: 15,
    color: 'black',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
