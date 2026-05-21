import { useDeleteOrder } from '@/api/orders';
import { mystyles } from '@/lib/styles';
import { supabase } from '@/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { defaultPizzaImage } from './ProductListItem';
import RemoteImage from './RemoteImage';
dayjs.extend(relativeTime);

const getTodayRange = () => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0); // Start of day UTC

  const end = new Date();
  end.setUTCHours(24, 0, 0, 0); // Start of next day UTC

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

type propItem={
  item:any;
  NoSelection:boolean;
  isArchive:boolean;
  isRequstList:boolean;
}

const BringItem = ({item,NoSelection,isArchive,isRequstList}:propItem) => {





  const [Checked,setChecked]=useState(false);


  
   const { mutate: deleteOrder } = useDeleteOrder();

  

const deleteItem=async (itemid)=>{

 /* const {error}=await supabase
  .from("orders")
  .delete()
  .eq('id',itemid)
*/
console.log('Item To Deklkete',itemid);
 const orderid=parseFloat(itemid);//typeof itemid === 'string' ? itemid  : itemid.id[0] );
 console.log('orderid',orderid)
     deleteOrder(orderid)
    
    
    



}


const setBought=async (item)=>{
  if(NoSelection)
  {
    return;
  }
  console.log(item.id,NoSelection);
  setChecked(!Checked)
  const { start, end } = getTodayRange();

  const {error}=await supabase
  .from("orders")
  .update({
    status:(item.status=='pending')?'bought':'pending',
    status_date:new Date().toISOString()

  })
  .eq('id',item.id)
  .gte('created_at', start)
  .lt('created_at', end);

  console.log(error)

}

const CheckBoxes=()=>{
      console.log('Item',item.status);




      if(isRequstList===false && isArchive===false) 
      {
        return (item.status==='bought' || Checked)? <FontAwesome name='check-circle' size={25} color={'#e44e09'}/>  :<FontAwesome name='square-o' size={25} color={'#c2cac2c4'}/>
      }
      else if(isRequstList===false && isArchive===true) 
      {
        return (item.status==='bought' )? <FontAwesome name='check-circle' size={25} color={'#e44e09'}/>  :<FontAwesome name='square-o' size={25} color={'#c2cac2c4'}/>
      }         
      else if(isRequstList===true ) 
      {
        return (item.status==='bought' )? <FontAwesome name='check-circle' size={25} color={'#e44e09'}/>  :<FontAwesome name='square-o' size={25} color={'#c2cac2c4'}/>
      } 
      else
        return <FontAwesome name='square-o' size={25} color={'#c2cac2c4'}/>


}

const DeleteButton=()=>{
      console.log('Item',item.status);




      if(isRequstList===false && isArchive===false) 
      {
        return (<TouchableOpacity style={{justifyContent:'center',padding:5}}
              onPress={()=>deleteItem(item.id)}>
                <FontAwesome name='minus-circle' size={25} color={'red'}/>
              </TouchableOpacity>)
      }
             
      else if(isRequstList===true && isArchive===false && (item.status!=='bought' )) 
      {
        return (<TouchableOpacity style={{justifyContent:'center',padding:5}}
              onPress={()=>deleteItem(item.id)}>
                <FontAwesome name='minus-circle' size={25} color={'red'}/>
              </TouchableOpacity>)
      } 
      else
        return <Text></Text>



      
}
  
  return (
    <View style={{flex:2,flexDirection:'row'}}>

        <TouchableOpacity  style={[mystyles.row,{height:60,flex:3,flexDirection:'row'}]}
        
        onPress={()=>setBought(item)}
        >
          
          <CheckBoxes/>
          

          
           <RemoteImage path={item.products.image} fallback={defaultPizzaImage} 
                                style={{height:60,aspectRatio:1}}           resizeMode="contain" />
             <View style={{flex:1,paddingLeft:4}}>
                <Text style={mystyles.rowLabel}> {item.products.name} </Text>
                <Text style={{fontSize:12,color:'#e44e09'}}>{dayjs(item.created_at).fromNow()}  </Text>    
            </View> 
             <Text style={[mystyles.rowLabel,{color:'rgb(148, 104, 9)',alignItems:'flex-end'}]}>
              {isRequstList?'to ':'by '}
               {item.orderby.name || item.orderby.email.split('@')[0]}
                </Text>
             
        </TouchableOpacity> 
        <DeleteButton/>
    </View>
  )
}

export default BringItem