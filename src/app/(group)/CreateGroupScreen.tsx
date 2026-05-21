
import { useCreateGroup } from "@/api/orders";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";


export default function CreateGroupScreen(){
  const {mutate:createGroup}=useCreateGroup();

  const [name,setName] = useState("")
 // const {session}=useAuth();

  const create =  ()=>{
    //await createGroup(name,session?.user.id as string)
   // router.back();
   console.log(name)
   const data= createGroup(name)
   console.log(data)
   if(!data)
   {
    router.replace('./GroupsScreen')
   }
  }

  return(
    <View style={{flex:1,gap:4,alignContent:'center',padding:30}}>
      <Stack.Screen options={{headerTitle:'Create Group'}}/>
      <TextInput placeholder="Group name" value={name} onChangeText={setName} style={{padding:5,margin:10}}/>
      <Button  onPress={()=>create()} title='Create'></Button>
    </View>
  )
}