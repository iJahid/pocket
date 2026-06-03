import { useCreateTrans, useUpdateTrans } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import Colors from '@constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import Collapsible from 'react-native-collapsible'
import { Dropdown } from 'react-native-element-dropdown'
type CatgoryList = {
  listitem:string;
}

/*
[
  { label: 'Bazar' },
  { label: 'Regular' },
  { label: 'Nasta' },
  { label: 'Shopping' },
  { label: 'Bonus' },
   { label: 'Medicine' },
     { label: 'Utility' },
       { label: 'Education' },
         { label: 'Salary' },

];*/

/*
const ItemList = {[
{id:'1', title: 'Rice' },
{ id:'2', title: 'Egg' },
{ id:'3', title: 'Cigarate' },
]}
/*
{ id:'4', title: 'ChaaPani' },
{ id:'5', title: 'Bread' },
{ id:'6', title: 'Coacacola' },
{ id:'7', title: 'Meat' },
{ id:'8', title: 'Fish' },
{ id:'9', title: 'Dithy' },
{ id:'10', title: 'Myself' },
{ id:'11', title: 'Dahik' },
{ id:'12', title: 'Sadit' },
{ id:'13', title: 'Shabana' },
{ id:'14', title: 'Suman(CT)' },
{ id:'15', title: 'AC' },
{ id:'16', title: 'Grill' },
{ id:'17', title: 'Chicken' },
{ id:'18', title: 'Honda' },
{ id:'19', title: 'Car' },
{ id:'20', title: 'Other' },
{ id:'21', title: 'Electric' },
{ id:'22', title: 'Gas' },
{ id:'23', title: 'Water' },
{ id:'24', title: 'Internet' },
{ id:'25', title: 'Water Filter' },
{ id:'26', title: 'Sweats' },
{ id:'27', title: 'Gift' },
]};
*/

const ExpenseForm = ({inputdata,isAdd,onClose}) => {
   const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dataSet = [
    { id: '1', title: 'Apples' },
    { id: '2', title: 'Bananas' },
    { id: '3', title: 'Cherries' },
  ];
    const {profile}=useAuth();
    const [isChecked, setChecked] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategoryIetms] = useState<CatgoryList[]>([]);

    const [itemList,setItemList]=useState();
    const [date, setDate] = useState(new Date());
    const [selectedCategory, setCategory] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<expDataTypeDB>()

    const { mutate: createTrans,isPending,isSuccess } = useCreateTrans('XP');
    const { mutate: updateTrans,isPending:isUpdating } = useUpdateTrans('XP');


    const getCategory=async()=>{
     const {data:catgaroy,error:catgError} =await supabase
                                            .from("datalists")
                                            .select('listitem')
                                            .eq('list_type','CATGORY')
                                            .or(`list_type.eq.CATGORY,and(list_type.eq.CATGORY,user_id.eq.${profile?.id})`);
      console.log(catgaroy,catgError);
     
        if(!catgError)
        {
          setCategoryIetms(catgaroy as any[])
        }
      const arr =  catgaroy?.map(item => ({
       id: String(item.listitem),
        title: item.listitem
  }));
  setItemList(arr as any)
  console.log('ItemList',arr)

      
    }

useEffect(()=>{
  getCategory();
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
    <AutocompleteDropdownContextProvider>
    <View style={[mystyles.modalView,{gap:5,overflow:'visible',minHeight:400}]}>
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


      {/*Category Row*/}
      <View style={mystyles.expInputView}>
        <Text style={{width:'25%'}}>Category : </Text>
        <Dropdown
          data={category}
          labelField="listitem"
          valueField="listitem"
          search={false}
          placeholder="Select Category"
          value={xpData?.category}
          style={mystyles.expInput}
          onChange={value => setXpData(prev => ({ ...prev, category: value.listitem }))}
        />
      </View>



      {/*Item Row*/}
      <View style={mystyles.expInputView}>
        <Text style={{width:'25%'}}>Item : </Text>
        
        
            <View style={{overflow:'visible'}}>
              

              <AutocompleteDropdown
                dataSet={itemList}
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                direction='down'
                initialValue={{ id: 'Rice' }}
                onSelectItem={(item) => {
                        if (item) {
                                  setXpData(prev => ({ ...prev, item: item.title }))
                                  console.log("Selected Item:", xpData);
                            }
                            }
                  }
                
                suggestionsListMaxHeight={150}
                textInputProps={{
                              placeholder: "Type Item name...",
                              autoCorrect: true,
                              autoCapitalize: "none",
                              style: {
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                height: 50,

                                backgroundColor: "#fdfdfd",
                                width: 205,
                            
                              }
                            }}
                suggestionsListContainerStyle={{
                   
                      left:-15,
                       elevation:9999,
                       zIndex:99999,
                        backgroundColor:'rgba(61, 5, 5, 0.87)',
                        marginTop:30
                        
                      }}
                    // optional styling
                    suggestionsListTextStyle={{
                      fontSize: 14,
                       color: '#faf7f7'
                    }}
                                                
              />

            
            </View>
        
        
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

      {/*Transaction  Type*/}                
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
          <Text style={{fontSize:15,color:(xpData?.xntype==='bank')?'white': Colors.light.tint}}>Bank</Text>
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


    </View>

                           
   </AutocompleteDropdownContextProvider>                           

        
   

</>
    
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
  modalContainer: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10, minHeight: 300 },
  modalTitle: { fontSize: 18, marginBottom: 15, fontWeight: 'bold' }
});