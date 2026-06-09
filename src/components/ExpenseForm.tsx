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
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

type CatgoryList = {
  listitem:string;
}



const ExpenseForm = ({inputdata,isAdd,onClose}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [modalVisibleItem, setModalVisibleItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
 

    const {profile}=useAuth();
    const [newCategory, setNewCategory] = useState("");
    const [newItem, setNewItem] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategoryIetms] = useState<CatgoryList[]>([]);

    const [itemList,setItemList]=useState<CatgoryList[]>([]);
    const [date, setDate] = useState(new Date());
    const [selectedCategory, setCategory] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [xpData,setXpData]=useState<expDataTypeDB>()

    const { mutate: createTrans,error:createError,isPending,isSuccess } = useCreateTrans('XP');
    const { mutate: updateTrans,error:updateError,isPending:isUpdating } = useUpdateTrans('XP');

const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(itemList);
    const getCategory=async()=>{
     const {data:catgaroy,error:catgError} =await supabase
                                            .from("datalists")
                                            .select('listitem')
                                           .or(`and(list_type.eq.CATGORY,user_id.is.null),and(list_type.eq.CATGORY,user_id.eq.${profile?.id})`)
                                            .order('listitem',{ascending:true});
    //  console.log(catgaroy,catgError);
     
        if(!catgError)
        {
          setCategoryIetms(catgaroy as any[])
        }
      
         const {data:itemList,error:ItemListError} =await supabase
                                            .from("datalists")
                                            .select('listitem')
                                            .or(`and(list_type.eq.ITEM,user_id.is.null),and(list_type.eq.ITEM,user_id.eq.${profile?.id})`)
                                            .order('listitem',{ascending:true});
 
        setItemList(itemList as any);

      
    }

useEffect(()=>{
  getCategory();
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

    if(xpData?.amount<=0)
            {
            Alert.alert("Amount","Amount Is Not Correct");
            return;
            }
  if(!xpData?.category)
            {
            Alert.alert("Category","Category Is Not Correct");
            return;
            }
  if(!xpData?.item)
            {
            Alert.alert("Item","Item Is Not Correct");
            return;
            }

     createTrans(xpData);
       if(createError)
       {
        Alert.alert('Error', 'Failed to create transaction. Please try again.');
       }
       else
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
              
              if(updateError)
              {
                Alert.alert('Error', `Failed to update transaction. Please try again.${updateError}`);
              }
              else
              {
                console.log('Update Result',data)       ;
                onClose();
              }
    

}



const CreateCatg=async ()=>{
  console.log(newCategory);
  if(newCategory.trim()==='')
{
  Alert.alert('Error', 'Please enter a category name');
  return;
}
  const {error}= await supabase.from("datalists").insert({
    listitem:newCategory,
    list_type:'CATGORY',
    user_id:profile?.id
  }).select()
  console.log(error)
  getCategory();
}

const CreateItem=async()=>{
  console.log(newItem);
if(newItem.trim()==='')
{
  Alert.alert('Error', 'Please enter an item name');
  return;
}
  const {error}= await supabase.from("datalists").insert({
    listitem:newItem,
    list_type:'ITEM',
    user_id:profile?.id
  }).select()
  console.log(error)
  getCategory();
}


 const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredData(itemList);
      return;
    }

    const formatQuery = text.toLowerCase();
    const newData = itemList.filter((item) => {
      const itemName = item.listitem.toLowerCase();
      return itemName.includes(formatQuery);
    });

    setFilteredData(newData);
  };


  return (
    <>
   
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
        <TouchableOpacity style={{width:'100%'}} onPress={()=>setModalVisible(true)}>
          <TextInput value={ xpData?.category } style={mystyles.expInput} editable={false} 
                    onChangeText={(value) => setXpData(prev => ({ ...prev, category: value }))}></TextInput>
        </TouchableOpacity>
        
      </View>



      {/*Item Row*/}
     <View style={mystyles.expInputView}>
        <Text style={{width:'25%'}}>Item : </Text>
        <TouchableOpacity style={{width:'100%'}} onPress={()=>setModalVisibleItem(true)}>
          <TextInput value={ xpData?.item }  style={mystyles.expInput} editable={false} 
                    onChangeText={(value) => setXpData(prev => ({ ...prev, item: value }))}></TextInput>
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


    {/*Collapsable Bank Information         
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
    End of COllapsable bank INformation */}                              


    <View style={{ alignItems:'center'}}>
                          <TouchableOpacity style={{ borderRadius:5,flexDirection:'row',
                           backgroundColor:'#e1e9bf',padding:10,paddingLeft:10,width:100 }}
                            
                            onPress={()=>
                             
                             
                                
                              isAdd?CreateExpenses():  UpdateExpenses(xpData?.id)
                              
                            
                            
                          
                        }
                            >
                            <Ionicons name='save' size={20}/>
                            <Text style={{fontSize:16}}>  {isAdd?'Add':'Update'}</Text></TouchableOpacity>
    </View>                               


    </View>

                           
     <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle="fullScreen" // Crucial for iOS full screen
        onRequestClose={() => setModalVisible(false)} // Handles Android back button
      >
                 <TouchableOpacity style={mystyles.closeButton} onPress={() => {
                  
                  setModalVisible(false)
                 }
                  }>
                                          <Text style={mystyles.closeText}>✕</Text>
                                        </TouchableOpacity>
        <Text style={{fontSize:25,padding:5,marginTop:10,color:'green'}}>Categories</Text>
        <View style={{padding:10}}><Text style={{color:'blue',fontStyle:'italic'}}>Not In The List Add New</Text>
            <View style={{flexDirection:'row',gap:6}}>
              <KeyboardAvoidingView>
              <TextInput placeholder='New Category' style={{borderWidth:0.5,borderColor:'#ccdd',width:250,marginLeft:30}}
                value={newCategory} onChangeText={(value)=>setNewCategory(value)}/>
              <TouchableOpacity onPress={()=>CreateCatg()}><FontAwesome name='plus-circle' size={35} color={'green'}/></TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
          
          </View>
          
        <View style={[styles.modalView,{flex:1}]}>
          <FlatList
          data={category}
          renderItem={({item})=>
          (
          <TouchableOpacity style={{flex:1,borderWidth:0.5,borderColor:'#ccdd',padding:8,width:600}}
          onPress={() =>{ 
            console.log(item);
            setXpData(prev => ({ ...prev, category: item.listitem }))
            setModalVisible(false)
            }}>
          <Text style={{fontSize:16,paddingLeft:15}}>{item.listitem}</Text>
          </TouchableOpacity>
          )}
          
          
          />
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      
       <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleItem}
        presentationStyle="fullScreen" // Crucial for iOS full screen
        onRequestClose={() => setModalVisibleItem(false)} // Handles Android back button
      >
                 <TouchableOpacity style={mystyles.closeButton} onPress={() => {
                  
                  setModalVisibleItem(false)
                 }
                  }>
                                          <Text style={mystyles.closeText}>✕</Text>
                                        </TouchableOpacity>
        <View style={[styles.modalView,{flex:1}]}>
          
      <Text style={{fontSize:25,padding:5,marginTop:10,color:'green'}}>Items</Text>

      <View style={{padding:10}}><Text style={{color:'blue',fontStyle:'italic'}}>Not In The List Add New</Text>
      
          <View style={{flexDirection:'row',gap:6}}>
            <KeyboardAvoidingView style={{flexDirection:'row',gap:6}}>
            <TextInput placeholder='New Item' style={{borderWidth:0.5,borderColor:'#ccdd',width:300}}
            value={newItem} onChangeText={(value)=>setNewItem(value)}/>
            <TouchableOpacity onPress={()=>CreateItem()}><FontAwesome name='plus-circle' size={35} color={'green'}/></TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          
          </View>

       <FlatList
  data={itemList}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, borderWidth: 0.5, borderColor: '#ccdd', padding: 8 }}
      onPress={() => {
        console.log(item);
        setXpData(prev => ({ ...prev, item: item.listitem }));
        setModalVisibleItem(false);
      }}
    >
      <Text style={{ fontSize: 16, paddingLeft: 15 }}>{item.listitem}</Text>
    </TouchableOpacity>
  )}
  contentContainerStyle={{ gap: 2, padding: 5 }}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
  
  /* ADD THIS LINE TO FORCE FULL WIDTH */
  style={{ width: '100%' }} 
/>

          
          <TouchableOpacity style={styles.button} onPress={() => setModalVisibleItem(false)}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

        
   

</>
    
  )
}

export default ExpenseForm

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