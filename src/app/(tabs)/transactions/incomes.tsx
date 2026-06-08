import { useTransactionListFor, useUserBalance } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import IncomeForm from '@components/IncomeForm'
import IncomeItem from '@components/incomeItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
const xpDataAdd1:expDataTypeDB={
   
    xndate:new Date(),
category:'Salary',
item:'office',    
amount:null,
notes:'',
xntype:'cash',
user_id:'',
bankid:null,
xn_for:'IN',
xninout:1,
bank_name:null,
xn_group:null,

}


const Incomes = () => {
   
  const {profile}=useAuth();
  const { data:BalanceData, isLoading, isError:balaceError, error, refetch:refetchBalance } = useUserBalance({
      userId:profile?.id,// '123e4567-e89b-12d3-a456-426614174000',
      expenseTypes: ['cash', '-'],
    });

  const [isModalVisible, setModalVisible] = useState(false);
  //const [xpData,setXpData]=useState<any[]>([])
  const [xpDataAdd,setXpDataAdd]=useState<expDataTypeDB>()

  const today = new Date();
  const now = new Date();
  //"2026-05-28T17:59:59.999Z"


const {data: xpData,isRefetching,refetch}=  useTransactionListFor('IN')












  useEffect(()=>{
    
         setXpDataAdd(xpDataAdd1 as any);
                     setXpDataAdd(prev => ({ ...prev, user_id: profile?.id }))
  },[])
  
  return (
    <>
    <View
      
          style={[{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#cdf',marginTop:5,padding:5}]}
        >
        <View style={mystyles.balanceRow}>
  
  

            <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <FontAwesome name='money' size={24} color={'#72680b'}/>
            <Text style={[mystyles.balanceLabel,{fontSize:15,padding:5}]}>Cash </Text>
             <Text style={[mystyles.balanceLabel,{fontSize:25}]}> {(BalanceData?.income ?? 0) -(BalanceData?.expense ?? 0)}</Text>
            </View> 
            </View>
            </View>
       
<FlatList
data={xpData}
renderItem={({item})=>(
<IncomeItem expData={item} />)}
   contentContainerStyle={{ flexGrow: 1 }}
   
refreshControl={
        <RefreshControl 
          refreshing={isRefetching} 
          onRefresh={refetch} 
        />
      }
keyExtractor={(item) => item.id}  

/>


                  
                  


                  
                   
                  
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

                           { <IncomeForm inputdata={xpDataAdd} isAdd={true} onClose={() => setModalVisible(false)}/>}
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Incomes


