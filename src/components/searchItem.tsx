import { useDeleteTransction } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { expDataTypeDBUpdate } from '@/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import ExpenseForm from './ExpenseForm'

//  Fixed: Explicitly typed the incoming prop object structure
const SearchItem = ({ expData }: { expData: expDataTypeDBUpdate }) => {

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
          <View style={{ width: 35, padding: 1 }}> 
            { expData.xn_for==='XP' && <Text style={{color:'red'}}>Exp</Text>}
            { expData.xn_for==='IN' && <Text style={{color:'green'}}>Inc</Text>}
            { expData.xn_for==='LON' && <Text style={{color:'rgba(84, 84, 196, 0.87)'}}>Loan</Text>}
            { expData.xn_for==='XCH' && <FontAwesome name='exchange' size={20} color={'rgba(194, 74, 27, 0.87)'}/> }

          </View>
          
          <View style={{ width: 90, padding: 1 }}> 
            <Text style={{ color: '#0a0eeb',fontSize:15 }}>{dayjs(expData.xndate).format('DD.MM.YY')}</Text>
          </View>
          
          <View style={{ width: 70, padding: 1 }}> 
            <Text  style={{ color: '#620ffc',fontSize:15 }}>{expData.category}</Text>
            
          </View>
          
          <View style={{flex:1,flexDirection:'column', padding: 1 }}> 
            <Text>{expData.item}
                   
            </Text>
       {
      expData.notes && <Text>{expData.notes}</Text>
      
      }
          </View>
        </View>

        {expData.xntype === 'cash' && <FontAwesome name='money' size={20} color={'green'} style={{ paddingRight: 3 }} />}    
        {expData.xntype === 'bank' && <FontAwesome name='bank' size={20} color={'green'} style={{ paddingRight: 3 }} />}    
        {expData.xntype === 'wallet' && <Ionicons name='wallet-outline' size={20} color={'green'} style={{ paddingRight: 3 }} />}    

        <Text style={{ paddingEnd: 4, color: '#0a7c39', fontSize: 16, width: 70, textAlign: 'right' }}>
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

            <ExpenseForm inputdata={expData} isAdd={false} onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  )
}

export default SearchItem
