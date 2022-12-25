import getAuth from '@react-native-firebase/auth';
import {View, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const Dashboard = () => {
  const auth = getAuth();
  const userAuth = auth.currentUser;
  const email = userAuth.email;
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const user = await firestore().collection('User').doc(email).get();
    setUser(user.data());
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View>
      <Text>Hello! your Email is:{user.Email}</Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Dashboard;
