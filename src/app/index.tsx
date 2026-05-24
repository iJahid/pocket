import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

const index = () => {
     const {isAuthenticated,Authloaded}=useAuth();

if(!Authloaded)
{
    return <ActivityIndicator/>
}

if(!isAuthenticated){
    
    return <Redirect href={'/LoginScreen'}/>
}

return <Redirect href={'/(tabs)'}/>
    
}

export default index