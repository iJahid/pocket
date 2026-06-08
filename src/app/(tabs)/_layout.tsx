import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, router, Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';
import { useColorScheme } from '@components/useColorScheme';

import Colors from '@constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
 const{session,Authloaded} = useAuth();
 if(!Authloaded) {
  <ActivityIndicator/>
 }
 //console.log(session);
  if(!session) {
    return <Redirect href={'/(auth)/LoginScreen'} />
  }

  console.log("tab laout",Authloaded)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitle:'Pocket',
        tabBarLabelStyle: {
          color:'dark-green',
          fontSize:12
        },


        headerRight:()=>(
      <>
        <TouchableOpacity style={{padding:10}}
        onPress={()=>router.push('/(group)/GroupsScreen')}><FontAwesome name='users' size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10}}
        onPress={()=>router.push('/(group)/InvitationsScreen')}><FontAwesome name='bell-o' size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10}}
        onPress={()=>router.push('/(group)/profile')}><FontAwesome name='gears' size={20} />
        </TouchableOpacity>
        </>  
      )
      }}>
        
 <Tabs.Screen
        name="index"  
        options={{ href:null}} />
  <Tabs.Screen
        name="dashboard" 
        options={{
          title:"Dashboard",
        tabBarIcon:()=>(<FontAwesome  name='dashboard' size={25} style={{color:'#055757'}}/>),
          
      }}        
        
        />
 
        <Tabs.Screen
        name="transactions" 
        options={{
          title:"Transactions",
        tabBarIcon:()=>(<Ionicons  name='wallet-outline' size={25} style={{color:'#055757'}}/>),
          
      }}        
        
        />
    
      
       
         <Tabs.Screen
        name="bringlist" 
        options={{
          title:"Ordered",
        tabBarIcon:()=>(<Ionicons name='bag' size={25} style={{color:'#055757'}}/>),
          
      }}
        />
           <Tabs.Screen
        name="requestlist" 
        options={{
          title:"Requested",
        tabBarIcon:()=>(<FontAwesome name='rocket' size={25} style={{color:'#055757'}}/>),
          
      }}
        />
      
            
   
     
    </Tabs>
  );
}
