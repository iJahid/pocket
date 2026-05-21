import useOrdersList from '@/api/orders';
import { mystyles } from '@/lib/styles';
import { useAuth } from '@/providers/AuthProvider';
import BringItem from '@components/bringItems';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';

const BringList = () => {
   const {profile}=useAuth();
  //const [orderList,setOrderList]=useState<any []>([])
const {data: orderList}=  useOrdersList()
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
                       <BringItem item={item} NoSelection={true} isArchive={true} isRequstList={false}/>
                    </>)
               
                }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap:2 ,padding:5}}
               />
            </View>
          </View>


    </View></View>
     
    </View>
    </>

  );
}

export default BringList