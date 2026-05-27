import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { expDataTypeDB, GroupMembers } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { Alert } from 'react-native';

export default function useOrdersList() {
    const {session}=useAuth();
    const userId=session?.user.id;
      const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isoToday = today.toISOString();
     
  return useQuery({
    queryKey: ['orders',userId],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
 const { data,error } = await supabase
          .from("orders")
          .select(`
            *,
            groups(name),
            products(name,image),
            orderby:profiles!order_by(name,email)`
          ).eq('order_to',userId)
          .or(`status.eq.pending,created_at.gte.${isoToday}`)
           .order('created_at', { ascending: false });




        return data;
    }
  });
    
  
}

export function useUserGroupInfo() {
  const {session}=useAuth();
    const userId=session?.user.id;

    return useQuery({
    queryKey: ['groupUserinfo',userId],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
        //const { data,error } = await supabase
         // .from("group_members")
         // .select("groups(*)").eq('groups.owner',userId)
          //.or(`user_id.eq.${userId},groups.owner.eq.${userId}`)
    const { data,error } = await supabase
          .from("groups")
          .select("*, group_members!inner(role) ")
          .eq('group_members.user_id',userId);//}`, { referencedTable: 'group_members' }); 

         // console.log(data,userId,error)
          return data;
    }
  });
    
  
}


export function useRequestList() {
    const {session}=useAuth();
    const userId=session?.user.id;
      const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isoToday = today.toISOString();
     
  return useQuery({
    queryKey: ['orders',userId],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
 const { data,error } = await supabase
          .from("orders")
          .select(`
            *,
            groups(name),
            products(name,image),
            orderby:profiles!order_to(name,email)`
          ).eq('order_by',userId)
          .or(`status.eq.pending,created_at.gte.${isoToday}`)
           .order('created_at', { ascending: false });




        return data;
    }
  });
    
  
}



export const useOrderInfo=(id:number) =>{
  return useQuery({
    queryKey: ['orders',id],
    queryFn: async()=>{
        const {data,error}=await supabase.from('orders')
                          .select('*,order_items(*,products(*))')
                          .eq('id',id).maybeSingle();
        
        return data;
    }
  });
    
  
}

export const useCreateRequest=()=>{
  const queryClient = useQueryClient();
  const {session}=useAuth();
    const userId=session?.user.id;

 return   useMutation({
    async mutationFn(data:any){

      console.log('reqest data',data)
        const {data:newOrder,error}=  await supabase
          .from("orders")
          .insert({
            product_id:data.product_id,
            order_by:data.order_by,
            order_to:data.order_to,
            group_id:data.group_id
          }).select().maybeSingle()
          
          console.log(newOrder);
    return newOrder;

 },
 async onSuccess(){
    // Invalidate and refetch
    console.log('success creating Request');
    await queryClient.invalidateQueries({ queryKey: ['orders',userId] });
 },
  onError(error:any){
    console.error('Error creating order:', error);
    Alert.alert('Error', 'Failed to create order. Please try again.');
 }

})

}

export const useCreateOrder=()=>{
  const queryClient = useQueryClient();
  const {session}=useAuth();
    const userId=session?.user.id;

 return   useMutation({
    async mutationFn(data:any){

    const {data:newOrder,error}=await supabase
    .from('orders').
    insert({...data,
       user_id:userId,
       
       
    })
    .select()
    .maybeSingle();
    return newOrder;

 },
 async onSuccess(){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['orders'] });
 },
  onError(error:any){
    console.error('Error creating order:', error);
    Alert.alert('Error', 'Failed to create order. Please try again.');
 }

})

}
export function useGroupMembers(groupid) {
  const {session}=useAuth();
    const userId=session?.user.id;

    return useQuery({
    queryKey: ['GroupMembers',userId],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
        //const { data,error } = await supabase
         // .from("group_members")
         // .select("groups(*)").eq('groups.owner',userId)
          //.or(`user_id.eq.${userId},groups.owner.eq.${userId}`)
    const { data,error } = await supabase
          .from("group_members")
          .select("*,profiles(email,name)")
          .eq('group_id',groupid);//}`, { referencedTable: 'group_members' }); 

          //console.log("Members from usequery",data,error)
          return data;
    }
  });
    
  
}

export const useCreateGroup=()=>{
  const queryClient = useQueryClient();
  const {session}=useAuth();
    const userId=session?.user.id;

 return   useMutation({
    async mutationFn(name:string){
    
      //console.log('mm',name)
    
      const {data:newGroup,error}=await supabase
    .from('groups').
    insert({ name:name, owner:userId })
    .select('id')
    .maybeSingle();
    
    return newGroup;

 },

 
 async onSuccess(){
    // Invalidate and refetch
   // await queryClient.invalidateQueries({ queryKey: ['groupUserinfo',userId] });
 },
  onError(error:any){
    console.error('Error creating Group:', error);
    Alert.alert('Error', 'Failed to create Group. Please try again.');
    return error;
 }

})

}

