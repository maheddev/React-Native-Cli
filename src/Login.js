import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Loader from './Loader';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [waiting, setWaiting] = useState(false);
  const Data = {
    mail: email,
    pass: password,
  };
  const loginState = data => {};
  const LoginButtonPressed = () => {
    setWaiting(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        setWaiting(false);
        navigation.navigate('dashboard');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setWaiting(false);
          Alert.alert('Password Invalid!');
        }

        if (error.code === 'auth/invalid-email') {
          setWaiting(false);
          Alert.alert('That email address is invalid!');
        }
        if (error.code === 'auth/network-request-failed') {
          setWaiting(false);
          Alert.alert('Please check your Internet Connection!');
        }
        setWaiting(false);
        console.log(error);
      });
  };

  const SignUpButtonPressed = () => {
    navigation.navigate('SignUpPage');
  };

  return (
    <ScrollView style ={{backgroundColor: '#f5f0d7'}}>
      {!waiting && (
        <View style={styles.MainView}>
          <View style={styles.TopText}>
            <Image
              style={styles.image}
              source={require("../assets/icon.png")}
            />
            <Text style={styles.tagline}>
              Please Log In to your Account to Continue!
            </Text>
          </View>
          <View style={styles.InputSection}>
            {/* <Text style={styles.InputTitle}>Email Address</Text> */}
            <TextInput
            placeholder='Email Address'
              style={styles.TextInput}
              onChangeText={mail => setEmail(mail)}
            />
            {/* <Text style={styles.InputTitle}>Password</Text> */}
            <TextInput
              placeholder='Password'
              style={styles.TextInput}
              secureTextEntry={true}
              onChangeText={pass => setPassword(pass)}
            />
          </View>
          <View style={styles.ButtonsSection}>
            <Pressable onPress={LoginButtonPressed} style={styles.Pressable}>
              <Text style={styles.PressableText}>Sign In!</Text>
            </Pressable>
            <Text style={styles.text}>Haven't Registered Yet?</Text>
            <Pressable onPress={SignUpButtonPressed} style={styles.Pressable}>
              <Text style={styles.PressableText}>Sign Up!</Text>
            </Pressable>
          </View>
        </View>
      )}

      {waiting && <Loader></Loader>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  TextInput: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  Pressable: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  InputSection: {
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 20,
  },
  PressableText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  TopText: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  Tilte: {
    fontSize: 40,
    color: 'black',
  },
  tagline: {
    color: 'grey',
  },
  ButtonsSection: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  InputTitle: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
  },
  text: {
    textAlign: 'center',
    margin: 10,
  },
});
export default Login;
