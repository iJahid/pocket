import { useTransactionList } from '@/api/orders'
import ExpenseItem from '@components/expenseItem'
import { Stack } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'

const LastMonthExpnese = () => {

    const {data: xpData,isRefetching,refetch}=  useTransactionList('Last')

  return (
    
    <View style={{flex:1}}>
        <Stack.Screen options={{headerTitle:'Last Month Expenses'}}/>
      <FlatList
data={xpData}
renderItem={({item})=>(
<ExpenseItem expData={item} />)}
   contentContainerStyle={{ flexGrow: 1 }}
   

      
  

/>
    </View>
  )
}

export default LastMonthExpnese