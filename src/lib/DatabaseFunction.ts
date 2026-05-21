import { supabase } from "./supabase"

export const createGroup = async (name:string,ownerid:string) => {


  const { data: group } = await supabase
    .from("groups")
    .insert({ name, owner: ownerid })
    .select()
    .single()

  await supabase.from("group_members").insert({
    group_id: group.id,
    user_id: ownerid,
    role: "admin"
  })
}

export const inviteUser = async (groupId:string,email:string,groupName:string)=>{
  await supabase.from("invitations").insert({
    group_id: groupId,
    email
  })

  await fetch(
    "https://YOUR_FUNCTION_URL/send-invite",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, groupName })
    }
  )
}

export const subscribeInvites = (email:string, callback:any)=>{
  return supabase
    .channel("invites")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "invitations",
        filter: `email=eq.${email}`
      },
      callback
    )
    .subscribe()
}


export const acceptInvite = async (invite:any,userid:string)=>{
 // const { data: user } = await supabase.auth.getUser()

  await supabase.from("group_members").insert({
    group_id: invite.group_id,
    user_id: userid
  })

  await supabase.from("invitations")
    .update({ status:"accepted" })
    .eq("id",invite.id)
}

export const leaveGroup = async (groupId:string,userid:string)=>{


  await supabase
    .from("group_members")
    .delete()
    .eq("group_id",groupId)
    .eq("user_id",userid)
}

export const removeMember = async (groupId:string,userId:string)=>{
  console.log(groupId,userId)
  const {data,error}=await supabase
    .from("group_members")
    .delete()
    .eq("group_id",groupId)
    .eq("user_id",userId)

    if(error)
    {
      console.log(error);
    }
    console.log(data)
    return data;
}