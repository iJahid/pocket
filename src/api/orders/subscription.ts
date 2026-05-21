import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';


export const orderInsertSubscription = () => {
  const queryClient = useQueryClient();

 useEffect(
() =>
 {
  try{
const channel = supabase
    .channel('pocket order insert channel')
    .on(
        'postgres_changes',{ event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {console.log('New order received:', payload);
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                }
        )
         .on(
        'postgres_changes',{ event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {console.log('New order received:', payload);
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                }
        )
        .subscribe();
    }
    catch{}
  
return () => {
    try{
    channel.unsubscribe();
    supabase.removeChannel(channel);
    }
    catch{}
    
    };
}, [ queryClient]);
  
}







export const orderUpdateSubscription = (id:number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Fetch orders when the component mounts
    const changes = supabase
                    .channel('order update channel')
                    .on('postgres_changes', { event: 'UPDATE' , schema :'public',table:'orders',filter:`id=eq.${id}`},
                        (payload) => {
                            console.log('Order updated:', payload);
                            // Optionally, you can trigger a refetch of orders here
                                queryClient.invalidateQueries({ queryKey: ['orders',id] });
                        }
                    )
                    .subscribe();
                    
                   return () => {
                        changes.unsubscribe();
                    }
  
  }, []);
  
}

