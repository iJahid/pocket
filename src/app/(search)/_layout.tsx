import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { View } from 'react-native';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TransactionTabs() {
  return (
    
       <View style={{ flex: 1}}>
      <Stack.Screen options={{headerTitle:'Search Transactions '}}/>
      <TopTabs >
        <TopTabs.Screen name="index" options={{ title: 'Last Month' }} />
        <TopTabs.Screen name="search" options={{ title: 'Search' }} />
        
      </TopTabs>
      </View>
    
  );
}