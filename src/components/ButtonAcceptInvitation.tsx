import { supabase } from '@/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ButtonAcceptInvitation = ({item,userId}) => {

    const [acceptInvitation,setAcceptInvitation]=useState(false);

    console.log(item);

    useEffect(()=>{
        if(item.status!=="pending")
        {
            setAcceptInvitation(true)
        }
    },[])
    


    const accept = async ()=>{
    
        if(acceptInvitation)
        {
            return;
        }

        setAcceptInvitation(false)
        //console.log('accepting',item,userId)
        const {error}=  await supabase
                            .from("group_members")
                            .insert({
                            group_id: item.group_id,
                            user_id: userId,
                            role:'member'

                            })
         //console.log('inserting member on acceptence',error)
        if(!error)
        {
          const {error}=  await supabase
                .from("invitations")
                .update({status:"accepted"})
                .eq("id",item.id)
           // console.log('Updateing Invitation',error)
                setAcceptInvitation(true);
        }

 }

  return (
    
        <View style={{flex:2,minWidth:60,justifyContent:'center',flexDirection:'row'}}    >
            {acceptInvitation? (<><Text style={{paddingRight:3}}>Accepted</Text><FontAwesome name='check-circle' size={20}/></>):
        (<TouchableOpacity onPress={()=>accept()}  style={{flex:2,flexDirection:'row',alignContent:'flex-end',justifyContent:'flex-end',padding:5}}>
         <Text style={{paddingRight:3}}>Accept</Text><FontAwesome name='check-circle' color={'red'} size={20}/></TouchableOpacity>)}
         </View>
      )




}

export default ButtonAcceptInvitation