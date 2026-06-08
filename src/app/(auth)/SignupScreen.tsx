
import { supabase } from '@/lib/supabase'
import { Link, router, Stack } from 'expo-router'
import React from 'react'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const SignUp = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const onSubmit = async () => {
        

        if(!email || !password) {
            setError('Please fill all fields')
            return;
        }
        setLoading(true);
        const {error} = await supabase.auth.signUp({email, password})
        if(error) {
            setError(error.message)
            Alert.alert('Error', error.message)
        }
        else
        {
           Alert.alert("Confirm Your Email","A Confirmation Email has been sent to you account. Please confirm your email by clicking the link we have sent you");
           router.replace("/(auth)/LoginScreen")
        }

        setLoading(false);
         

    }
  return (
  <View style={styles.containerView}>
        <Stack.Screen  options={{title: 'Sign Up'}} />
       
  
       
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
               <Image
                            source={require('assets/images/splash-icon.png')}
                            style={{ width: 300, height: 300, alignSelf: 'center', marginBottom: 20 }}
                          />
              
              <TextInput
                placeholder="Email"
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
                style={styles.loginButton}
                onPress={() => onSubmit()}
                
              ><Text style={{padding:5,fontSize:18,fontWeight:800}}>Sign Up</Text></TouchableOpacity>
              <TouchableOpacity
                style={styles.fbLoginButton}
                
                
                
              ><Text style={{ fontSize: 14}}>Login With Google</Text></TouchableOpacity>
                     <Link href={'/LoginScreen'} ><Text>Already have account , Sign In</Text></Link>
            </View>
     
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignUp

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
