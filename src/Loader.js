import Lottie from 'lottie-react-native';
import { View, Dimensions } from 'react-native';
export default Loader = () => {
    return(
        <View style = {{flex: 1, justifyContent: 'center', height: Dimensions.get('window').height, alignItems: 'center'}}>
        <View style={{width: 250, height: 250}}>
            <Lottie source={require('../assets/loader.json')} autoPlay loop />
          </View>
          </View>
    )
}