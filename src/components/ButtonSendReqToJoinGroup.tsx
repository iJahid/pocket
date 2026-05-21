import { supabase } from '@/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ButtonSendReqToJoinGroup = ({grpid,owner,email,userid}) => {


const [showReqButton,setShowReqButton]=useState(true);
   // console.log(grpid);

    
    


      const onSendRequest=async ()=>{
    console.log(grpid,email,owner,userid)

    setShowReqButton(false);
        const {data,error}=await supabase.from("groupjoin_request").insert({
          group_id: grpid,
          email:email,
          owner:owner,
          request_by:userid

        })

        console.log('send request',data,error)
        if(!error)
        {
          setShowReqButton(false);
        }
        else
        {
          setShowReqButton(true);
        }
  }

  return (
    
        <View style={{flex:2,minWidth:60,justifyContent:'center',flexDirection:'row'}}    >
            {!showReqButton? (<><Text style={{paddingRight:3}}>Sent</Text><FontAwesome name='check-circle' size={20}/></>):
        (<TouchableOpacity onPress={()=>onSendRequest()}  style={{flex:2,flexDirection:'row',alignContent:'flex-end',justifyContent:'flex-end',padding:5}}>
         <Text style={{paddingRight:3}}>Send Request</Text><FontAwesome name='play-circle' color={'red'} size={20}/></TouchableOpacity>)}
         </View>
      )




}

export default ButtonSendReqToJoinGroup