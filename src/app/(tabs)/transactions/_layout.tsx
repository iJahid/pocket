import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TransactionTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <Stack.Screen options={{headerTitle:'Transactions'}}/>
      <TopTabs options={{ 
         
      }} >
        <TopTabs.Screen name="index" options={{ title: 'All' }} />
        <TopTabs.Screen name="incomes" options={{ title: 'Income' }} />
        <TopTabs.Screen name="loans" options={{ title: 'Loan' }} />
        <TopTabs.Screen name="banks" options={{ title: 'Exchange' }} />
      </TopTabs>
    </SafeAreaView>
  );
}