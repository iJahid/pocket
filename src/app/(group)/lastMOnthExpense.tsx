import { useTransactionList } from '@/api/orders'
import ExpenseItem from '@components/expenseItem'
import { Stack } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LastMonthExpnese = () => {

    const {data: xpData,isRefetching,refetch}=  useTransactionList('Last')

  return (
    
    <SafeAreaView>
        <Stack.Screen options={{headerTitle:'Last Month Expenses'}}/>
      <FlatList
data={xpData}
renderItem={({item})=>(
<ExpenseItem expData={item} />)}
   contentContainerStyle={{ flexGrow: 1 }}
   

      
  

/>
    </SafeAreaView>
  )
}

export default LastMonthExpnese