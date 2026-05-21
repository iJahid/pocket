
import { useCreateRequest } from '@/api/orders';
import useProductsList from '@/api/products';
import { mystyles } from '@/lib/styles';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Profile } from '@/types';
import { defaultPizzaImage } from '@components/ProductListItem';
import RemoteImage from '@components/RemoteImage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

type ToReqProp={
  groupid:string;
  group_name:string;
  user_id:string;
  user_email:string;
  user_name:string;
  role:string;
}

type CreatRequetType={
 product_id:string;
 order_by:string;
 order_to:string;
 group_id:string;
}
export default function ProductScreen() {
  const {profile}=useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const {data:products,error,isLoading}=useProductsList();
  const [groups,setGroups] = useState<any[]>([])
  const [selectedGroup,setSelectedGroup]=useState<ToReqProp>()
  const [selectedUser,setSelectedUser]=useState<Profile>()
  const {mutate:createRequest}=useCreateRequest();
 
  useEffect(()=>{
    
    const setGroupData=async ()=>{

      const { data: userGroups, error: groupError } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', profile?.id);

      if (groupError) throw groupError;
      if (!userGroups || userGroups.length === 0) return [];

      // Extract the group IDs into a flat array of strings
      const groupIds = userGroups.map(item => item.group_id);


    const { data, error } = await supabase
    .from('group_members')
    .select(`  *,      profiles!user_id (        name,        email      ),      groups (        name      )  `)
    .in('group_id', groupIds) // Replaces your SQL "where group_id in" clause
    .order('role', { ascending: true });

          console.log('grouplist',JSON.stringify(data,null,2),error)
          
          setGroups(data)
          setSelectedGroup({
            group_name:data[0].groups.name,
            groupid:data[0].group_id,
            user_id:data[0].user_id,
            user_name:data[0].profiles.name,
            user_email:data[0].profiles.email,
            role:data[0].role
          })

    } 
    setGroupData();

 },[profile])
  

const [selectedIds, setSelectedIds] = useState([]);
const [ordered, setOrdered] = useState(false);

  // Toggles individual selection
  const onSelectItem = (id) => {

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Selects or Deselects all items
  const onSelectAll = () => {
    if (selectedIds.length === products?.length) {
      setSelectedIds([]); // Deselect all if all are already selected
    } else {
      setSelectedIds(products?.map((item) => item.id)); // Select all IDs
    }
  };


   const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);




    return (
      <TouchableOpacity onPress={() => onSelectItem(item.id)} style={mystyles.imageContainer} >
        
          <RemoteImage path={item.image} fallback={defaultPizzaImage} 
      style={mystyles.image} resizeMode="contain" /> 
        <Text style={{padding:5}}>{item.name} </Text>
        {isSelected && (
          <FontAwesome style={mystyles.checkmarkOverlay} name='check-circle' size={20} color={'green'}/>
        )
          
        }
      </TouchableOpacity>
    );
  };
  
/*const insertorder=async(data:CreatRequetType)=>{
  console.log('data to insert',data)
   const {data:newOrder,error}=  await supabase
          .from("orders")
          .insert({
            product_id:data.product_id,
            order_by:data.order_by,
            order_to:data.order_to,
            group_id:data.group_id
          }).select().maybeSingle()
          console.log('inserting error',error)
}*/
  const submitOrder=async ()=>{
     
      

    console.log('id selected',selectedIds,groups)
    selectedIds.map(async (item)=>{
      if(selectedGroup)
      {
      const groupAdmin=selectedGroup?.user_id;
      const groupid=selectedGroup?.groupid;
      

      //console.log(item,'profile',profile?.id,'admin',groupAdmin,'group',groupid);
      
      const rq:CreatRequetType={
group_id:groupid,
order_by:profile?.id as string,
product_id:item,
order_to:groupAdmin
      };
    //const newOrder=  insertorder(rq)  
    const newOrder=  createRequest(rq)
      console.log(newOrder);
      router.push('/requestlist')
      
   
      }
    })
     // const {data,error}=await supabase.from("order")
  }
if(!profile)
{
  return <ActivityIndicator/>;
}
      if(isLoading)
  {
    return <ActivityIndicator/>
  }
  if(error) {
    return <Text>Error loading products</Text>
  }
  return (
   <>
 
      <Stack.Screen options={{title:'Select Items',
        headerRight:()=>(
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>setModalVisible(true)} style={mystyles.smallbutton}>
        <Text>{selectedGroup?.user_name || selectedGroup?.user_email.split('@')[0]} ({selectedGroup?.role})</Text><Text>{selectedGroup?.group_name}</Text>
        </TouchableOpacity>
        
        
        </View>
        )}}/>
      <FlatList
        data={products}
        renderItem={renderItem}
       
        
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={{ gap:2 ,padding:5}}
        columnWrapperStyle={{gap:1, justifyContent: 'space-between' }}
         
      />
       <TouchableOpacity 
        style={[mystyles.floatingButton,{bottom:100}]} 
        onPress={() => submitOrder()}
        activeOpacity={0.8}
      >
        <FontAwesome name='check-square' size={40}/>
      </TouchableOpacity>
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
              
             
               {
              groups.map((group)=>(
                
                <TouchableOpacity onPress={()=>{
                  
                  setSelectedGroup({
                                  group_name:group.groups.name,
                                groupid:group.group_id,
                                user_id:group.user_id,
                                user_name:group.profiles.name,
                                user_email:group.profiles.email,
                                role:group.role
                                  }
                                )
                                setModalVisible(false);
                              }
                            }
                style={{width:'100%',padding:10}}>
                  <Text style={{fontSize: 16,   borderWidth: 1,           width:'100%',padding:10,
    borderColor: '#cde',     // Standard color string
    borderStyle: 'solid',   // Can be solid, dotted, or dashed
    borderRadius: 10,   }}>{group.groups.name}  {group.profiles.name || group.profiles.email} {group.role}  </Text>
                  </TouchableOpacity>
                
              ))}


              
              <Pressable
                
                onPress={() => setModalVisible(!modalVisible)} >
                <FontAwesome name='window-close' size={20}/>
              </Pressable>
            </View>
          </View>
        </Modal>

</>
   
  );
}
