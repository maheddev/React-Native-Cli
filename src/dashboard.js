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
    <ScrollView style={{backgroundColor: '#f5f0d7'}}>
      {!waiting && (
        <View style={{flex: 1}}>
          <View style={styles.TitleView}>
            <Text style={styles.title}>Welcome {user.Name}</Text>
          </View>
          <View style={styles.body}>
            <Text>Hello! your Email is: {user.Email}</Text>
            <Text>Hello! your Email is: {user.Number}</Text>
            <Text>Hello! your CNIC is: {user.CNIC}</Text>
          </View>
        </View>
      )}
      {waiting && <Loader></Loader>}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#f5f0d7',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  TitleView: {
    backgroundColor: 'black',
  },
  body: {
    margin: 10
  }
});

export default Dashboard;
