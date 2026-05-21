import { supabase } from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export default function useProductsList() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async()=>{
        const {data,error}=await supabase.from('products').select('*');
      //  if(error){
       //     throw new Error('Failed to fetch products');
        //}
      //  console.log('Products fetch error', error);
       // console.log('Products fetched from Supabase', data);
        return data;
    }
  });
    
  
}


export const useProduct=(id:number) =>{
  return useQuery({
    queryKey: ['products',id],
    queryFn: async()=>{
        const {data,error}=await supabase.from('products').select('*').eq('id',id).maybeSingle();
        
        return data;
    }
  });
    
  
}

export const useCreateProduct=()=>{
  const queryClient = useQueryClient();
 return   useMutation({
    async mutationFn(data:any){

    const {data:newProduct,error}=await supabase
    .from('products').
    insert({
        name:data.name,
        image:data.image,
        price:data.price
    }).maybeSingle();
    return newProduct;

 },
 async onSuccess(){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['products'] });
 },
  onError(error:any){
    console.error('Error creating product:', error);
    Alert.alert('Error', 'Failed to create product. Please try again.');
 }

})

}


export const useUpdateProduct=()=>{
  const queryClient = useQueryClient();
 return   useMutation({
    async mutationFn(data:any){

    const {data:updateProduct,error}=await supabase
    .from('products')
    .update({
        name:data.name,
        image:data.image,
        price:data.price
    })
    .eq('id', data.id)
    .select()
    .maybeSingle();
    return updateProduct;

 },
 async onSuccess(_,{id}){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['products'] });
    await queryClient.invalidateQueries({ queryKey: ['products',id] });
 },
  onError(error:any){
    console.error('Error creating product:', error);
    Alert.alert('Error', 'Failed to create product. Please try again.');
 }

})

}



export const useDeleteProduct=()=>{
  const queryClient = useQueryClient();
 return   useMutation({
    async mutationFn(id:number){
      await supabase
      .from('products')
      .delete()
      .eq('id',id);


    }
    ,
 async onSuccess(){
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['products'] });
    
 },
  onError(error:any){
    console.error('Error creating product:', error);
    Alert.alert('Error', 'Failed to create product. Please try again.');
 }
 }


)
}