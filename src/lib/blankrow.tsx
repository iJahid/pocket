import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { mystyles } from './styles'

const blankrow = () => {
  return (
    <View>
       <View style={mystyles.section}>
                   
               <View style={mystyles.sectionBody}>
                 <View style={[mystyles.rowWrapper, mystyles.rowFirst]}>
                   <View style={mystyles.row}>
                        
                        {/******** */}

                       
                        <Text style={mystyles.rowLabel}>Push Notifications</Text>
                          <View style={mystyles.rowSpacer} />
                            <TouchableOpacity style={{alignItems:'flex-end'}}>
                              <FontAwesome name='minus-circle' color={'red'} size={20}/>
                           </TouchableOpacity>
                        {/******** */}


                        
                    </View>
                     <View style={mystyles.row}>
                        <Text style={mystyles.rowLabel}>Report Bug</Text>
                  
                        <View style={mystyles.rowSpacer} />
                    </View>
                 </View>
                 
                </View>
                
        </View>
    </View>
  )
}

export default blankrow