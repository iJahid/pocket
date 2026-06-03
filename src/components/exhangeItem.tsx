import { useDeleteGroupTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { xGroupTypeDBUpdate } from '@/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

//  Fixed: Explicitly typed the incoming prop object structure
const ExchangeItem = ({ expData }: { expData: xGroupTypeDBUpdate }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const { mutate: deleteTrans, isPending } = useDeleteGroupTrans('XCH');


  if (isPending) {
    return <ActivityIndicator />;
  }

  // Guard clause to handle instances where data might temporarily be missing
  if (!expData) return null;

  return (
    <>
     
        <View style={[{ flex: 1, flexDirection: 'row',
          justifyContent: 'space-between', padding: 8,backgroundColor: '#fff', borderRadius: 8, marginBottom: 4 }]}>
          
        
          <View style={{ width: 100, padding: 2 }}> 
            <Text>{dayjs(expData.xndate).format('ddd DD.MM.YY')}</Text>
          </View>
          
          <View style={{ width: 70, padding: 2 }}> 
            <Text numberOfLines={2} style={{ color: '#620ffc' }}>{expData.catg_from}</Text>
          </View>
           <View style={{ padding: 2 }}> 
            <Text >To </Text>
          </View>
          <View style={{ padding: 2 }}> 
            <Text numberOfLines={2}> {expData.catg_to}</Text>
          </View>
        

          
      <View style={{ padding: 2 }}> 
        <Text style={{ paddingEnd: 6, color: '#0a7c39', fontSize: 16, width: 70, textAlign: 'right' }}>
          {expData.amount}
        </Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => deleteTrans(expData.id)}>
          <FontAwesome name='minus-circle' color={'red'} size={20} />
        </TouchableOpacity>
       
       
        
</View>

      <View style={mystyles.rowLast} />
            
      
    </>
  )
}

export default ExchangeItem
