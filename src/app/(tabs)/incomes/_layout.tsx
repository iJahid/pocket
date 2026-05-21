import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function MoneyInTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <Stack.Screen options={{headerTitle:'Incomes'}}/>
      <TopTabs options={{ 
         
      }} >
        <TopTabs.Screen name="index" options={{ title: 'Incomes' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archived' }} />
      </TopTabs>
    </SafeAreaView>
  );
}