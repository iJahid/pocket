import { useDeleteTransction } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { expDataTypeDB } from '@/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import ExpenseForm from './ExpenseForm'




const IncomeItem = ({expData}:expDataTypeDB) => {


const [date, setDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const [isChecked, setChecked] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setCategory] = useState(null);


  const [xpData,setXpData]=useState<expDataTypeDB>()
    const { mutate: deleteTrans,isPending } = useDeleteTransction();




  
 const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


useEffect(()=>{
  setXpData(expData)
  
  /*setxDate(expdate)
  setxCategory(category)
  setxItem(item)
  setxAmount(amount)
  setxNotes(notes)
  setxType(expType)*/


},[])
console.log('xpData',xpData);
if(isPending)
{
  return <ActivityIndicator/>
}

  return (<>


                        <TouchableOpacity style={[
  mystyles.row, 
  { backgroundColor: xpData?.xninout === 1 ? '#bcebec' : 'transparent' }
]} onPress={()=>{
                          
                          setModalVisible(true)
                          }}>
                        
                      

                       
                        <View style={[mystyles.rowLabel,
                          {flex:4,flexDirection:'row',
                           width:'80%',maxWidth:'80%',
                           
                           }]}>
                              <View style={{width:25,padding:2}}> 
                            
                            {
                            (xpData?.xninout==-1)?<Ionicons name='arrow-up-circle' size={20} color={'#e66510'}/>:
<Ionicons name='arrow-down-circle' size={20} color={'#077a10'}/>
                            }
                            
                            
                            
                            
                            
                            </View>
                          <View style={{width:'32%',padding:2}}> 
                            <Text> {dayjs(xpData?.xndate).format('ddd DD.MM.YY')}</Text>
                            </View>
                          <View style={{width:'20%',padding:2}}> 
                            <Text numberOfLines={2} style={{color:'#620ffc'}}>{xpData?.category}  </Text>
                          </View>
                          <View style={{width:'45%',padding:2}}> 
                          <Text numberOfLines={2}>{xpData?.item}</Text>
                          </View>
                        </View>
                          {(xpData?.xntype=='cash') && <FontAwesome name='money' size={20} color={'green'} style={{paddingRight:3}}/>    }    
                          {(xpData?.xntype=='bank') && <FontAwesome name='bank' size={20} color={'green'} style={{paddingRight:3}}/>    }    
                          {(xpData?.xntype=='wallet') && <Ionicons name='wallet-outline' size={20} color={'green'} style={{paddingRight:3}}/>    }    

                         
                        <Text style={{paddingEnd:6,color:'#0a7c39',fontSize:16,width:70,textAlign:'right'}}>{xpData?.amount}</Text>
                        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>deleteTrans(xpData?.id)}>
                              <FontAwesome name='minus-circle' color={'red'} size={20}/>
                        </TouchableOpacity>
                          

                        


                        
                    </TouchableOpacity>
                     <View style={mystyles.rowLast}/>
                 
                    
                    




                    
                    <Modal visible={isModalVisible} transparent={true} animationType="slide">
                      <View style={mystyles.overlay}>
                       <View style={mystyles.modalContent}>
                                                
                                               
                        <TouchableOpacity style={mystyles.closeButton} onPress={() => setModalVisible(false)}>
                          <Text style={mystyles.closeText}>✕</Text>
                        </TouchableOpacity>

                            <ExpenseForm inputdata={xpData} isAdd={false} onClose={()=>setModalVisible(false)} />
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>

 </>
  )
}

export default IncomeItem

