import { useCreateTrans, useUpdateTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { expDataTypeDB } from '@/types'
import Colors from '@constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Dropdown } from "react-native-element-dropdown"




const CatgoryList = [
  { label: 'Loan' },
  
  
];


const ItemList = [
  { label: 'Person 1',value:1 },
  { label: 'Person 2' ,value:2},
  { label: 'Person 3' ,value:3},
  
];
const LaonForm = ({inputdata,isAdd,onClose}) => {

    const [isChecked, setChecked] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    

    const [date, setDate] = useState(new Date());
    
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<expDataTypeDB>()

    const { mutate: createTrans,isPending,isSuccess } = useCreateTrans();
    const { mutate: updateTrans,isPending:isUpdating } = useUpdateTrans();



useEffect(()=>{
  console.log('Form Add Option',isAdd)
  console.log('Form  Data',inputdata,inputdata?.xntype)
  setXpData(inputdata);
  if(inputdata?.xntype==='bank'){
    setIsCollapsed(false)
  }
  if(isAdd==false)
    {setChecked(false)}

  
},[])
if(isPending)
{
  return <ActivityIndicator/>
}

if(isUpdating)
{
  return <ActivityIndicator/>
}



const CreateExpenses=async()=>{
 // const isoDate = xpData?.xndate.toISOString();

  //console.log( xpData)
       
         /*   const {data,error}=await supabase
                                    .from('transactions')
                                    .insert(
                                              xpData
                                  
                                  
                                              )*/

      const error=  createTrans(xpData);
       if(!error)
       {
        onClose();
       }
        
         
     
    

}

const UpdateExpenses=async(id)=>{
 // const isoDate = xpData?.xndate.toISOString();

  console.log("Updatign", xpData)
       
          /*  const {data,error}=await supabase
                                    .from('transactions')
                                    .update(xpData).eq('id',xpData?.id)*/
         const data=     updateTrans({id:id,updatedFields: {
                category:xpData?.category,
                item:xpData?.item,
                amount:xpData?.amount,
                xntype:xpData?.xntype,
                notes:xpData?.notes

              }})
                    console.log('Update Result',data)       ;
              onClose();
    

}

  return (
    <>
         
                        

                          <View style={[mystyles.modalView,{gap:5}]}>
                          
                            
                            <View style={mystyles.expInputView}>
                           
                                <TouchableOpacity      onPress={() =>{
                                      if(!isChecked){
                                      setShowDatePicker(true)
                                      }

                                } }   >
                                  <Text style={{fontSize:18,textAlign:'center',color:'#7002ff',fontWeight:700}}> 
                                      {dayjs(xpData?.xndate).format('ddd DD.MM.YY')}
                                      </Text>


 {showDatePicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          
          if (selectedDate) {
            setDate(selectedDate);
            setXpData(prev => ({ ...prev, xndate: selectedDate() }))
            setShowDatePicker(false);
          }

            if(event.type=='dismissed')
            {
               setShowDatePicker(false)}
            }
        }
        
      />
    )}

                              
                              </TouchableOpacity>

                              
                             </View>
                              
                              </View>
                               
                                <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Person : </Text>
                                   <Dropdown
  
                                    data={ItemList}
                                    labelField="label"
                                    valueField="label"
                                    autoScroll={true}
                                    
                                    placeholder="Select Person"
                                    value={xpData?.item}
                                    style={mystyles.expInput}
                                    onChange={value => setXpData(prev => ({ ...prev, item: value.label }))}
                                  />
                                 
                              </View>

                              <View style={{flex: 1,flexDirection:'row', marginLeft:120,minHeight:50,
    alignItems: 'center',
    justifyContent: 'center'}}> 
                              <Text style={{fontSize:18,fontWeight:700,
                                color:xpData?.xninout==1?'gray':'red'}}>Give  </Text>
                                <Switch
                                                  onValueChange={(value) => setXpData(prev => ({ ...prev, xninout: ((value===true)?1:-1) }))
                                                  
                                                  }
                                                  thumbColor={'#f4f3f4'}
                                                  ios_backgroundColor="#3e3e3e"
                                                  style={ {transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                                                  value={(xpData?.xninout==1) ?true:false} />
                                  <Text style={{width:100,marginRight:120,paddingLeft:20,fontSize:18,fontWeight:700,
                                    color:xpData?.xninout==1?'red':'gray'}}>Take</Text>
                                 
                              </View>
                              <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Amount : </Text>
                                  <TextInput value={ xpData?.amount?.toString()  } keyboardType='numeric' 
                                  style={mystyles.expInput}
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, amount: value }))}></TextInput>
                              </View>
                            
                              <View style={mystyles.expInputView}>
                                    <Text style={{width:'25%'}}>Notes : </Text>
                                    <TextInput value={xpData?.notes} style={mystyles.expInput} 
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, notes: value }))}></TextInput>
                              </View>  

                                  
                              <View style={mystyles.expInputView}>
                                  <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.xntype==='wallet')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, xntype: 'wallet' }))}
                                    }>
                                      <Ionicons name='wallet' size={22} color={(xpData?.xntype==='wallet')?'white':'#ee710b'}/>
                                      <Text style={{fontSize:15,color:(xpData?.xntype==='wallet')?'white': Colors.light.tint}}>Wallet</Text>
                                  </TouchableOpacity>
                                  
                                <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.xntype==='cash')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, xntype: 'cash' }))}
                                    }>
                                      <Ionicons name='cash' size={22} color={(xpData?.xntype==='cash')?'white':'#ee710b'}/>
                                      <Text style={{fontSize:15,color:(xpData?.xntype==='cash')?'white': Colors.light.tint}}>Cash</Text>
                                  </TouchableOpacity>

                                <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.xntype==='bank')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    setIsCollapsed(false)
                                    setXpData(prev => ({ ...prev, xntype: 'bank' }))}
                                    }>
                                      <FontAwesome name='bank' size={22} color={(xpData?.xntype==='bank')?'white':'#ee710b'}/>
                                      <Text style={{fontSize:15,color:(xpData?.xntype==='bank')?'white': Colors.light.tint}}>BAnk</Text>
                                  </TouchableOpacity>
                                  

                       
                              </View>
                                     {/*Collapsable Bank Information         */}
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
                          {/*End of COllapsable bank INformation */}
                            

                             
                          <View style={{ alignItems:'center'}}>
                          <TouchableOpacity style={{ borderRadius:5,flexDirection:'row',
                            borderWidth:1,backgroundColor:'#e1e9bf',padding:5,paddingLeft:10,width:100 }}
                            
                            onPress={()=>
                             
                             
                                
                              isAdd?CreateExpenses():  UpdateExpenses(xpData?.id)
                              
                            
                            
                          
                              }
                            >
                            <Ionicons name='save' size={20}/>
                            <Text style={{fontSize:16}}>  {isAdd?'Add':'Update'}</Text></TouchableOpacity>
                           
                          </View>

                            
                      </>



    
  )
}

export default LaonForm