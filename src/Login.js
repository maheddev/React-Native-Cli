import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import Loader from './Loader';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [waiting, setWaiting] = useState(false);
  const Data = {
    mail: email,
    pass: password,
  };
  const [hidePass, setHidePass] = useState(true);
  const onPressShowPass = () => {
    if (hidePass == true) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
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

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <ScrollView>
      {!waiting && (
        <View style={styles.MainView}>
          <View style={styles.TopText}>
            <Image
              style={styles.image}
              source={require('../assets/icon.png')}
            />
            <Text style={styles.tagline}>
              Please Log In to your Account to Continue!
            </Text>
          </View>
          <View style={styles.InputSection}>
            <FormBuilder
            //style={styles.TextInput}
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  type: 'email',
                  name: 'email',

                  rules: {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  },
                  textInputProps: {
                    label: 'Email',
                  },
                },
                {
                  type: 'password',
                  name: 'password',
                  rules: {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  },
                  textInputProps: {
                    label: 'Password',
                  },
                },
              ]}
            />

            {/* <TextInput
              placeholder="Email Address"
              placeholderTextColor="#000"
              style={styles.TextInput}
              onChangeText={mail => setEmail(mail)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#000"
                style={styles.TextInput}
                onChangeText={i => {
                  setPassword(i);
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
            </View> */}
          </View>
          <View style={styles.ButtonsSection}>
            <Pressable
            style = {styles.Pressable}
              mode={'contained'}
              onPress={handleSubmit(data => {
                console.log('form data', data);
                setWaiting(true);
                auth()
                  .signInWithEmailAndPassword(data.email, data.password)
                  .then(() => {
                    console.log('User account created & signed in!');
                    setWaiting(false);
                    navigation.navigate('Dashboard');
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
              })}>
              <Text style={styles.PressableText}>Log In!</Text>
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
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  TextInput: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'black',
    fontFamily: 'Poppins-Italic',
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
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  eye: {
    height: 50,
    position: 'absolute',
    right: 15,
    top: 10,
  },
});
export default Login;
