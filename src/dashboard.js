import getAuth from '@react-native-firebase/auth';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import Loader from './Loader';

const Dashboard = () => {
  const auth = getAuth();
  const userAuth = auth.currentUser;
  const email = userAuth.email;
  const [user, setUser] = useState([]);
  const getUser = async () => {
    setWaiting(true);
    const user = await firestore().collection('User').doc(email).get();
    setUser(user.data());

    setWaiting(false);
  };
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    getUser();
    console.log('Loader Stopped');
  }, []);

  return (
    <ScrollView>
      {!waiting && (
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <Text style={styles.title}>Welcome {user.Name}</Text>
            <Text style={styles.title}>Your Email is: {user.Email}</Text>
            <Text style={styles.title}>
              Your Phone Number is: {user.Number}
            </Text>
            <Text style={styles.title}>Your CNIC is: {user.CNIC}</Text>
          </View>
        </View>
      )}
      {waiting && <Loader></Loader>}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
    paddingLeft: 12,
    fontFamily: 'Poppins-Black'
  },
  TitleView: {
    backgroundColor: 'black',
  },
  body: {
    margin: 10,
  },
});

export default Dashboard;
