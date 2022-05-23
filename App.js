import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';
import { setWarningFilter } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const backgroundImg = 'https://i.pinimg.com/originals/2a/24/74/2a24740658e1910bcfedbbdd83098c4e.jpg'

const App = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const Yscroll = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsloading(true);
    getAllUsers();
    return () => {

    }
  }, []);

  getAllUsers = () => {
    fetch('https://api.github.com/search/users?q=followers:%3E=1&ref=searchresults&s=followers&type=Users&per_page=100&page=1')
      .then((res) => res.json())
      .then((resJson) => { setData(resJson.items) })
      .catch(console.error)
      .finally(() => setIsloading(false));
  }

  const renderUser = ({ item, index }) => {
    const scale = Yscroll.interpolate({
      inputRange: [
        -1, 0,
        sizeOfItem * index,
        sizeOfItem * (index + 2)
      ],
      outputRange: [1, 1, 1, 0]
    })
    return (
      <Animated.View style={
        [styles.item]
      }>
        <Image
          style={styles.image}
          source={{ uri: item.avatar_url }}
          resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
        />
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{`${item.id} \n ${item.login}`}</Text>
        </View>
      </Animated.View>
    )

  }


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: backgroundImg }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      {
        isLoading ? <ActivityIndicator /> : (
          <Animated.FlatList
            data={data}
            renderItem={renderUser}
            contentContainerStyle={{
              padding: 20
            }}
          />
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 18
  },
  image: {
    width: 100,
    height: imgHeight
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'row',
    marginBottom: marginBottomItem,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 30,
    padding: paddingItem
  },
  container: {
    flex: 1
  }

});

export default App;
