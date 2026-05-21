import { useRequestList } from '@/api/orders';
import { mystyles } from '@/lib/styles';
import { useAuth } from '@/providers/AuthProvider';
import BringItem from '@components/bringItems';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

const RequestList = () => {
   const {profile}=useAuth();
  //const [orderList,setOrderList]=useState<any []>([])
const {data: orderList}=  useRequestList()


    //      setOrderList(data);

 return (<>
  <Stack.Screen options={{headerTitle:'Bring List'}}/>
    <View style={mystyles.container}>

      {/* Your main screen content */}
      <View style={mystyles.content}>
         <View style={mystyles.section}>
          

          <View style={mystyles.sectionBody}>
            <View style={mystyles.rowWrapper}>
             <FlatList
                data={orderList}
                
                renderItem={({item})=>{
                  console.log(item.orderby)

                  return(
                    
                    <>
                       <BringItem item={item} NoSelection={true} isArchive={false} isRequstList={true}/>
                    </>)
               
                }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap:2 ,padding:5}}
               />
            </View>
          </View>





      {/* Floating Plus Button */}
    
    </View></View>
      <TouchableOpacity 
        style={mystyles.floatingButton} 
        onPress={() => router.push('/(orders)/ProductSreen')}
        activeOpacity={0.8}
      >
        <FontAwesome name='plus' size={20}/>
      </TouchableOpacity>
    </View>
    </>

  );
}

export default RequestList