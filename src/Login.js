import {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Data = {
    mail: email,
    pass: password,
  };
  const LoginButtonPressed = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate();
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

  const SignUpButtonPressed = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
      <TouchableOpacity onPress={LoginButtonPressed} style={styles.Pressable}>
        <Text style={styles.PressableText}>Sign In!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={SignUpButtonPressed} style={styles.Pressable}>
        <Text style={styles.PressableText}>Sign Up!</Text>
      </TouchableOpacity>
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
