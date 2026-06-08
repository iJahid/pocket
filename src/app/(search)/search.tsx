import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDBUpdate } from '@/types'
import ExpenseItem from '@components/expenseItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'

const transType = [
  { label: 'Expense',value:'XP' },
  { label: 'Income',value:'IN' },
  { label: 'Loan' ,value:'LON'},
  { label: 'All' ,value:'all'},
  
];

const transMode = [
  { label: 'Wallet',value:'wallet' },
  { label: 'Cash',value:'cash' },
  { label: 'Bank' ,value:'bank'},
  { label: 'All' ,value:'all'},

  
];


const SearchTrans = () => {
   const now = new Date();
  const [loading, setLoading] = useState(false);
  const {profile}=useAuth()

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
   
   // const {data: xpData,isRefetching,refetch}=  useTransactionList('Last')
    const [seltransType,setTransType]=useState('all')
    const [seltransMode,setTransMode]=useState('all')
    const [category,setCategory]=useState('')
    const [item,setItem]=useState('')
    const [xpData, setXpData] = useState<expDataTypeDBUpdate[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [notes, setNotes] = useState('');
    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));

// End of current month in UTC
const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
 const [date, setDate] = useState(startOfMonth);
    const [date2, setDate2] = useState(endOfMonth);

       useEffect(() => {
        console.log('Setting default dates for search:', { startOfMonth, endOfMonth });
     setDate(startOfMonth);
     setDate2(endOfMonth);
     
    }, [])  
    const handleSearch=async ()=>{
      setLoading(true);
      console.log('Searching with:', {
        from: dayjs(date).format('YYYY-MM-DD'),
        to: dayjs(date2).format('YYYY-MM-DD'),
        type: seltransType,
        mode: seltransMode,
        category: category,
        item: item,
        notes: notes
      });

       const {data,error}=  await supabase
      .from('transactions') 
      .select('*')
      .eq('user_id', profile?.id)
      //.eq('xntype', seltransMode === 'all' ? undefined : seltransMode)
      //.eq('xn_for', seltransType === 'all' ? undefined : seltransType)
      .gte('xndate', dayjs(date).format('YYYY-MM-DD'))
      .lte('xndate', dayjs(date2).format('YYYY-MM-DD'))
      .ilike('category', `%${category}%`)
      .ilike('item', `%${item}%`)
      .ilike('notes', `%${notes}%`)
      let filteredData = data || [];
      if(seltransType !== 'all'){
        console.log('Filtering by type:', seltransType);
        filteredData = filteredData.filter((d) => d.xn_for === seltransType);
      }
      if(seltransMode !== 'all'){
        console.log('Filtering by mode:', seltransMode);
        filteredData = filteredData.filter((d)=>d.xntype.trim().toLowerCase() === seltransMode.trim().toLowerCase());
      }
      setXpData(filteredData);  
      
      const totalAmount1 = filteredData.reduce((sum, item) => sum + Number(item.amount), 0);
      setTotalAmount(totalAmount1);
     // console.log('Search result:',JSON.stringify(filteredData,null,2 ), 'Error:', error);
      setLoading(false);
    };

 

  return (
    
    <View style={{flex:1}}>



<View style={{flexDirection:'row',backgroundColor:'white'}}>
    <View style={{padding:10,flex:1}}>
      <View style={{flexDirection:'row',paddingLeft:10,marginBottom:5,marginTop:10}}>
        <TouchableOpacity      onPress={() =>{setShowDatePicker(true)} }   >
          <Text style={{fontSize:18,textAlign:'center',color:'#7002ff',fontWeight:700}}> 
            {dayjs(date).format('ddd DD.MM.YY')}
          </Text>
          {showDatePicker && (
            <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {

            if (selectedDate) {
            setDate(selectedDate);
            
            setShowDatePicker(false);
            }
            if (event.type === 'dismissed') {
            setShowDatePicker(false)
            }
            }}

            />
          )}


        </TouchableOpacity>
        <Text style={{fontWeight:700,paddingLeft:20,paddingRight:20,marginTop:3  }}>To</Text>
        <TouchableOpacity      onPress={() =>{setShowDatePicker2(true)} }   >
          <Text style={{fontSize:18,textAlign:'center',color:'#7002ff',fontWeight:700}}> 
            {dayjs(date2).format('ddd DD.MM.YY')}
          </Text>
          {showDatePicker2 && (
            <DateTimePicker
            value={date2}
            mode="date"
            display="default"
            onChange={(event, selectedDate2) => {

            if (selectedDate2) {
            setDate2(selectedDate2);
            
            setShowDatePicker2(false);
            }
            if (event.type === 'dismissed') {
            setShowDatePicker2(false)
            }
            }}

            />
          )}


        </TouchableOpacity>
        </View>

        
        <View style={{flexDirection:'row',marginBottom:5}}>

{
  transType.map((type)=>(
    <TouchableOpacity key={type.value} style={{padding:5,backgroundColor:(type.value === seltransType ? '#9cafc094' : '#eee'),borderRadius:5,marginHorizontal:5,width:65,alignItems:'center'}}
    onPress={() => setTransType(type.value)}
    >
      <Text>{type.label}</Text>
    </TouchableOpacity>
  ))
}
</View>
<View style={{flexDirection:'row',marginBottom:5}}>
{transMode.map((mode)=>(
  <TouchableOpacity key={mode.value} style={{padding:5,backgroundColor:(mode.value === seltransMode ? '#9cafc094' : '#eee') ,borderRadius:5,marginHorizontal:5,width:65,alignItems:'center'}}
  onPress={() => setTransMode(mode.value)}
  >
    <Text >{mode.label}</Text>
  </TouchableOpacity>
))

}


        </View>  
        </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',paddingRight:5}}>
          <TouchableOpacity style={{ flexDirection:'row',padding:10,backgroundColor:'#7002ff',borderRadius:5}} onPress={()=>handleSearch()}>
            <FontAwesome name="search" size={20} color="white" style={{marginRight:10}}/>
            <Text style={{color:'white',fontWeight:700}}>Search</Text>
          </TouchableOpacity>
          <View style={{padding:10,justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontWeight:700}}>Trans: {xpData.length}</Text>
              <Text style={{fontWeight:700}}> {totalAmount.toFixed(2)}</Text>
          </View>
          </View>

          </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10,backgroundColor:'white'}}>
          <TextInput placeholder='Category' style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10,flex:1,marginHorizontal:10}} value={category} onChangeText={setCategory} />
          <TextInput placeholder='Item/Person' style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10,flex:1,marginHorizontal:10}} value={item} onChangeText={setItem} />
          </View>
          <TextInput placeholder='Notes' style={{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10,flex:1,maxHeight:40}} value={notes} onChangeText={setNotes} />
          
      <FlatList style={{padding:10,backgroundColor:'white'}}
data={xpData}
extraData={loading}
renderItem={({item})=>(
<ExpenseItem expData={item}  />)}
   contentContainerStyle={{ flexGrow: 1 }}
   

      
  

/>
    </View>
  )
}

export default SearchTrans
