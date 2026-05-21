import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function OrdersTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <Stack.Screen options={{headerTitle:'Orders'}}/>
      <TopTabs options={{ 
         
      }} >
        <TopTabs.Screen name="index" options={{ title: 'Orders' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archived' }} />
      </TopTabs>
    </SafeAreaView>
  );
}