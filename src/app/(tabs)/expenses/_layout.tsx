import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import Expenses from '.';
import ExpensesArchive from './archive';

/*export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);
*/
const Tab = createMaterialTopTabNavigator();

export default function ExpenseTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{
        headerTitle:'Expenses',
       
    }}/>
      <Tab.Navigator screenOptions={{ 
         tabBarStyle: { 
          height: 35, // Set your desired height here
          backgroundColor: '#b8f3e1',
      
        },
      
        tabBarLabelStyle: { fontSize: 14,marginTop:-10 },
      
      }} >
        <Tab.Screen name="index" component={Expenses} options={{ title: 'Expenses' }}  />
        <Tab.Screen name="archive" component={ExpensesArchive} options={{ title: 'Archived' }} />
      </Tab.Navigator>
    </View>
  );
}