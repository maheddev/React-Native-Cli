import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Dashboard from './dashboard';

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
        setWaiting(false);
        console.log(error);
      });
  };

  const SignUpButtonPressed = () => {
    
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('User')
          .doc(email)
          .set({
            Name: 'Ahmad',
            Age: 20,
            Email: email
          })
          .then(() => {
            console.log('User added!');
          })

        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.MainView}>
      {!waiting && (
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Your E-mail Here!"
            onChangeText={mail => setEmail(mail)}
          />

          <TextInput
            style={styles.TextInput}
            placeholder="Your Password here!"
            secureTextEntry={true}
            onChangeText={pass => setPassword(pass)}
          />
          <TouchableOpacity
            onPress={LoginButtonPressed}
            style={styles.Pressable}>
            <Text style={styles.PressableText}>Sign In!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SignUpButtonPressed}
            style={styles.Pressable}>
            <Text style={styles.PressableText}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      )}

      {waiting && (
        <View style={{width: 100, height: 100}}>
          <Lottie source={require('../assets/loader.json')} autoPlay loop />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    marginTop: 12,
    borderColor: 'red',
    borderWidth: 2,
    width: 200,
    textAlign: 'center',
    borderRadius: 10,
    height: 40,
  },
  Pressable: {
    width: 150,
    height: 40,
    border: 2,
    margin: 10,
    color: '#ffffff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B2980',
  },
  PressableText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
});
export default Login;
