import { mystyles } from '@/lib/styles'
import { expDataType } from '@/types'
import Colors from '@constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


const [CatgoryList] = useState([
  'Bazar',
  'Regular',
  'Loan',
  
]);


const ExpenseItem = ({expData}:expDataType) => {


const [date, setDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setCategory] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [xpData,setXpData]=useState<expDataType>({
     expdate:'',
category:'',
item:'',
amount:'',
notes:'',
expType:'',
bankID:'',
isAdd:false
})





  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

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


  return (<>
<View>
                        <TouchableOpacity style={mystyles.row} onPress={()=>setModalVisible(true)}>
                        
                        {/******** */}

                       
                        <View style={[mystyles.rowLabel,
                          {flex:4,flexDirection:'row',
                           width:'80%',maxWidth:'80%',
                           
                           }]}>
                            
                          <View style={{width:'32%',padding:2}}> 
                            <Text>{xpData?.expdate}</Text>
                            </View>
                          <View style={{width:'20%',padding:2}}> 
                            <Text numberOfLines={2} style={{color:'#620ffc'}}>{xpData?.category}  </Text>
                          </View>
                          <View style={{width:'45%',padding:2}}> 
                          <Text numberOfLines={2}>{xpData?.item}</Text>
                          </View>
                        </View>
                          {(xpData?.expType=='cash') && <FontAwesome name='money' size={20} color={'green'} style={{paddingRight:3}}/>    }    
                          {(xpData?.expType=='bank') && <FontAwesome name='bank' size={20} color={'green'} style={{paddingRight:3}}/>    }    
                          {(xpData?.expType=='pocket') && <Ionicons name='wallet-outline' size={20} color={'green'} style={{paddingRight:3}}/>    }    

                         
                        <Text style={{paddingEnd:6,color:'#0a7c39',fontSize:16,width:70,textAlign:'right'}}>{xpData?.amount}</Text>
                        <TouchableOpacity style={{alignItems:'flex-end'}}>
                              <FontAwesome name='minus-circle' color={'red'} size={20}/>
                        </TouchableOpacity>
                          

                        {/******** */}


                        
                    </TouchableOpacity>
                     <View style={mystyles.rowLast}/>





                     </View>
                    
                    <Modal visible={isModalVisible} transparent={true} animationType="slide">
                      <View style={styles.overlay}>
                        <View style={styles.modalContent}>
                          {/* Close Button */}
                          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>✕</Text>
                          </TouchableOpacity>

                          {/*****Expense Item Entry Information***** */}                

                          <View style={[mystyles.modalView,{gap:5}]}>
                            <View style={{flexDirection:'row',gap:4}}>
                             {/* <Checkbox status={isChecked ? 'checked' : 'unchecked'}  onPress={() => {     setChecked(!isChecked);      }}/>*/}
                              <View>
                              <TouchableOpacity      onPress={() => setShowDatePicker(true)}   >
                              <Text style={{fontSize:18,textAlign:'center',color:'#7002ff',fontWeight:700}}> Now  {xpData.expdate}</Text>
                              </TouchableOpacity>
                              </View>
                               
                               <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Category : </Text>
                                  <TextInput value={xpData?.category} style={mystyles.expInput} 
                                      onChangeText={(value) => setXpData(prev => ({ ...prev, item: value }))}></TextInput>
                                  {/*<Dropdown
  
                                    data={CatgoryList}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Category"
                                    value={selectedCategory}
                                    style={{ width: 300, height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 }}
                                    onChange={(value) => setXpData(prev => ({ ...prev, category: value }))}
                                  />*/}
                              </View>

                              <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Amount : </Text>
                                  <TextInput value={xpData?.amount} style={mystyles.expInput} 
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, amount: value }))}></TextInput>
                              </View>
                            
                              <View style={mystyles.expInputView}>
                                    <Text style={{width:'25%'}}>Notes : </Text>
                                    <TextInput value={xpData?.notes} style={mystyles.expInput} 
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, notes: value }))}></TextInput>
                              </View>  

                              {/* transaction type button*/}        
                              <View style={mystyles.expInputView}>
                                  <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData.expType==='wallet')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, expType: 'wallet' }))}
                                    }>
                                      <Ionicons name='wallet' size={22} color={(xpData.expType==='wallet')?'white':'#ee710b'}/>
                                      <Text style={{fontSize:16,color:(xpData.expType==='wallet')?'white': Colors.light.tint}}>Wallet</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData.expType==='cash')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, expType: 'cash' }))}}
                                    >
                                      <Ionicons     name={(xpData.expType==='cash')?'cash-outline':'cash'} size={22}  color={(xpData.expType==='cash')?'white':'#ee710b'}/>
                                      <Text style={{fontSize:16,color:(xpData.expType==='cash')?'white': Colors.light.tint}}>cash</Text>
                                  </TouchableOpacity>


                                  <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData.expType==='bank')?Colors.light.tint:  'transparent'}]}
                                      onPress={()=>{
                                      setIsCollapsed(false)
                                      setXpData(prev => ({ ...prev, expType: 'bank' }))}

                                      }>
                                        <FontAwesome name='bank' size={22} color={(xpData.expType==='bank')?'white':'#ee710b'}/>
                                        <Text style={{fontSize:16, color:(xpData.expType==='bank')?'white': Colors.light.tint}}>bank</Text>
                                  </TouchableOpacity>


                              </View>
                              {/* Transaction type button end*/}

                              {/**Collapsable Bank Information         
                              <Collapsible collapsed={isCollapsed}>
                                <TouchableOpacity style={[mystyles.expInputView,{justifyContent:'flex-end',borderWidth:1,borderColor:'#ccddee',padding:5,gap:6}]}>

                                    <Text>A/C ending with ..291</Text><Text style={{fontSize:20}}>bKash</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[mystyles.expInputView,{justifyContent:'flex-end',borderWidth:1,borderColor:'#ccddee',padding:5,gap:6}]}>
                                    <Text>A/C ending with ..291</Text><Text style={{fontSize:20}}>Brac Bank</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={[mystyles.expInputView,{justifyContent:'flex-end',borderWidth:1,borderColor:'#ccddee',padding:5,gap:6}]}>
                                      <Text>A/C ending with ..291</Text><Text style={{fontSize:20}}>DBBL</Text>

                                </TouchableOpacity>
                            </Collapsible>
                          **End of COllapsable bank INformation */}
                                            {/****Update Button */}
                          <View style={{flex:1, alignItems:'center'}}>
                          <TouchableOpacity style={{ borderRadius:5,flexDirection:'row',
                            borderWidth:1,backgroundColor:'#e1e9bf',padding:5,paddingLeft:10,width:100 }}>
                            <Ionicons name='save' size={20}/>
                            <Text style={{fontSize:16}}>  Update</Text></TouchableOpacity>
                          </View>

                            </View>
                          </View>
                          {/*****Expense Item Information***** */}                

{/*showDatePicker && (
      <DateTimePicker
        value={date}
        mode="date"
        style={{elevation:20,zIndex:99999}}
        display="default"
        onChange={(event, selectedDate) => {
          
          if (selectedDate) {
            setDate(selectedDate);
            setShowDatePicker(false);
          }
        }
          */}


                        </View>
                      </View>
                    </Modal>

 </>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 10,
    position: 'relative', // Ensures button is relative to this view
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});