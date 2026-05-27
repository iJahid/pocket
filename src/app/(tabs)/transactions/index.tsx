import { useSummaryFor, useTransactionList, useUserBalance } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import ExpenseForm from '@components/ExpenseForm'
import ExpenseItem from '@components/expenseItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'


const xpDataAdd1:expDataTypeDB={
   
    xndate:new Date(),
category:'Bazar',
item:'',    
amount:null,
notes:'',
xntype:'wallet',
user_id:'',
bankid:0,


}


const Expenses = () => {
   
  const {profile}=useAuth();
  const { data:BalanceData, isLoading, isError:balaceError, error, refetch:refetchBalance } = useUserBalance({
    userId:profile?.id,// '123e4567-e89b-12d3-a456-426614174000',
    expenseTypes: ['wallet', '-'],
  });

  const [isModalVisible, setModalVisible] = useState(false);
  //const [xpData,setXpData]=useState<any[]>([])
  const [xpDataAdd,setXpDataAdd]=useState<expDataTypeDB>()

  const today = new Date();
const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();


const {data: xpData,isRefetching,refetch}=  useTransactionList()
const {data: ThisMonthExpense,refetch:refetchSumFor}=  useSummaryFor(startOfMonth,endOfMonth,'XP')
//const {data: summaryData,isRefetching: isSummaryRefetching,refetch: refetchSummary  }=  useTransactionSummary(startOfToday,endOfToday,['wallet'])
//const {data: summaryDataMonth,isRefetching: isSummaryRefetchingMonth,refetch: refetchSummaryMonth  }=  useTransactionSummary(startOfMonth,endOfMonth,['wallet'])
//const {data: balanceData,isRefetching: isBalanceRefetching,refetch: refetchBalance  }=  useTransactionBalance(['wallet','-'])












  useEffect(()=>{
    

        
      //const balance= useUserBalance getUserBalance(['wallet']);
      console.log('Balane',BalanceData)
         /*   const {data,error}=await supabase.from('transactions').select('*').eq('user_id',profile?.id)
            setXpData(data as any);
            setXpDataAdd(xpDataAdd1 as any);

          console.log(data,xpDataAdd)
        }
        LoadExpenseList();*/
//console.log('from all',xpData);
//console.log('Balance',balanceData)
 setXpDataAdd(xpDataAdd1 as any);
                     setXpDataAdd(prev => ({ ...prev, user_id: profile?.id }))
  },[])
  
if (isLoading) return <ActivityIndicator size="large" />;
  if (balaceError) return <Text>Error: {error.message}</Text>;

  
  return (
    <>
   
                  
<FlatList
data={xpData}
renderItem={({item})=>(<ExpenseItem expData={item} isAdd={false}
   contentContainerStyle={{ flexGrow: 1 }}
   simultaneousHandlers={[]} // Forces gesture handler integration
refreshControl={
        <RefreshControl 
          refreshing={isRefetching} 
          onRefresh={refetch} 
        />
      }
  

/>)}
/>

                  
                  


                  
                   
                  
                    <View>
        <View style={mystyles.section}>
                   
               <View style={mystyles.sectionBody}>
                 <View style={[mystyles.rowWrapper, mystyles.rowFirst]}>
                     <View style={mystyles.row}>
                 
                          <Text>Pocket: {(BalanceData?.income ?? 0) -(BalanceData?.expense ?? 0)}</Text>
                                    <Text>This Month Expense: {-(ThisMonthExpense?.income ?? 0) +(ThisMonthExpense?.expense ?? 0)}</Text>
      

                        <View style={mystyles.rowSpacer} />
                    </View>
                 </View>
               
                </View>
                
        </View>
        
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
                       <View style={mystyles.modalContent}>
                                                
                                               
                        <TouchableOpacity style={mystyles.closeButton} onPress={() => setModalVisible(false)}>
                          <Text style={mystyles.closeText}>✕</Text>
                        </TouchableOpacity>

                            <ExpenseForm inputdata={xpDataAdd} isAdd={true} onClose={() => setModalVisible(false)}/>
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Expenses