export const useCreateGroupMember=()=>{
  const queryClient = useQueryClient();
  const {session}=useAuth();
    const userId=session?.user.id;

 return   useMutation({
    async mutationFn(mdata:GroupMembers ){
    
      console.log('mm',mdata)
    
      const {data:newGroupMember,error}=await supabase
    .from('group_members').
    insert({
      user_id:mdata.user_id,
      group_id:mdata.group_id,
      role:mdata.role
    })
    .select('id')
   
      
    console.log('errr',error)
    return newGroupMember;

 },

 
 async onSuccess(){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['groupUserinfo',userId] });
 },
  onError(error:any){
    console.error('Error creating Group:', error);
    Alert.alert('Error', 'Failed to create Group. Please try again.');
    return error;
 }

})

}


export const useRemoveGroupMember=()=>{
    const {session}=useAuth();
    const userId=session?.user.id;

  const queryClient = useQueryClient();
 return   useMutation({

  
    async mutationFn(id:number){
      await supabase
      .from('group_members')
      .delete()
      .eq('id',id);
   

    }
    ,
 async onSuccess(){
    // Invalidate and refetch
    
    await queryClient.invalidateQueries({ queryKey: ['GroupMembers',userId] });
    
 },
  onError(error:any){
    console.error('Error Removing Member:', error);
    Alert.alert('Error', 'Failed to Removing Member. Please try again.');
 }
 }


)
}



export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: orders;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders',id] });
    },
  });
};



export const useDeleteOrder=()=>{
    const {session}=useAuth();
    const userId=session?.user.id;

  const queryClient = useQueryClient();
 return   useMutation({

  
    async mutationFn(id:number){
      await supabase
      .from('orders')
      .delete()
      .eq('id',id);
   

    }
    ,
 async onSuccess(){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['orders'] });
    await queryClient.invalidateQueries({ queryKey: ['orders',userId] });
    
 },
  onError(error:any){
    console.error('Error creating order:', error);
    Alert.alert('Error', 'Failed to create order. Please try again.');
 }
 }


)
}





/*Transactions Queries*/

export const useCreateTrans=()=>{
  const queryClient = useQueryClient();
   const {session}=useAuth();
    const userId=session?.user.id;

 return   useMutation({
    async mutationFn(xdata:any){

    //  console.log('reqest data',xdata)
        const {data,error}=  await supabase
           .from('transactions')
           .insert(xdata).select('*').maybeSingle()
          
      //    console.log('after create',data);
    return data;

 },
 async onSuccess(){
    // Invalidate and refetch
    //console.log('success creating Transaction');
    await queryClient.invalidateQueries({ queryKey: ['Transactions',userId] });
     await queryClient.invalidateQueries({ queryKey: ['userBalance',userId] });
 },
  onError(error:any){
    console.error('Error creating Transactions:', error);
    Alert.alert('Error', 'Failed to create Transaction. Please try again.',error);
 }

})

}


export const useUpdateTrans = () => {
  
  const queryClient = useQueryClient();
   const {session}=useAuth();
    const userId=session?.user.id;

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: expDataTypeDB | any;
    }) {
     // console.log('useUpdate',id, updatedFields)
      const { error, data: updateTransData } = await supabase
        .from('transactions')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        Alert.alert(error.message)
        throw new Error(error.message);
      }
      return updateTransData;
    },
    async onSuccess() {
       console.log('success Updated Transaction');
       await queryClient.invalidateQueries({ queryKey: ['Transactions',userId] });
       await queryClient.invalidateQueries({ queryKey: ['userBalance',userId] });
    
    },
  });
};


export  function useTransactionList() {
    const {session}=useAuth();
    const userId=session?.user.id;
      const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isoToday = today.toISOString();
     
  return useQuery({
    queryKey: ['Transactions',userId],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
 const { data,error } = await supabase
          .from("transactions")
          .select('*').eq('user_id',userId)
          //.or(`created_at.gte.${isoToday}`)
           .order('created_at', { ascending: false });




        return data;
    }
  });
    
  
}
export  function useTransactionListFor(xnfor:string) {
    const {session}=useAuth();
    const userId=session?.user.id;
      const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isoToday = today.toISOString();
      console.log('xnfor',xnfor)
  return useQuery({
    queryKey: ['Transactions',userId,xnfor],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
       
 const { data,error } = await supabase
          .from("transactions")
          .select('*')
          .eq('user_id',userId)
          .eq('xn_for',xnfor)
          //.or(`created_at.gte.${isoToday}`)
           .order('created_at', { ascending: false });



        if(error)
        {
          console.log(error);
        }
        return data;
    }
  });
    
  
}


