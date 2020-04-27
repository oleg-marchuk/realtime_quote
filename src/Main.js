import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { Context } from "./Reducer/context";
import { loadData } from "./Reducer/actions";
import Quote from './components/Quote';

import openSocket from "socket.io-client";
const client = openSocket("https://qrtm1.ifxid.com:8443", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});

const Main = () => {

  const { state, dispatch } = useContext(Context);
  useEffect(() => {

    client.on("connect", () => {

      client.emit("subscribe", ["EURUSD"]);
      client.emit("subscribe", ["EURGBP"]);
      client.emit("subscribe", ["USDJPY"]);
      client.emit("subscribe", ["USDRUB"]);

      client.on("quotes", data => {
        loadData(dispatch, data)
      });

    });

    return function cleanup() {
      client.emit('unsubscribe', ['EURUSD'])
      client.emit('unsubscribe', ['EURGBP'])
      client.emit('unsubscribe', ['USDJPY'])
      client.emit('unsubscribe', ['USDRUB'])
    }
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={state.listData}
        renderItem={({ item }) => <Quote data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
  }
});

export default Main;