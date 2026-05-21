import { mystyles } from '@/lib/styles'
import { expDataType } from '@/types'
import ExpenseItem from '@components/expenseItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Expenses = () => {
  const xpData:expDataType={
    expdate:'Tue 19.05.26',
category:'Bazar',
item:'Meat',
amount:'100',
notes:'notes',
expType:'wallet',
bankID:'',
isAdd:false
  }
  return (
    <>
    <View>
        <View style={mystyles.section}>
                   
               <View style={mystyles.sectionBody}>
                 <View style={[mystyles.rowWrapper, mystyles.rowFirst]}>
                   <ExpenseItem expdate='Tue 19.05.26' expData={xpData}/>
                   <ExpenseItem expdate='Tue 19.05.26' expData={xpData}/>
                   <ExpenseItem expdate='Tue 19.05.26' expData={xpData}/>
                   <ExpenseItem expdate='Tue 19.05.26' expData={xpData}/>
                   
                     <View style={mystyles.row}>
                        <Text style={mystyles.rowLabel}>Report Bug</Text>
                  
                        <View style={mystyles.rowSpacer} />
                    </View>
                 </View>
               
                </View>
                
        </View>
        
      </View>
                   
                    <TouchableOpacity 
        style={mystyles.floatingButton} 
       
        activeOpacity={0.8}
      >
        <FontAwesome name='plus' size={20}/>
      </TouchableOpacity>
      </>   
     




    
  )
}

export default Expenses