export const useDeleteTransction=()=>{
       const {session}=useAuth();
    const userId=session?.user.id;
  const queryClient = useQueryClient();
 return   useMutation({

  
    async mutationFn(id:number){
      console.log(' Delete ID',id);
      await supabase
      .from('transactions')
      .delete()
      .eq('id',id);
   

    }
    ,
 async onSuccess(){
    // Invalidate and refetch
    console.log('sucessfully Deleted');
    await queryClient.invalidateQueries({ queryKey: ['Transactions',useId] });
    await queryClient.invalidateQueries({ queryKey: ['userBalance',userId] });
    
 },
  onError(error:any){
    console.error('Error creating order:', error);
    Alert.alert('Error', 'Failed to Delete order. Please try again.');
 }
 }


)
}


export  function useTransactionSummary(fromDate:string,toDate:string,expType:string[]) {
    const {session}=useAuth();
    const userId=session?.user.id;
  
    //const isoFromDate = fromDate.toISOString();
    //const isoToDate = toDate.toISOString();

  return useQuery({
    queryKey: ['Transactions',userId,expType],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
       
 const { data,error } = await supabase
          .rpc("get_sumary_by_date", {
            user_id: userId,
            input_date_from: fromDate,
            input_date_to: toDate,
            exp_type: expType
          })
          
          


        if(error)
        {
          console.log(error);
        }
        return data;
    }
  });
    
  
}
export  function useSummaryFor(fromDate:string,toDate:string,exp_for:string) {
    const {session}=useAuth();
    const userId=session?.user.id;
  
    //const isoFromDate = fromDate.toISOString();
    //const isoToDate = toDate.toISOString();

  return useQuery({
    queryKey: ['useSummaryFor',userId,exp_for],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
       
 const { data,error } = await supabase
          .rpc("get_sumary_by_date", {
            user_id: userId,
            input_date_from: fromDate,
            input_date_to: toDate,
            exp_for: exp_for
          })
          
          


        if(error)
        {
          console.log(error);
        }
        return data;
    }
  });
    
  
}

// 1. Define the interface matching your Postgres TABLE return type
interface BalanceData {
  expense: number;
  income: number;
}

interface UseBalanceProps {
  userId: string;
  expenseTypes: string[];
}


// 1. Define the interface matching your Postgres TABLE return type
interface BalanceData {
  expense: number;
  income: number;
}

interface UseBalanceProps {
  userId: string;
  expenseTypes: string[];
}

export function useUserBalance({ userId, expenseTypes }: UseBalanceProps) {
  return useQuery<BalanceData | null, Error>({
    // Keep your queryKey synchronized with your dependencies
    queryKey: ['userBalance', userId],
    
    queryFn: async () => {
      // Guard clause to prevent unnecessary calls if userId is empty
      if (!userId) return null;

      const { data, error } = await supabase.rpc('get_balance', {
        userid: userId,        // Matches 'userid uuid' in SQL
        exp_type: expenseTypes // Matches 'exp_type text[]' in SQL
      });

      if (error) {
        throw new Error(error.message);
      }

      // RETURNS TABLE always returns an array of objects
      if (data && data.length > 0) {
        return data[0] as BalanceData;
      }

      return { expense: 0, income: 0 };
    },
    // Optional: Prevent fetching if arguments aren't valid yet
    enabled: !!userId && expenseTypes.length > 0, 
  });
}


export  function useTransactionBalance(expType:string[]) {
    const {session}=useAuth();
    const userId=session?.user.id;
  
    //const isoFromDate = fromDate.toISOString();
    //const isoToDate = toDate.toISOString();

  return useQuery({
    queryKey: ['TransactionsBalance',userId,expType],
    queryFn: async()=>{
        if(!userId){
         return null;
        }
       
       
 const { data,error } = await supabase
          .rpc("get_sumary_by_date", {
            user_id: userId,
            
            exp_type: expType
          })
          
          


        if(error)
        {
          console.log(error);
        }
        console.log('useBalance',data)
        return data;
    }
  });
    
  
}


export const  getUserBalance=async ( expenseTypes: string[]) =>{
     const {session}=useAuth();
    const userId=session?.user.id;
  try {
    const { data, error } = await supabase.rpc('get_balance', {
      userid: userId,          // Must match 'userid uuid' exactly
      exp_type: expenseTypes   // Must match 'exp_type text[]' exactly
    });

    if (error) {
      console.error('RPC Error:', error.message);
      return null;
    }

    // Since RETURNS TABLE can return multiple rows, 'data' will be an array.
    // Access the first row to get your income and expense numbers.
    if (data && data.length > 0) {
      const { expense, income } = data[0];
      return { expense, income };
    }

    return { expense: 0, income: 0 };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
