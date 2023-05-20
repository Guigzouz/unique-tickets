// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Dimensions, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Colors } from "../styles/colors";

const SearchBar = ({searchPhrase, setSearchPhrase}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          placeholderTextColor={Colors.secondaryDark}
          onFocus={() => {
        }}
        />
            <Feather
              name="search"
              size={20}
              color="white"
              style={{ marginLeft: 1 }}
            />
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: width - 30,

  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryLight,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
    color: Colors.primaryLight,
    fontFamily: 'Montserrat-Italic'

  }
});