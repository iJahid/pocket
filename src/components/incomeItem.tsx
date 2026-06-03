import { useDeleteTransction } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { expDataTypeDBUpdate } from '@/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import IncomeForm from './IncomeForm'

//  Fixed: Explicitly typed the incoming prop object structure
const IncomeItem = ({ expData }: { expData: expDataTypeDBUpdate }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const { mutate: deleteTrans, isPending } = useDeleteTransction();

  if (isPending) {
    return <ActivityIndicator />;
  }

  // Guard clause to handle instances where data might temporarily be missing
  if (!expData) return null;

  return (
    <>
      <TouchableOpacity 
        style={[
          mystyles.row, 
          { backgroundColor: expData.xninout === 1 ? '#bcebec' : 'transparent' }
        ]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={[mystyles.rowLabel, { flex: 4, flexDirection: 'row', width: '80%', maxWidth: '80%' }]}>
          <View style={{ width: 100, padding: 2 }}> 
            <Text>{dayjs(expData.xndate).format('ddd DD.MM.YY')}</Text>
          </View>
          
          <View style={{ width: 70, padding: 2 }}> 
            <Text numberOfLines={2} style={{ color: '#620ffc' }}>{expData.category}</Text>
          </View>
          
          <View style={{ padding: 2 }}> 
            <Text numberOfLines={2}>{expData.item}</Text>
          </View>
        </View>

        {expData.xntype === 'cash' && <FontAwesome name='money' size={20} color={'green'} style={{ paddingRight: 3 }} />}    
        {expData.xntype === 'bank' && <FontAwesome name='bank' size={20} color={'green'} style={{ paddingRight: 3 }} />}    
        {expData.xntype === 'wallet' && <Ionicons name='wallet-outline' size={20} color={'green'} style={{ paddingRight: 3 }} />}    

        <Text style={{ paddingEnd: 6, color: '#0a7c39', fontSize: 16, width: 70, textAlign: 'right' }}>
          {expData.amount}
        </Text>
        
        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => deleteTrans(expData.id)}>
          <FontAwesome name='minus-circle' color={'red'} size={20} />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={mystyles.rowLast} />
      
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={mystyles.overlay}>
          <View style={mystyles.modalContent}>
            <TouchableOpacity style={mystyles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={mystyles.closeText}>✕</Text>
            </TouchableOpacity>

            <IncomeForm inputdata={expData} isAdd={false} onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  )
}

export default IncomeItem
