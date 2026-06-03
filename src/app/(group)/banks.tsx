import { useTransactionListFor } from '@/api/orders'
import { mystyles } from '@/lib/styles'
import { useAuth } from '@/providers/AuthProvider'
import { expDataTypeDB } from '@/types'
import BankForm from '@components/BankForm'

import IncomeItem from '@components/incomeItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'


const xpDataAdd1:expDataTypeDB={

    xndate:new Date(),
category:'Wallet+',
item:'',    
amount:null,
notes:'',
xntype:'wallet',
user_id:'',
bankid:0,
xninout:1,
xn_for:'XCH',
bank_name:'',

}

const Banks = () => {
   
  const {profile}=useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  //const [xpData,setXpData]=useState<any[]>([])
  const [xpDataAdd,setXpDataAdd]=useState<expDataTypeDB>()

const {data: xpData }=  useTransactionListFor('XCH')


  useEffect(()=>{

        /*const LoadExpenseList=async ()=>{
            const {data,error}=await supabase.from('transactions').select('*').eq('user_id',profile?.id)
            setXpData(data as any);
            setXpDataAdd(xpDataAdd1 as any);

          console.log(data,xpDataAdd)
        }
        LoadExpenseList();*/
//console.log('from income',xpData);

 setXpDataAdd(xpDataAdd1 as any);
                     setXpDataAdd(prev => ({ ...prev, user_id: profile?.id }) as expDataTypeDB)
  },[])
  

  
  return (
    <>
    <View>
        <View style={mystyles.section}>
                   
               <View style={mystyles.sectionBody}>
                 <View style={[mystyles.rowWrapper, mystyles.rowFirst]}>
                  
<FlatList
data={xpData}
renderItem={(item)=>(<IncomeItem expData={item } />)}
/>

                  
                  


                  
                   
                  
                   
                     <View style={mystyles.row}>
                        <Text style={mystyles.rowLabel}>Report Bug</Text>
                  
                        <View style={mystyles.rowSpacer} />
                    </View>
                 </View>
               
                </View>
                
        </View>
        
      </View>
                   
                    <TouchableOpacity 
        style={mystyles.floatingButton} 
       
        activeOpacity={0.8}
        onPress={()=>{
          setModalVisible(true)


        }}
      >
        <FontAwesome name='plus' size={20}/>
      </TouchableOpacity>


      <Modal visible={isModalVisible} transparent={true} animationType="slide">
                      <View style={mystyles.overlay}>
                       <View style={mystyles.modalContent}>
                                                
                                               
                        <TouchableOpacity style={mystyles.closeButton} onPress={() => setModalVisible(false)}>
                          <Text style={mystyles.closeText}>✕</Text>
                        </TouchableOpacity>

                            <BankForm inputdata={xpDataAdd} isAdd={true} onClose={() => setModalVisible(false)} />
                                                       
                         </View>
                      
                      
                      </View>
                      
                    </Modal>
      </>   
     




    
  )
}

export default Banks