import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { View } from 'react-native';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TransactionTabs() {
  return (
    
       <View style={{ flex: 1}}>
      <Stack.Screen options={{headerTitle:'Transactions'}}/>
      <TopTabs options={{ 
         
      }} >
        <TopTabs.Screen name="index" options={{ title: 'All' }} />
        <TopTabs.Screen name="incomes" options={{ title: 'Income' }} />
        <TopTabs.Screen name="loans" options={{ title: 'Loan' }} />
        <TopTabs.Screen name="exchange" options={{ title: 'Exchange' }} />
      </TopTabs>
      </View>
    
  );
}