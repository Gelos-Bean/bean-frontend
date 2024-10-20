import React, { useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';

export default function ItemLookup() {
  const [item, setItem] = useState(null);

  const handleItemLookup = async () => {
    try {
      const response = await fetch('http://localhost:3000/products/ITEM_ID'); // Update ITEM_ID with the actual item ID or get from user input
      const data = await response.json();

      if (data.success) {
        setItem(data.msg); // Assuming msg contains the item info
      } else {
        Alert.alert('Error', 'Item not found');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View>
      <Button title="Lookup Item" onPress={handleItemLookup} />
      {item && <Text>Item: {item.name} - ${item.price}</Text>}
    </View>
  );
}
