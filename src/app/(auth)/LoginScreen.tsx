import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
/*import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';*/
import * as WebBrowser from "expo-web-browser";

import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


WebBrowser.maybeCompleteAuthSession();
/*
GoogleSignin.configure({
  scopes:['p'],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!, // Found in Google Cloud Console
});

*/

const SignIn = () => {
  const {session}=useAuth();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  if(loading){
        return (
          <ActivityIndicator/>
        )
        
    }
/*
async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo.data.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });
      return { data, error };
    } else {
      throw new Error('no ID token present!');
    }
  } catch (error) {
    console.error(error);
  }
}*/

/*
const signInWithGoogle = async () => {
  try{

      await GoogleSignin.hasPlayServices();
      const userInfo=GoogleSignin.signIn();
      console.log('sign in with google user ',userInfo)

  }
  catch(error){
    console.error('sigin in errrp',error)
  }
}*/
/*
  const signInWithGoogle = async () => {

    const redirectUrl = Linking.createURL("auth/callback");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    // open browser
    const res = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl
    );

    if (res.type === "success") {
      const url = res.url;

      const { data: sessionData, error: sessionError } =
        await supabase.auth.exchangeCodeForSession(url);

      if (sessionError) console.log(sessionError);
      else console.log("Logged in!");
    }
  };

*/


    const onSubmit = async () => {
        

        if(!email || !password) {
            setError('Please fill all fields')
            return;
        }
        setLoading(true);
        const {data,error} = await supabase.auth.signInWithPassword({email, password})
        if(error) {
            setError(error.message)
            Alert.alert('Error', error.message)
            
        }
        else
          {
              router.replace('/(tabs)')
          }
        setLoading(false);
        // Alert.alert('Data',JSON.stringify(data))
        console.log('redirecting to tabs')
        //return <Redirect href="/(tabs)" />
        

    }
  
const resetPass=async()=>{
  const { data, error } = await supabase.auth.resetPasswordForEmail('jahidtrek@gmail.com', {
  redirectTo: `${window.location.origin}/reset-password`, // This must match your deep link configuration
  
});
console.log(data,error)
}
  
  return (
     <View style={styles.containerView}>
      <Stack.Screen  options={{title: 'Sign In'}} />
     

     
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Pocket</Text>
            <TextInput
              placeholder="Username"
              value={email}
              onChangeText={setEmail}
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={{justifyContent:'flex-end',width:'100%',alignItems:'flex-end'}}
              onPress={()=>resetPass()}

              
            ><Text style={{ fontSize: 14,color:'rgb(177, 134, 17)',alignContent:'flex-end'}}>Forgot Password</Text></TouchableOpacity>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => onSubmit()}
              
            ><Text style={{padding:5,fontSize:18,fontWeight:800}}>Login</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.fbLoginButton}
              
              
              
            ><Text style={{ fontSize: 14}}>Login With Google</Text></TouchableOpacity>

            

                   <Link href={'/SignupScreen'} ><Text>Don't have an account? Sign Up</Text></Link>
          </View>
   
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
        
       {/*} <Button onPress={()=>signInWithGoogle()} title='Gogole'/> */}
 {/* <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const response = await GoogleSignin.signIn()
          if (isSuccessResponse(response)) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.data.idToken,
            })
            console.log(error, data)
          }
        } catch (error: any) {
          if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />*/}
     
      
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});
