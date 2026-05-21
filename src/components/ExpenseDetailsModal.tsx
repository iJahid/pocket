import { mystyles } from '@/lib/styles';
import { expDataType } from '@/types';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const [CatgoryList] = useState([
  'Bazar',
  'Regular',
  'Loan',
  
]);


const ExpenseDetailsModal = ({expData}) => {
      const [isCollapsed, setIsCollapsed] = useState(true);
      const [isChecked, setChecked] = useState(true);
const [showDatePicker, setShowDatePicker] = useState(false);

const [date, setDate] = useState<Date>(new Date());
const [selectedCategory, setCategory] = useState(null);
      const toggleExpanded = () => {
        setIsCollapsed(!isCollapsed);
      };
    

useEffect(()=>{


    setXpData(expData)
    console.log(xpData.expdate)
    // setDate(xpData.expdate)
    
},[])

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
    
    
  return (
    <View style={[mystyles.modalView,{gap:5}]}>
      <View style={{flexDirection:'row',gap:4}}>

        
            <TouchableOpacity      onPress={() => setShowDatePicker(true)}   >
              <Text style={{fontSize:18,textAlign:'center',color:'#7002ff',fontWeight:700}}> Now  {xpData.expdate}</Text>
            </TouchableOpacity>
      </View>
    </View>
      

          
          
         
           
    

        
        
    
  )
}

export default ExpenseDetailsModal