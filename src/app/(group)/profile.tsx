
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function Profile() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });


  const {session,profile}=useAuth();

  const [fullName,setFullName]=useState('');
  //console.log(JSON.stringify(session,null,2))

  useEffect(() => {
 /* const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      router.push('/(tabs)')
    }
  });

  return () => subscription.unsubscribe();*/

  setFullName(profile?.name)
}, []);


  const onSaveFullName= async()=>{
    console.log('saving full name')
    const {data,error}=await supabase.from('profiles').update({'name':fullName}).eq('id',session?.user.id)
    console.log(data,session?.user.id,fullName);
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <Stack.Screen options={{ headerTitle: 'Preferences' }} />
      <View style={styles.header}>
        <View style={styles.headerAction}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Ionicons
              color="#000"
              name="bag-check"
              size={24} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={styles.headerTitle}>
          Profile
        </Text>

        <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Ionicons
              color="#000"
              name="pulse-sharp"
              size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.sectionBody}>
            <View style={styles.profile}>
              <Image
                alt=""
                source={{
                  //uri: session?.user.ima,
                }}
                style={styles.profileAvatar} />

              <View style={styles.profileBody}>
                <TextInput style={styles.profileName}
                onChangeText={setFullName}
                value={fullName}
                placeholder='Your Name'
                
                />
                <Text style={styles.profileName}>{session?.user.email}</Text>

                
              </View>
            <TouchableOpacity
              onPress={() => {
                onSaveFullName()
              }}
              >
              <Ionicons
                color="#bcbcbc"
                name="save-outline"
                size={22} />
            </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Language</Text>

                <View style={styles.rowSpacer} />

                <Text style={styles.rowValue}>English</Text>

                <Ionicons
                  color="#bcbcbc"
                  name="arrow-up-right-box"
                  size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Location</Text>

                <View style={styles.rowSpacer} />

                <Text style={styles.rowValue}>Los Angeles, CA</Text>

                <Ionicons
                  color="#bcbcbc"
                  name="arrow-up-right-box"
                  size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  onValueChange={emailNotifications =>
                    setForm({ ...form, emailNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.emailNotifications} />
              </View>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  onValueChange={pushNotifications =>
                    setForm({ ...form, pushNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.pushNotifications} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>

                <View style={styles.rowSpacer} />

                <Ionicons
                  color="#bcbcbc"
                  name="arrow-back-circle"
                  size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Report Bug</Text>

                <View style={styles.rowSpacer} />

               <Ionicons
                  color="#bcbcbc"
                  name="arrow-back-circle"
                  size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Rate in App Store</Text>

                <View style={styles.rowSpacer} />

                <Ionicons
                  color="#bcbcbc"
                  name="arrow-back-circle"
                  size={19} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Terms and Privacy</Text>

                <View style={styles.rowSpacer} />

               <Ionicons
                  color="#bcbcbc"
                  name="arrow-back-circle"
                  size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View
              style={[
                styles.rowWrapper,
                styles.rowFirst,
                styles.rowLast,
                { alignItems: 'center' },
              ]}>
              <TouchableOpacity
                onPress={async ()=>{
                  console.log('siginingoute')
                  await supabase.auth.signOut()
                  router.replace('/(auth)/LoginScreen')
                 // return <Redirect href={'/LoginScreen'}/>
                }}
                style={styles.row}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
});