
import { useUserGroupInfo } from '@/api/orders'
import { orderInsertSubscription } from '@/api/orders/subscription'
import { useAuth } from '@/providers/AuthProvider'
import { Link, Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'



const index = () => {
  const {profile}=useAuth();
  const [isLoading,setLoading]=useState(false);
 const [groups,setGroups] = useState<any[]>([])
const {data:grouplist,error}=useUserGroupInfo()
 
try{
orderInsertSubscription();
}
catch{}
useEffect(()=>{

    setLoading(true)
    
    
 
      setGroups(grouplist)
      setLoading(false);

},[])
  

   console.log("tab page index")

if(isLoading)
{
  return <ActivityIndicator size={40}/>
}
//console.log('index page group list',grouplist)
if(!grouplist)
      {
        //console.log('redirecting from home page',grouplist)
        return <Redirect href='/GroupsScreen'/>
      }
      if(grouplist.length===0)
      {
       // console.log('redirecting from home page',grouplist)
        return <Redirect href='/GroupsScreen'/>
      }
 return <View>
  <Text>Welcome</Text>
  <Link href={'/(group)/GroupsScreen'}><Text>Group</Text></Link>
 </View>
}

export default index