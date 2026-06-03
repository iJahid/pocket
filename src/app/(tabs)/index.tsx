
import { useUserGroupInfo } from '@/api/orders'
import { orderInsertSubscription } from '@/api/orders/subscription'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'



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



 return <Redirect href='/(tabs)/transactions'/>
}

export default index