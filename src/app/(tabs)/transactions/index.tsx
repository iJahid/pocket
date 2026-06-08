import { useSummaryByCatg, useSummaryFor, useTransactionList, useUserBalance } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import ExpenseForm from '@components/ExpenseForm'
import ExpenseItem from '@components/expenseItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, Stack } from 'expo-router'
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
xn_for:'XP',
xninout:-1,
bank_name:'',


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
  const now = new Date();
  const theDyaNum=today.getDate();
  //"2026-05-28T17:59:59.999Z"
const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString();


const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)).toISOString();

// End of current month in UTC
const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)).toISOString();

const startOfLastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1)).toISOString();
const endOfLastMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0, 23, 59, 59, 999)).toISOString();;


const {data: xpData,isRefetching,refetch}=  useTransactionList('This')

const {data: ThisMonthExpense,error:summaryError,refetch:refetchSumFor}=  useSummaryFor(startOfMonth,endOfMonth,'XP','thismonth')
const {data: LastMonthExpense,error:summaryErrorL,refetch:refetchSumForL}=  useSummaryFor(startOfLastMonth,endOfLastMonth,'XP','Lastmonth')
const {data: ThisMonthExpenseCatg,error:summaryCatgError,refetch:refetchSumCatg}=  useSummaryByCatg(startOfMonth,endOfMonth,'XP')










  useEffect(()=>{
    
      /*console.log('THis',startOfMonth,endOfMonth)        
      console.log('Last',startOfLastMonth,endOfLastMonth)        
      //const balance= useUserBalance getUserBalance(['wallet']);
      console.log('Balane',BalanceData)
        console.log('LastMonthExpense',LastMonthExpense)
         console.log('ThisMonthExpense',ThisMonthExpense)*/
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
  if(summaryError) return <Text>Error: {summaryError.message}</Text>;
  if(summaryErrorL) return <Text>Error: {summaryErrorL.message}</Text>;
//if (!ThisMonthExpense || !LastMonthExpense || !ThisMonthExpenseCatg) return <ActivityIndicator size="small" />;
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
      
          style={[{backgroundColor:'#ffffff',borderBottomWidth:1,borderBottomColor:'#cdf',marginTop:5,padding:5}]}
        >
        <View style={mystyles.balanceRow}>
  
  

            <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <Ionicons name='wallet' size={30} color={'#72680b'}/>
             <Text style={[mystyles.balanceLabel,{fontSize:25}]}> {(BalanceData?.income ?? 0) -(BalanceData?.expense ?? 0)}</Text>
            </View> 


            <View>
              <Text style={mystyles.balanceLabel}>This Month</Text>
              
              <Text style={mystyles.balanceAmount}>  {
              ThisMonthExpense && ThisMonthExpense.length > 0
      ? (-(ThisMonthExpense[0].income ?? 0) + (ThisMonthExpense[0].expense ?? 0))
      : 0}</Text>
                   
            </View>
            <View>
            <TouchableOpacity  onPress={()=>router.push('/search')}>
              <Text style={mystyles.balanceLabel}>Last Month <FontAwesome name='search' size={14} color={'#72680b'} style={{marginLeft:5}}/></Text>
                
                  <Text style={mystyles.balanceAmount}>  {LastMonthExpense && LastMonthExpense.length > 0
      ? (-(LastMonthExpense[0].income ?? 0) + (LastMonthExpense[0].expense ?? 0))
      : 0}</Text>
                  </TouchableOpacity>
            </View>
          
        </View>


      
    <View style={mystyles.balanceRow}>
          { <FlatList style={{backgroundColor:'white'}}
    data={Array.isArray(ThisMonthExpenseCatg) ? ThisMonthExpenseCatg : []} 
    renderItem={({ item }) => {
      // If the item itself is somehow an object containing a transaction structure, skip rendering it to prevent the crash
      if (!item || typeof item !== 'object' || 'xndate' in item) {
        return null;
      }

      const categoryName = typeof item.category === 'object' ? 'Unknown' : (item.category ?? 'N/A');
      const expenseAmount = typeof item.expense === 'object' ? 0 : (item.expense ?? 0);
//console.log('Category:', categoryName, 'Expense:', expenseAmount,today.getDate());
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center',borderRightWidth:1,borderColor:'#d4d2d2',paddingRight:5 }}>
          <Text style={mystyles.smallLabel}>{categoryName}</Text>
          <Text style={mystyles.smallAmount}>
            {categoryName === 'Regular'
              ? `${Math.ceil(expenseAmount / theDyaNum)}/day `
              : `${expenseAmount}`}
          </Text>
        </View>
      );
    }}
    horizontal={true} 
    keyExtractor={(item, index) => (item && item.category ? String(item.category) : String(index))}
    contentContainerStyle={{ gap: 14, paddingRight: 5 }}
  />}
          </View>   
          <View style={mystyles.balanceRow}>
         
            <View>
              
              
            </View>

            
             

            
          </View>
        </View>
{<FlatList
style={{backgroundColor:'white'}}
data={xpData}
renderItem={({item})=>(
<ExpenseItem expData={item} />)}
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

                           { <ExpenseForm inputdata={xpDataAdd} isAdd={true} onClose={() => setModalVisible(false)}/>}
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Expenses


