
import { useCreateGroup, useCreateGroupMember, useUserGroupInfo } from "@/api/orders"
import { mystyles } from "@/lib/styles"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { fetchGlobalGroup } from "@/services/groupService"
import { GroupMembers, Groups } from "@/types"
import ButtonSendReqToJoinGroup from "@components/ButtonSendReqToJoinGroup"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Ionicons from "@expo/vector-icons/Ionicons"
import { router, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"



export default function GroupsScreen(){

  const [searchGroup,setSearchGroup]=useState("");
  const [searchGroupList,setSearchGroupList]=useState<Groups[]>([])
  const [modalVisible,setModalVisible]=useState(false);
  const [groupName,setGroupName]=useState('');
  const {session,profile}=useAuth();
  const [requestSent,setRequestSent] = useState<any[]>([])
  //console.log(session?.user.id)
  const [groups,setGroups] = useState<any[]>([])
 // const load = async ()=> setGroups(await fetchGroups(session?.user.id) as any)

  //useEffect(()=>{ load() },[])
    const {data:grouplist,refetch }=useUserGroupInfo()

    const {mutate:createGroup}=useCreateGroup();
    const {mutate:createGroupMember}=useCreateGroupMember();

    const loadRequest = async ()=>{
   

    const { data:sentList ,error} = await supabase
      .from("groupjoin_request")
      .select("*")
      .eq("email",session?.user?.email)
      console.log('groupjoin_request',session?.user?.id,JSON.stringify(sentList,null,2),error)
    setRequestSent(sentList ||[])
  }


    useEffect(()=>{
     loadRequest() 
     setGroups(grouplist )
    //console.log('grouplist from useffect', JSON.stringify(grouplist,null,2))
      },[groups,grouplist])

  const onSearchGroup=async ()=>{

      const data=await fetchGlobalGroup(searchGroup) 
      setSearchGroupList(data)
      //console.log('Searching Group', searchGroupList)
  }

  const onSendRequest=async (grpid:string,owner:string)=>{
    //console.log(grpid,owner)

    setShowReqButton(false);
        const {data,error}=await supabase.from("groupjoin_request").insert({
          group_id: grpid,
          email:profile?.email,
          owner:owner,
          request_by:profile?.id

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


  const create = async ()=>{
    //await createGroup(name,session?.user.id as string)
   // router.back();
   console.log(groupName)
//console.log( createGroup(groupName))
  const {data:newGroup,error}=await supabase
    .from('groups').
    insert({ name:groupName, owner:session?.user.id })
    .select('id')

   //console.log('inserted grop',newGroup[0].id)

   let memberdata:GroupMembers={
    group_id:newGroup[0].id,
    user_id:session?.user.id as string,
    role:'admin'
   };

   const data2=createGroupMember(memberdata)
   setModalVisible(false);
  }

const refreshGroupList=()=>{
//const queryClient = useQueryClient();
refetch();
//console.log("Length",groups.length)
// Invalidate every query with a key that starts with 'todos'
  //queryClient.invalidateQueries({ queryKey: ['groupUserinfo',session?.user.id] });
}

  return(
    <View style={mystyles.content}>
    <Stack.Screen options={{
      headerLeft:()=>(<TouchableOpacity onPress={()=>router.replace('/')}><FontAwesome name='backward'  /></TouchableOpacity>),
      headerTitle:'Groups',
      headerRight:()=>(<>
      <TouchableOpacity onPress={()=>setModalVisible(true)}
        style={{padding:5}}>
        <Ionicons
          name="add-circle-sharp"
          size={20}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/(group)/InvitationsScreen")}
          style={{padding:5}}>
        <FontAwesome
          name="bell-o"
          size={20}
        />
        </TouchableOpacity>
        </>
    )
    }}/>
    
      
      
    <View style={[mystyles.section, { paddingTop: 4 }]}>
          

          
        <View style={mystyles.section}>
       
            <View style={mystyles.sectionBody}>
            
          
                
                        {(grouplist?.length>0) && (
                              <FlatList
                                    data={grouplist}
                                    keyExtractor={(item)=>item.id}
                                    renderItem={({item})=>(
                                      <View style={mystyles.rowWrapper}>
                                      <TouchableOpacity  onPress={()=>router.push({pathname: '/(group)/GroupDetailsScreen',
                                                                params:{groupname:item.name,groupid:item.id}
                                                              })}
                                      ><Text style={{fontSize:16,fontWeight:500,color:'#6d077a'}}>{item.name}</Text></TouchableOpacity>
                                      </View>
                                    )}
                                  />
                                  )}
                       
                          
                       
    
                   
                
              
                <View style={mystyles.rowWrapper}>
                    <View style={mystyles.row}>
                  
                    </View> 
                    <View style={mystyles.rowLast}           />
                </View>

            </View>
        </View>
    
    



  <View style={[mystyles.section, { paddingTop: 4 }]}>
          

          
        <View style={mystyles.section}>
          <Text style={mystyles.sectionTitle}>Search Group</Text>

          <View style={mystyles.sectionBody}>
            
            <View style={mystyles.rowWrapper}>
              <View style={mystyles.row}>
                  <View style={[mystyles.profileBody,{flexDirection:'row'}]}>
                      <TextInput style={[mystyles.input_box,{minWidth:'80%',minHeight:50}]} 
                      value={searchGroup}
                      onChangeText={setSearchGroup}
                      placeholder="group name"/>
                      <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}}
                            onPress={()=>onSearchGroup()}>
                              
                              <Ionicons
                              name="search-circle"
                              size={32}
                              
                              />
                      </TouchableOpacity>
                  </View>
              </View>
            
                  
            
                <View style={[mystyles.rowWrapper, mystyles.rowLast]}/>
              </View>

          </View>


        </View>
  </View>
  


     
     <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            
            setModalVisible(!modalVisible);
          }}
          
          >
          <View style={mystyles.centeredView}>
            <View style={mystyles.modalView}>
              
              <TextInput placeholder="Group Name" value={groupName} onChangeText={setGroupName} style={{padding:5,margin:10}}/>
              <Button  onPress={()=>create()} title="Create"/>
            


              
              
            </View>
          </View>
        </Modal> 
      
  <FlatList
                    keyExtractor={item=>item.id}
                    data={searchGroupList}
                    renderItem={({item})=>{

                     const exist= grouplist?.find(u=>u.id===item.id)  
                     const alreadysent=requestSent.find(g=>g.group_id==item.id) 
                     //console.log('Existing group',exist)                     
                     console.log('Alredy sent',alreadysent)                     
                     return (

                    <View style={[mystyles.rowWrapper,{}]}>
                    <View style={[mystyles.row,{flex:2,flexDirection:'row'}]}>
                       <Text style={{width:'60%'}}>{item.name}</Text> 
                            {( item.owner!==session?.user.id && !exist &&  !alreadysent ) &&
                            <ButtonSendReqToJoinGroup grpid={item.id} owner={item.owner} email={session?.user.email} userid={session?.user.id}/>
                            }
                            { exist && (<Text style={{fontStyle:'italic'}}>Already Member</Text>)

                            }
                            { (!exist && alreadysent) && (<Text style={{fontStyle:'italic'}}>Waiting</Text>)

                            }

                    
                        </View>
                        
                        </View>)
                    
                    }}
                  />
  </View>
  
  </View>
  )
}