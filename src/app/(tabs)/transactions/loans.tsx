import { useBalanceXNFor, useLoanSumPrs, useTransactionListFor } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import LoanForm from '@components/LoanForm'
import LoanItems from '@components/loanItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
const xpDataAdd1:expDataTypeDB={
   
    xndate:new Date(),
category:'Give',
item:'',    
amount:null,
notes:'',
xntype:'wallet',
user_id:'',
bankid:null,
xn_for:'LON',
xninout:-1,
bank_name:null,
xn_group:null


}


const Loans = () => {
   
  const {profile}=useAuth();
  const { data:BalanceData, isLoading, isError:balaceError, error, refetch:refetchBalance } = useBalanceXNFor({
    userId:profile?.id,// '123e4567-e89b-12d3-a456-426614174000',
    xnfor: 'LON'
  });

  const [isModalVisible, setModalVisible] = useState(false);
  //const [xpData,setXpData]=useState<any[]>([])
  const [xpDataAdd,setXpDataAdd]=useState<expDataTypeDB>()



const {data: xpData,isRefetching,refetch}=  useTransactionListFor('LON')

const {data: LoanSum,error:LoanSumError,refetch:refetchLoanSum}=  useLoanSumPrs('LON')










  useEffect(()=>{
    
     
 setXpDataAdd(xpDataAdd1 as any);
                     setXpDataAdd(prev => ({ ...prev, user_id: profile?.id }))
  },[])
  
if (isLoading) return <ActivityIndicator size="large" />;
  if (balaceError) return <Text>Error: {error.message}</Text>;

  return (
    <>
   

 <View
      
          style={[{backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#cdf',marginTop:5,padding:5}]} >
        <View style={[mystyles.balanceRow,{justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:10}]}>
  
  

            <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start'}}>
            <Text style={[mystyles.balanceLabel,{fontSize:16,padding:5}]}>to Collect</Text>
             <Text style={[mystyles.balanceLabel,{fontSize:22}]}> {-(BalanceData?.neg ?? 0)}</Text>
            </View> 

<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'#f0f0f0',padding:5,borderRadius:10,top:25}}>
            
             <Text style={[mystyles.balanceLabel,{fontSize:22,color: (BalanceData?.pos ?? 0)-(BalanceData?.neg ?? 0) < 0 ? 'rgb(165, 13, 33)' : 'green'}]}> {(BalanceData?.pos ?? 0)-(BalanceData?.neg ?? 0)}</Text>
            </View> 

<View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>
            <Text style={[mystyles.balanceLabel,{fontSize:16,padding:5,color:'#fa091e'}]}> to Give</Text>
             <Text style={[mystyles.balanceLabel,{fontSize:22,color:'#d80415b4'}]}> {(BalanceData?.pos ?? 0)}</Text>
            </View> 

            
            
          
        </View>


      
    <View style={[mystyles.balanceRow,{marginTop:25,justifyContent:'center',alignItems:'center'}]}>
          { <FlatList
    data={LoanSum} 
    renderItem={({ item }) => {
      // If the item itself is somehow an object containing a transaction structure, skip rendering it to prevent the crash
      
      
      return (
        <View>
          <Text style={mystyles.smallLabel}>{item.person }</Text>
          <Text style={[mystyles.smallAmount,{color: item.balance<0?'rgb(10, 133, 92)':'red'}]}>
           {(item.balance<0)?-item.balance:item.balance}
          </Text>
        </View>
      );
    }}
    horizontal={true} 
    keyExtractor={(item, index) => (item && item.person ? String(item.person ) : String(index))}
    contentContainerStyle={{ gap: 14, paddingRight: 5 }}
  />}
          </View>   
          <View style={mystyles.balanceRow}>
         
            <View>
              
              
            </View>

            
             

            
          </View>
        </View>
{<FlatList
data={xpData}
renderItem={({item})=>(
<LoanItems expData={item} />)}
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

                           { <LoanForm inputdata={xpDataAdd} isAdd={true} onClose={() => setModalVisible(false)}/>}
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Loans


