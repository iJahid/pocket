import { StyleSheet, View } from 'react-native';
import { Product } from '../types';

import { Text } from 'react-native';
import RemoteImage from './RemoteImage';
export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
type ProductItemProps = {
  product: Product;
  
}


export  const ProductListItem = ({product}: ProductItemProps) => {

  return (

   <View style={styles.container}>
      <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} resizeMode="contain" />
      
      <Text style={styles.title}>{product.name}</Text>
   </View>
    
 
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    maxWidth: '50%',
     justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
   imageContainer: {
    position: 'relative', // Crucial for absolute positioning of the checkmark
    width: '25%',
    backgroundColor:'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
    checkmarkOverlay: {
    position: 'absolute',
    top: 10,  // Adjust to position where you want (e.g., top-right)
    right: 10,
    backgroundColor: 'white', // Optional: background to make the checkmark pop
    borderRadius: 15,
  },
});
