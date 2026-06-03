import { useCreateGroupTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { xGroupTypeDBAdd } from '@/types'
import Colors from '@constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'




const ExchangeForm = ({inputdata,onClose}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [modalVisibleItem, setModalVisibleItem] = useState(false);

 

    const {profile}=useAuth();
    const [showDatePicker, setShowDatePicker] = useState(false);
    

    
    const [date, setDate] = useState(new Date());

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<xGroupTypeDBAdd>()

    const { mutate: createTrans,isPending,isSuccess } = useCreateGroupTrans('XCH');
    


  
   

useEffect(()=>{
  
  //console.log('Form Add Option',isAdd)
  //console.log('Form  Data',inputdata,inputdata?.xntype)
  setXpData(inputdata);
  if(inputdata?.xntype==='bank'){
    setIsCollapsed(false)
  }


  
},[])
if(isPending)
{
  return <ActivityIndicator/>
}




const CreateExchange=async()=>{
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

const UpdateExchange=async(id)=>{
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
   
    <View style={[mystyles.modalView,{gap:5,overflow:'visible',minHeight:400}]}>
       <View style={mystyles.expInputView}>
        <Text style={{fontSize:18,fontWeight:700}}>Add Exchange</Text>
       </View>
      <View style={mystyles.expInputView}>
        <TouchableOpacity      onPress={() =>{setShowDatePicker(true)} }   >
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


      {/*Transaction  Type*/}                
      <View style={[mystyles.expInputView,{justifyContent:'center',gap:6}]}>
        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_from==='wallet')?Colors.light.tint:  'transparent'}]}
                          onPress={()=>{
                           // setIsCollapsed(true)
                            setXpData(prev => ({ ...prev, catg_from: 'wallet' }))}
                            }>
            <Ionicons name='wallet' size={30} color={(xpData?.catg_from==='wallet')?'white':'#ee710b'}/>
            <Text style={{fontSize:15,color:(xpData?.catg_from==='wallet')?'white': Colors.light.tint}}>Wallet</Text>
        </TouchableOpacity>
                                  
        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_from==='cash')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    //setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, catg_from: 'cash' }))}
                                    }>
          <FontAwesome name='money' size={30} color={(xpData?.catg_from==='cash')?'white':'#ee710b'}/>
          <Text style={{fontSize:15,color:(xpData?.catg_from==='cash')?'white': Colors.light.tint}}>Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_from==='bank')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    //setIsCollapsed(false)
                                    setXpData(prev => ({ ...prev, catg_from: 'bank' }))}
                                    }>
          <FontAwesome name='bank' size={30} color={(xpData?.catg_from==='bank')?'white':'#ee710b'}/>
          <Text style={{fontSize:15,color:(xpData?.catg_from==='bank')?'white': Colors.light.tint}}>Bank</Text>
        </TouchableOpacity>
                                  

                       
      </View>   


      {/*Amount Row*/} 
      <View style={[mystyles.expInputView,{justifyContent:'center',gap:6}]}>
        
        
        <FontAwesome name='download' size={24} color='#1e6ee6'/>
        
        
       
      </View>

      
      {/*Transaction  Type*/}                
      <View style={[mystyles.expInputView,{justifyContent:'center',gap:6}]}>
        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_to==='wallet')?Colors.light.tint:  'transparent'}]}
                          onPress={()=>{
                           // setIsCollapsed(true)
                            setXpData(prev => ({ ...prev, catg_to: 'wallet' }))}
                            }>
            <Ionicons name='wallet' size={30} color={(xpData?.catg_to==='wallet')?'white':'#ee710b'}/>
            <Text style={{fontSize:15,color:(xpData?.catg_to==='wallet')?'white': Colors.light.tint}}>Wallet</Text>
        </TouchableOpacity>
                                  
        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_to==='cash')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                   // setIsCollapsed(true)
                                    setXpData(prev => ({ ...prev, catg_to: 'cash' }))}
                                    }>
          <FontAwesome name='money' size={30} color={(xpData?.catg_to==='cash')?'white':'#ee710b'}/>
          <Text style={{fontSize:15,color:(xpData?.catg_to==='cash')?'white': Colors.light.tint}}>Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[mystyles.txnType,{backgroundColor:(xpData?.catg_to==='bank')?Colors.light.tint:  'transparent'}]}
                                    onPress={()=>{
                                    //setIsCollapsed(false)
                                    setXpData(prev => ({ ...prev, catg_to: 'bank' }))}
                                    }>
          <FontAwesome name='bank' size={30} color={(xpData?.catg_to==='bank')?'white':'#ee710b'}/>
          <Text style={{fontSize:15,color:(xpData?.catg_to==='bank')?'white': Colors.light.tint}}>Bank</Text>
        </TouchableOpacity>
                                  

                       
      </View>   
  {/*Amount Row*/} 
      <View style={mystyles.expInputView}>
        <Text style={{width:'25%'}}>Amount : </Text>
        <TextInput value={ xpData?.amount?.toString()  } keyboardType='numeric'  style={mystyles.expInput}
                    onChangeText={(value) => setXpData(prev => ({ ...prev, amount: value }))}></TextInput>
      </View>

      {/*Notes Row*/} 
      <View style={mystyles.expInputView}>
        <Text style={{width:'25%'}}>Notes : </Text>
        <TextInput value={xpData?.notes} style={mystyles.expInput} 
                  onChangeText={(value) => setXpData(prev => ({ ...prev, notes: value }))}></TextInput>
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
                            
                            onPress={()=>CreateExchange()
                              
                            
                            
                          
                        }
                            >
                            <Ionicons name='save' size={20}/>
                            <Text style={{fontSize:16}}>  Add</Text></TouchableOpacity>
    </View>                               


    </View>

                           
     
      
      
       

        
   

</>
    
  )
}

export default ExchangeForm

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1, // Ensures content takes up all available space
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
  },
   searchBar: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 16,
    fontSize: 16,
  },
});