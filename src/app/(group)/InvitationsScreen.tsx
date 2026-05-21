
import { mystyles } from "@/lib/styles"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import ButtonAcceptInvitation from "@components/ButtonAcceptInvitation"
import ButtonAcceptRequest from "@components/ButtonAcceptRequest"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

export default function InvitationsScreen(){
  const [invites,setInvites] = useState<any[]>([])
  const [request,setRequest] = useState<any[]>([])
  const [acceptJoinRequest,setAcceptJoinRequest]=useState(false);
  

  const {session}=useAuth();
  const [isLoading,setIsLoading]=useState(false);
 const user=session?.user;
 
  const load = async ()=>{
   

    const { data } = await supabase
      .from("invitations")
      .select("*,groups(name)")
      .eq("email",user?.email)

    setInvites(data || [])
  }

    const loadRequest = async ()=>{
   

    const { data } = await supabase
      .from("groupjoin_request")
      .select("*,groups(name)")
      .eq("owner",user?.id)
    //  console.log('Joining rests',JSON.stringify(data,null,2))
    setRequest(data || [])
  }
  useEffect(()=>{ 
    setIsLoading(true)
    load()
    loadRequest()
    setIsLoading(false)
   },[])


  



  const acceptRequest = async (gid,qid,id)=>{
    setAcceptJoinRequest(false);

console.log(gid,qid,id)
  const {data,error}=  await supabase.from("group_members").insert({
      group_id: gid,
      user_id: qid,
      role:'member'

    })
    console.log('inserting member on request',error,data)
    if(!error)
    {
        await supabase.from("groupjoin_request")
          .update({status:"accepted"})
          .eq("id",id)
          setAcceptJoinRequest(true);
    }
    loadRequest()
    setIsLoading(false)
  }

  if(isLoading)
  {
    return <ActivityIndicator/>
  }

  return(
<SafeAreaView>
  <Stack.Screen options={{title:'Invitaions & Requests'}}/>
   <View style={mystyles.content}>
 <View style={[mystyles.section, { paddingTop: 4 }]}>
          

          
        <View style={mystyles.section}>
          <Text style={mystyles.sectionTitle}>Invitaitons</Text>

          <View style={mystyles.sectionBody}>
            
            <View style={mystyles.rowWrapper}>
              <View style={mystyles.row}>
                <FlatList
                      data={invites}
                      keyExtractor={(i)=>i.id}
                      
                      renderItem={({item})=>(
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',width:'100%'}}>
                      <Text>
                      Invited to {item.groups.name}</Text>
                      <ButtonAcceptInvitation item={item} userId={user?.id}/>
                      

                      
                      </View>
                      
                    )}
                      />
                      
                      
                
              </View>
              
            </View>
            
          </View>
          
        </View>

        <View style={mystyles.section}>
          <Text style={mystyles.sectionTitle}>Requests</Text>

          <View style={mystyles.sectionBody}>
            
            <View style={mystyles.rowWrapper}>
              <View style={mystyles.row}>
                <FlatList
                  data={request}
                  keyExtractor={(i)=>i.id}
                  renderItem={({item})=>(
                    <View>
                    <Text>Request to join {item.groups.name} by {item.email}</Text>
                    <ButtonAcceptRequest item={item} />
                      </View>
                    
                  )}
                />
              </View>
            </View>
            <View style={[mystyles.rowWrapper, mystyles.rowLast]}>
      <View style={mystyles.row}></View>
      </View>
    </View>
          </View>
          
        </View>
        
    </View>
    
  </SafeAreaView>




  )
}