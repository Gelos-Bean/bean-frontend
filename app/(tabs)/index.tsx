import React from 'react';
import {
  StyleSheet,
  // Button,
  View,
  SafeAreaView,
  // Text,
  Alert,
} from 'react-native';

import { Avatar, Button, Card, Text } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView style={styles.container}>
    <View>
    <View style={styles.fixToText}>
        <Text>Logo</Text>
        <Text>Location</Text>
        <Text>Username</Text>
      </View>
      <Text style={styles.title}>
        Home
      </Text>     
    </View>
    <Separator />
    <View style={styles.cardContainer}>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} />
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
    </View>    
    <Separator />
    <View>
      <Text style={styles.title}>
       .{/* All interaction for the component are disabled.*/}
      </Text>
    </View>
    <Separator />
    <View>
      {/*This layout strategy lets the title define the width of the button.*/}
      <View style={styles.fixToText}>
        <Button icon="minus-box" mode="contained" onPress={() => console.log('Pressed')}>
          Void Item
        </Button>
        <Button icon="minus-box-multiple" mode="contained" onPress={() => console.log('Pressed')}>
          Void Order
        </Button>
        <Button icon="pencil" mode="contained" onPress={() => console.log('Pressed')}>
          Free Text
        </Button>
        <Button icon="magnify" mode="contained" onPress={() => console.log('Pressed')}>
          Search
        </Button>
      </View>
      <View style={styles.title}>
        <Button icon="cash-register" mode="contained" onPress={() => console.log('Pressed')}>
          Quick Pay
        </Button>
        <Button icon="send" mode="contained" onPress={() => console.log('Pressed')}>
          Add to Tab
        </Button>
      </View>
      <View style={styles.fixToText}>
        <Button icon="home" mode="contained" onPress={() => console.log('Pressed')}>
          Home
        </Button>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  header:{
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 20
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'row',
    left: 0,
    width: 900,
    justifyContent: 'space-between',
    
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;