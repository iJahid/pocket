import { supabase } from '@/lib/supabase';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as WebBrowser from "expo-web-browser";

import { mystyles } from '@/lib/styles';
import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';



WebBrowser.maybeCompleteAuthSession();

/*
GoogleSignin.configure({
  //offlineAccess: true,
  //webClientId:"131936964337-tv15jctl4cin8fl9pmi02c5av218gsfe.apps.googleusercontent.com"
 
  webClientId:"131936964337-nvmeg2q3j48orr7jvoprvjk0h2fucs7r.apps.googleusercontent.com" // process.env.EXPO_PUBLIC_GOOGLE_WEB_ID!, // Found in Google Cloud Console
  
});

*/
const SignIn = () => {


  const [isModalVisible, setModalVisible] = useState(false);

 // const {session}=useAuth();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error1, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
 
  if(loading){
        return (
          <ActivityIndicator/>
        )
        
    }

async function signInWithGoogle() {
}
/*  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo.data.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });
      if(data){
        router.replace('/(tabs)')
      }
 //     return { data, error };
    } else {
      throw new Error('no ID token present!');
    }
  } catch (error) {
    console.error(error);
  }
}
*/
/*
const signInWithGoogle = async () => {
  try {
          await GoogleSignin.hasPlayServices()
          const response = await GoogleSignin.signIn()
         console.log(response)
  
          /*if (isSuccessResponse(response)) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.data.idToken,
            })
            console.log(error, data)
            if(data){
              router.push('/(tabs)')
            }
          }
        } catch (error: any) {
          if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
          console.log('error',error,statusCodes,error.code)
        }
}
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
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  console.log(data,error)  
  if(!error){
    Alert.alert('Success', 'Password reset email sent')
    setModalVisible(true);
  }
  else
    {
      Alert.alert('Error', `Failed to send password reset email ${error.message}`)
    }
}


const handlePasswordReset = async () => {
   
   
    setLoading(true);

    // Step A: Exchange the email token for an active authentication session
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: 'recovery', // Crucial parameter for password recovery paths
    });

    if (verifyError) {
      Alert.alert('Verification Failed', verifyError.message);
      setLoading(false);
      return;
    }

    // Step B: Authenticated session is now active. Apply the new password string.
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (updateError) {
      Alert.alert('Update Failed', updateError.message);
    } else {
      Alert.alert('Success', 'Your password has been successfully updated.');
      setModalVisible(false);
      // Route the user back to your sign-in layout page
    }
  };


  return (<>
     <View style={styles.containerView}>
      <Stack.Screen  options={{title: 'Sign In'}} />
     

     
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            
            <Image
              source={require('assets/images/splash-icon.png')}
              style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 20 }}
            />
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
              onPress={resetPass}
            ><Text style={{ fontSize: 14,color:'rgb(177, 134, 17)',alignContent:'flex-end'}}>Reset Password</Text></TouchableOpacity>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => onSubmit()}
              
            ><Text style={{padding:5,fontSize:18,fontWeight:800}}>Login</Text></TouchableOpacity>
           {/*} <TouchableOpacity
              style={styles.fbLoginButton}
              onPress={() => signInWithGoogle()}
              
              
            ><Text style={{ fontSize: 14}}>Login With Google</Text></TouchableOpacity>*/}

            

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
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
                           <View style={mystyles.overlay}>
                            <View style={[mystyles.modalContent,{overflow:'auto',minHeight:550}]}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="6-Digit Token" value={token} onChangeText={setToken} keyboardType="number-pad" />
      <TextInput placeholder="New Password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
      <Button title={loading ? "Updating..." : "Reset Password"} onPress={handlePasswordReset} disabled={loading} />
    </View>
                            </View>
                            </Modal>
    </>
  )
}

export default SignIn

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'white'
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
