import { supabase } from "../lib/supabase"

export const fetchGroups = async (userid:string)=>{
  const { data } = await supabase
    .from("group_members")
    .select("groups(*)").eq('user_id',userid)
  return data?.map((g:any)=>g.groups)
}

export const fetchGlobalGroup = async (serachGroup:string)=>{
  const { data,error } = await supabase
    .from("groups")
    .select("*,profiles(name)").ilike('name',`%${serachGroup}%`)

    console.log(error)
  return data
}

export const fetchGroupDetails = async (groupid:string)=>{
  const { data } = await supabase
    .from("group_members")
    .select("*,profiles(email,name)").eq('group_id',groupid)
  return data;
}

export const createGroup = async (name:string,user_id :string)=>{
  

  //const { data:user } = await supabase.auth.getUser()
  
  console.log('creating group of ',user_id,name);
  const { data:group } = await supabase.from("groups")
    .insert({ name, owner:user_id })
    //.insert({ name, owner:user.user.id })
    .select().single()
    console.log(group)
if(group)
{
  const {error}=await supabase.from("group_members")
    .insert({ group_id:group.id, user_id:user_id, role:"admin" })
    if(error)
    {
      console.error('Error creating Grop',error);
      return;
    }
    
    console.log('successfully creacted');
  }
  else
  {
    console.log('Group cannot be created');
  }
    
}