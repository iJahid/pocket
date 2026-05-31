import { useCreateTrans, useUpdateTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Dropdown } from "react-native-element-dropdown"







const ItemList = [
  { label: 'Wallet',value:'wallet' },
  { label: 'Cash',value:'cash' },
  { label: 'Bank' ,value:'bank'},
  { label: 'Opening' ,value:'op'},
  
];




const BankForm = ({inputdata,isAdd,onClose}) => {
    const {profile}=useAuth();
    const [isChecked, setChecked] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const [date, setDate] = useState(new Date());
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemLabel, setSelectedItemLabel] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [selectedCategoryLabel, setCategoryLabel] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<expDataTypeDB>()

    const { mutate: createTrans,isPending,isSuccess } = useCreateTrans('XCH');
    const { mutate: updateTrans,isPending:isUpdating } = useUpdateTrans('XCH');



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
      const xnType=selectedCategory.toLowerCase();;
      const xnType2=selectedItem.toLowerCase();

      
      
      
      const Acc1:string=selectedCategoryLabel;
      const Acc2:string=selectedItemLabel;
      

      //console.log('Item Label',selectedItemLabel)
     /*
      
      Cash +  from Wallet  inout=-1 xntype='wallet'  Category='wallet -' item= 'from Wallet'
      Cash -  to Wallet  inout=1 xntype='wallet'  Category='wallet +' item= 'to Wallet'

      Cash +  from bank  inout=-1 xntype='cash'  Category='cash -' item= 'from Bank A/C'
      Cash -  to bank  inout=1 xntype='cash'  Category='cash +' item= 'to Bank A/C'

      
      Bank +  from bank  inout=-1 xntype='bank'  Category='Bank Ac1 -' item= 'from Bank A/C2'
      Bank -  from bank  inout=-1 xntype='bank'  Category='Bank Ac1 -' item= 'from Bank A/C2'
      Bank +  from cash  inout=1 xntype='cash'  Category='cash +' item= 'to Bank A/C'
      Bank -  to cash  inout=1 xntype='cash'  Category='cash +' item= 'to Bank A/C'
      Bank +  from wallet  inout=1 xntype='cash'  Category='cash +' item= 'to Bank A/C'
      Bank -  from wallet  inout=1 xntype='cash'  Category='cash +' item= 'to Bank A/C'



     */
      
      /* 2 transactions at a time */
      if(xnType!=='op')
      {
        /* From Acccount */
      const error=  createTrans({

                        xndate:xpData?.xndate,
                    category:Acc1,
                    item:Acc2,    
                    amount:xpData?.amount,
                    notes:xpData?.notes,
                    xntype:xnType,
                    user_id:profile?.id,
                    bankid:0,
                    xninout:-1,
                    xn_for:'XCH',
                    bank_name:'',


                          });
                          console.log('from Account',error)
    } 
    
      if(xnType2!=='op')
      {
        /* To Acccount */
        
      const error1=  createTrans({

                        xndate:xpData?.xndate,
                    category:Acc2,
                    item:Acc1,    
                    amount:xpData?.amount,
                    notes:xpData?.notes,
                    xntype:xnType2,
                    user_id:profile?.id,
                    bankid:0,
                    xninout:1,
                    xn_for:'XCH',
                    bank_name:'',


                          });
                          console.log('To Account',error1)
    } 
         
     
    

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
        }}
       
      />
    )}

                              
                              </TouchableOpacity>

                               
                             </View>
                              
                              </View>
                                <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>From : </Text>
                                   <Dropdown
  
                                    data={ItemList}
                                    labelField="label"
                                    valueField="value"
                                    autoScroll={true}
                                
                                    placeholder="Select Item"
                                    value={xpData?.category}
                                    style={mystyles.expInput}
                                    onChange={
                                      (value) =>{ 

                                          setCategory(value.value)
                                          setCategoryLabel(value.label)

                                      }}
                                  />
                                 
                              </View>
                            

                              
                              <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>Amount : </Text>
                                  <TextInput value={ xpData?.amount?.toString()  } keyboardType='numeric' 
                                  style={mystyles.expInput}
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, amount: value }))}></TextInput>
                              </View>
                                <View style={mystyles.expInputView}>
                                  <Text style={{width:'25%'}}>To : </Text>
                                   <Dropdown
  
                                    data={ItemList}
                                    labelField="label"
                                    valueField="value"
                                    autoScroll={true}
                                 
                                    placeholder="Select Item"
                                    value={xpData?.item}
                                    style={mystyles.expInput}
                                    onChange={
                                      
                                        value => {
                                          setSelectedItem(value.value)
                                          setSelectedItemLabel(value.label)
                                        }


                                    }
                                  />
                                 
                              </View>
                              <View style={mystyles.expInputView}>
                                    <Text style={{width:'25%'}}>Notes : </Text>
                                    <TextInput value={xpData?.notes} style={mystyles.expInput} 
                                        onChangeText={(value) => setXpData(prev => ({ ...prev, notes: value }))}></TextInput>
                              </View>  

                                  
                              <View style={mystyles.expInputView}>
                                 

                               
                                  

                       
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

export default BankForm