
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Profile } from "../types";


type AuthData={
    session: Session | null;
    profile: Profile | null;
    Authloaded: boolean;
    isAuthenticated:boolean;
    
    
}
const AuthContext=createContext<AuthData >({
    session: null, 
    profile: null, 
    Authloaded: false, 
    isAuthenticated:false
    
});

const AuthProvider=({children}:PropsWithChildren)=>{
    const [session, setSession]=useState<Session | null>(null);
    const [profile, setProfile]=useState<any>(null);
    const [Authloaded, setAuthloaded]=useState(false);
    const [isAuthenticated,setIsAuthenticated]=useState(false);


       useEffect(()=>{
        //console.log("AuthProvider mounted, fetching session...");
        setAuthloaded(false);
        const fetchSession=async()=>{
            //console.log("supabase Fetching session in provider");
            const {data,error}=await supabase.auth.getSession()
            //console.log("supabase data in provider",data);
            if(error) {
              //  console.log('Error fetching session', error);
                setAuthloaded(true);
                return;
            }
            //console.log('Session fetched in Provider', session);
            const sessionData=data.session;
            if(sessionData) {
                setSession(sessionData);
                const {data,error}=await supabase.from('profiles').select('*').eq('id', sessionData.user.id).maybeSingle();
                console.log('Profile fetch error', error);
                setProfile(data);
                console.log('Profile fetched in Provider', data);

                
                setIsAuthenticated(true);

                console.log('Session set IsAuthenticated', isAuthenticated,'loaded',Authloaded);
            }

          
            setAuthloaded(true);
              console.log('Session set IsAuthenticated', isAuthenticated,'loaded',Authloaded);
        
        }
        fetchSession();

           supabase.auth.onAuthStateChange((event, session) => {
                //console.log('Auth state changed:', event, session);
                setSession(session);
            });
         
        
    },[])




    
    return (
        <AuthContext.Provider value={{
            session, 
            profile, 
            Authloaded, 
            isAuthenticated
            

            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth=()=>useContext(AuthContext)
