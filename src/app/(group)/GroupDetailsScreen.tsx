import { useGroupMembers, useRemoveGroupMember } from "@/api/orders";
import { mystyles } from "@/lib/styles";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupDetailsScreen(){
  const {session}=useAuth();
  const {groupname,groupid}=useLocalSearchParams();
  const [groupMembers,setgroupMembers] = useState<any[]>([])
  const [isGroupAdmin,setisGroupAdmin] = useState(false)
 const [email,setEmail] = useState("")

const {data:grpMembers}=useGroupMembers(groupid)
const {mutate:removeMember}=useRemoveGroupMember();


  useEffect(()=>{
    console.log('group members use effect ',JSON.stringify(grpMembers,null,2))
    setgroupMembers(grpMembers)

    if(grpMembers){
      const groupAdmin=grpMembers.find(u=>u.role=='admin');
      console.log('groupadmin', groupAdmin,groupAdmin.profiles.email,session?.user.email)
      //if(groupAdmin)
      //{ 
        if(groupAdmin.profiles.email===session?.user.email)
        {
         setisGroupAdmin(true);
         //console.log('Admin',isGroupAdmin)
        }

      //}
    
  }},[grpMembers])
      
  const inviteMember = async ()=>{
    await supabase.from("invitations").insert({
      group_id: groupid,
      email
    })
    setEmail('')
    alert('Invitation sent successfully')
  }

  const removeUser= (id :string,role:string)=>{
  console.log(id,role)
    
  if(role!=='admin')
  {
    removeMember(parseFloat(id))
   //load();
  }
}
     
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
  <Stack.Screen options={{headerTitle:"Group Details"}}/>
      <View style={mystyles.header}>
        <Text numberOfLines={1} style={mystyles.headerTitle}>
          {groupname} <Text style={{fontSize:12}}>  {isGroupAdmin===true?'[Admin ]':''}</Text>
        </Text>
      </View>
      <View>
        <View style={[mystyles.section, { paddingTop: 4 }]}>
            {isGroupAdmin &&
                (<>
                
                <Text style={mystyles.sectionTitle}>Invite Member</Text>
                
                <View style={mystyles.rowWrapper}>
                
                  <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',padding:10}}>

                    <TextInput placeholder="User email" value={email} onChangeText={setEmail} 
                              style={{padding:5,borderStyle:'solid',borderColor:'#484a4b',borderRadius:5,borderWidth:1,width:'80%'}} />
                    <TouchableOpacity  onPress={inviteMember} style={{flex:2,flexDirection:'row',alignContent:'flex-end'}}>
                      <FontAwesome name="paper-plane" size={20} style={{alignContent:'center',alignItems:'center',padding:8}}/>
                      <Text style={{alignContent:'center',alignItems:'center',paddingTop:8}}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </>)

              }

        </View>

      </View>

      <View style={mystyles.section}>
          <Text style={mystyles.sectionTitle}>Group Members</Text>
            
          <View style={mystyles.sectionBody}>
          
          <FlatList
              data={groupMembers}
              keyExtractor={(item)=>item.id}
              renderItem={({item})=>{
                console.log("lstitem",item)
                return(
            <View style={mystyles.rowWrapper}>
              <View style={mystyles.row}>
                 <View style={mystyles.profileBody}>
                <Text style={{color:'blue'}}></Text>
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text style={{padding:4}}> {item.profiles.name
                }
                </Text>
                <Text style={{padding:4}}> {item.profiles.email
                }
                </Text>

               <Text style={{color:'#00aaff'}}> {item.role==="admin"? "- Admin" :""} </Text>
               </View>
               </View>

                <View style={mystyles.rowSpacer} />
{ (isGroupAdmin && item.role!=="admin" ) &&
                <TouchableOpacity
                onPress={()=>removeUser(item.id,item.role)}
                >
                  <Ionicons
                color="#ff0000"
                name="remove-circle"
                size={22} />
                </TouchableOpacity>}
              </View>
            </View>)
            }} />




          </View>
      </View>
  </SafeAreaView>)
} 