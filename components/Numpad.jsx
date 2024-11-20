import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
} from "react-native";

const DialpadKeypad = ({ code, setCode }) => {
  const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "enter"];
  const dialPadSize = 90;
  const dialPadTextSize = dialPadSize * 0.4;

  return (
    <FlatList
      data={dialPadContent}
      numColumns={3}
      contentContainerStyle={{alignSelf:'center'}}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (item === "clear") {
              setCode(""); 
            } else if (item === "enter") {
              Alert.alert("🎉", "Congratulations, you pressed enter!");
            } else {
              setCode((prev) => prev + item.toString()); 
            }
          }}
        >
          <View
            style={[
              {
                backgroundColor: item === "" ? "transparent" : "#fff",
                width: 140,
                height: 80,
              },
              styles.dialPadContainer,
            ]}
          >
            <Text
              style={[
                { fontSize: item === "clear" || item === "enter" ? 15 : dialPadTextSize },
                styles.dialPadText,
              ]}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default DialpadKeypad;

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "transparent",
  },
  dialPadText: {
    color: "#808080",
  },
});