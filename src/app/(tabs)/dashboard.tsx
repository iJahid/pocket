import { useYearlyByCatg } from '@/api/orders';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface ChartItem {
  value: number;
  color: string;
  text: string;
  label: string;
  textStyle?: object;
}
interface ChartItemLine {
  value: number;    // Value height placement
  label: string;    // Bottom X-axis descriptor string
  dataPointText: string; // Overlay value tag on top of the point node
}

const COLOR_PALETTE = ['#0093E9', '#24C6DC', '#80D0C7', '#E0C3FC', '#FF9A9E', '#FECFEF'];
const screenWidth = Dimensions.get('window').width;

const DashBoard = () => {
  const {profile}=useAuth();
  const {data,error,isLoading,isRefetching,refetch} = useYearlyByCatg(new Date().getFullYear(),'XP')
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [chartDataLine, setChartDataLine] = useState<ChartItemLine[]>([]);
  const [gTotal, setGTotal] = useState<number>(0);
  const [monthlyData,setMonthlyData]=useState()
  const [loading,setLoading]=useState(false);
  const [AvgExp,setAvgExp]=useState(0)

  const getMonthlyExpenses=async()=>{
    const {data:expData,error:expError}=await supabase.rpc('get_monthly_expenses',{userid: profile?.id}).select()
   
    setMonthlyData(expData)
  }



 const fetchLineData = async () => {
    try {
      
      
      // 3. Convert Database nodes to sequential Axis points
      
      const formattedData: ChartItemLine[] = monthlyData.map((item) => {
        return {
          value: item.total_expense,
          label: item.expense_month, // Map category name directly to X-Axis labels
          dataPointText: `${item.total_expense}` // Optional string label hanging right above node points
        };
      });

      setChartDataLine(formattedData);
    } catch (err: any) {
      //setError(err.message || 'Something went wrong');
    } finally {
      //setLoading(false);
    }
  };


const fetchPieData=async()=>{
    
  if(gTotal<=2) return;
try{

    const formattedData: ChartItem[] = data.map((item, index) => {
        // Calculate percentage relative to the total sum
        const calculatedPercentage = gTotal > 0 
          ? Math.round((item.expense / gTotal) * 100) 
          : 0;

        return {
          value: item.expense, // Gifted Charts uses relative numerical sizing automatically
          color: COLOR_PALETTE[index % COLOR_PALETTE.length], // Safe array loop wrap
          text: `${calculatedPercentage}% `, // Inner value text graphic
          label: `${item.category} ${item.expense}  `, // Category metadata for access paths
          textStyle: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 }
        };
      });
      setChartData(formattedData);
    }
    catch(err:any) {
      console.log('pidata',err,data)
    }

}
 
useEffect(()=>{
    
    setLoading(true);
  getMonthlyExpenses();

  //console.log("monhtly data",monthlyData);
  if(data){
    console.log('Yearly Data by Category:', data,error);
  }
  fetchLineData();
fetchPieData();
  const  totalAmount = data?.reduce((sum, item) => sum + item.expense, 0);
   setGTotal(totalAmount || 1);

    console.log('Total Amount:', totalAmount); 
const totalMonth=monthlyData?.length;
  if(totalMonth>0)
  {
    setAvgExp((totalAmount/totalMonth))
  }

setLoading(false)


},[data])

const refetchAll=()=>{
  setLoading(true);
  refetch();
  getMonthlyExpenses();

  
  fetchLineData();
  fetchPieData();
  const  totalAmount = data?.reduce((sum, item) => sum + item.expense, 0);
   setGTotal(totalAmount || 1);

  const totalMonth=monthlyData?.length;
  if(totalMonth>0)
  {
    setAvgExp((totalAmount/totalMonth))
  }


setLoading(false)


}

 if(isLoading || loading || isRefetching)
  return <ActivityIndicator size={20}/>

  return (<>
     <View style={styles.container}>
       <View style={{flexDirection:'row'}}>
          <View style={{alignItems:'center'}}>
            <Text style={styles.title}>This Year Expenses  </Text>
            <Text style={styles.title}>{gTotal.toFixed(2)}</Text>
            <Text style={{fontSize:16,color:'#9d10d4'}}>Avg. {AvgExp.toFixed(2)}/Month</Text>
          </View>
          <TouchableOpacity onPress={()=>refetchAll()}><FontAwesome name='refresh' size={20} color={'green'}/></TouchableOpacity></View>
      
          {/* 6. Dynamic Legend Map Generation */}
          <View style={[styles.legendContainer,{flexDirection:'row',borderWidth:1,padding:4,borderRadius:5,borderColor:'#ccdd'}]}>
            {chartData.map((item, index) => (
            <View key={index} style={[styles.legendItem,{width:'40%', maxWidth:'45%'}]}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}({item.text})</Text>
            </View>
            ))}
          </View>

          <Text style={styles.title}>Monthlly Expense Chart</Text>
      
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartDataLine}
          width={screenWidth - 90}   // Adjust sizing boundary to leave margins for Y axis text labels
          height={200}               // Base vertical track canvas size
          thickness={3}              // Control vector path width size
          color="#24C6DC"            // Primary trace path coloring scheme
          noOfSections={4}           // Horizontal reference division lines
          
          // Data node point adjustments
          dataPointsColor="#0093E9"
          dataPointsRadius={5}
          textColor="#444"
          textFontSize={10}
          
          // Curved or linear switch parameters
          curved                     // Set to false if you prefer hard geometric angled lines
          
          // Axis layout parameters
          xAxisColor="#ccc"
          yAxisColor="#ccc"
          xAxisLabelTextStyle={styles.axisLabel}
          yAxisTextStyle={styles.axisLabel}
          
          // Background layout configuration
          showGridLines
          gridLinesColor="#f0f0f0"
          
          // Animation config rules
          animateOnDataChange
          animationDuration={800}
        />
      </View>
    </View>
    </>
  )
}

export default DashBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  justifyContent:'center',
  alignItems:'center',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  centerTextSub: {
    fontSize: 12,
    color: '#999',
  },
  legendContainer: {
    flex:2,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 3,
  },
  colorIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15, 
  },
  axisLabel: {
    color: '#666',
    fontSize: 11,
  },
});