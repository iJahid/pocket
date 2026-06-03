import { useGroupTransListFor } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { xGroupTypeDBAdd } from '@/types'
import ExchangeForm from '@components/ExchangeForm'
import ExchangeItem from '@components/exhangeItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'


const xpGroupDataAdd:xGroupTypeDBAdd={
   
      catg_from:'Cash',
  catg_to:  'Wallet',  
  grp_type:'XCH',
  user_id:'',
  amount:0,
  xndate:new Date(),


}



const Exchanges = () => {
   
  const {profile}=useAuth();

  const [isModalVisible, setModalVisible] = useState(false);
  //const [xpData,setXpData]=useState<any[]>([])
  const [xpDataAdd,setXpDataAdd]=useState<xGroupTypeDBAdd>()


const {data: xpData,isRefetching,refetch,isLoading}=  useGroupTransListFor('XCH')












  useEffect(()=>{
    
     
 setXpDataAdd(xpGroupDataAdd as any);
 setXpDataAdd(prev => ({ ...prev, user_id: profile?.id }))
  },[])
  
if (isLoading) return <ActivityIndicator size="large" />;


  return (
    <>
   
<Stack.Screen 
  options={{
    headerRight: () => (
      <Text>Hellp</Text>
    )
  }} 
/>
 <View
      
          style={[{backgroundColor:'#f0f2f5',borderBottomWidth:1,borderBottomColor:'#cdf',marginTop:5,padding:5}]}
        >
 


      
   
          
              
              
        

            
             

            
          </View>
      
{<FlatList
data={xpData}
renderItem={({item})=>(
<ExchangeItem expData={item} />)}
   contentContainerStyle={{ flexGrow: 1 }}
   
refreshControl={
        <RefreshControl 
          refreshing={isRefetching} 
          onRefresh={refetch} 
        />
      }
keyExtractor={(item) => item.id}  

/>}


                  
                  


                  
                   
                  
                    <View>
        
      </View>
                   
                    <TouchableOpacity 
        style={mystyles.floatingButton} 
       
        activeOpacity={0.8}
        onPress={()=>{
          setModalVisible(true)


        }}
      >
        <FontAwesome name='plus' size={20}/>
      </TouchableOpacity>


      <Modal visible={isModalVisible} transparent={true} animationType="slide">
                      <View style={mystyles.overlay}>
                       <View style={[mystyles.modalContent,{overflow:'auto',minHeight:550}]}>
                                                
                                               
                        <TouchableOpacity style={mystyles.closeButton} onPress={() => setModalVisible(false)}>
                          <Text style={mystyles.closeText}>✕</Text>
                        </TouchableOpacity>

                            <ExchangeForm inputdata={xpDataAdd} onClose={() => setModalVisible(false)}/>
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Exchanges


