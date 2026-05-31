import { useCreateTrans, useUpdateTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { expDataTypeDB } from '@/types'
import Colors from '@constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Dropdown } from "react-native-element-dropdown"




const CatgoryList = [
  { label: 'Bazar' },
  { label: 'Regular' },
  { label: 'Nasta' },
  { label: 'Shopping' },
  { label: 'Bonus' },
   { label: 'Medicine' },
     { label: 'Utility' },
       { label: 'Education' },
         { label: 'Salary' },

];


const ItemList = [
    { label: 'Rice' },
  { label: 'Egg' },
  { label: 'Cigarate' },
  { label: 'ChaaPani' },
  { label: 'Bread' },
  { label: 'Coacacola' },
  { label: 'Meat' },
  { label: 'Fish' },
  { label: 'Dithy' },
   { label: 'Myself' },
    { label: 'Dahik' },
     { label: 'Sadit' },
          { label: 'Shabana' },
          { label: 'Suman(CT)' },
            { label: 'AC' },
       { label: 'Grill' },
        { label: 'Chicken' },
         { label: 'Honda' },
          { label: 'Car' },
        { label: 'Other' },
       
        { label: 'Electric' },
        { label: 'Gas' },
        { label: 'Water' },
         { label: 'Internet' },
         { label: 'Water Filter' },
           { label: 'Sweats' },
                 { label: 'Gift' },
];
const ExpenseForm = ({inputdata,isAdd,onClose}) => {

    const [isChecked, setChecked] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const [date, setDate] = useState(new Date());
    const [selectedCategory, setCategory] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<expDataTypeDB>()

    const { mutate: createTrans,isPending,isSuccess } = useCreateTrans('XP');
    const { mutate: updateTrans,isPending:isUpdating } = useUpdateTrans('XP');



useEffect(()=>{
  //console.log('Form Add Option',isAdd)
  //console.log('Form  Data',inputdata,inputdata?.xntype)
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
                xndate: xpData?.xndate,
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
                                      
                                      setShowDatePicker(true)
                                      

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
            setXpData(prev => ({ ...prev, xndate: selectedDate }))
            setShowDatePicker(false);
          }
           if (event.type === 'dismissed') {
            setShowDatePicker(false)
           }
        }}
        
      />
    )}

                              
                              </TouchableOpacity>

                          
                             </View>
                              
                              </View>
                               
                               <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Category : </Text>
                                  
                                 <Dropdown
  
                                    data={CatgoryList}
                                    labelField="label"
                                    valueField="label"
                                    search={false}
                                    placeholder="Select Category"
                                    value={xpData?.category}
                                    style={mystyles.expInput}
                                    onChange={value => setXpData(prev => ({ ...prev, category: value.label }))}
                                  />
                              </View>
                                <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Item : </Text>
                                   <Dropdown
  
                                    data={ItemList}
                                    labelField="label"
                                    valueField="label"
                                    autoScroll={true}
                                    search={true}
                                    placeholder="Select Item"
                                    value={xpData?.item}
                                    style={mystyles.expInput}
                                    onChange={value => setXpData(prev => ({ ...prev, item: value.label }))}
                                  />
                                 
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

export default ExpenseForm