import React, { useReducer } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Main from "./src/Main"
import { quotesReducer } from "./src/Reducer/quotesReducer";
import { Context } from "./src/Reducer/context";
import { initState } from "./src/Reducer/initState";

const App: () => React$Node = () => {

  const [state, dispatch] = useReducer(quotesReducer, initState);

  return (
    <SafeAreaView style={styles.container}>
      <Context.Provider value={{ state, dispatch }}>
        <Main />
      </Context.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
