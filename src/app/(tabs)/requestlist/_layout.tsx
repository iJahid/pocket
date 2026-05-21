import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';
import { View } from 'react-native';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function OrdersTabs() {
  return (
    <View style={{ flex: 1}}>
      <Stack.Screen options={{headerTitle:'Requests'}}/>
      <TopTabs >
        <TopTabs.Screen name="index" options={{ title: 'Requests' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archived' }} />
      </TopTabs>
    </View>
  );
}