import { Text, View, StyleSheet } from "react-native";
import React from "react";
import '../global.css';
import { Redirect } from "expo-router";

import ScreenWrapper from "../components/ScreenWrapper";


export default function Index() {

  return (
    <Redirect href={'/home'}/>

    // <ScreenWrapper>
    //   <Text>Edit app/index.tsx to edit thig screen.</Text>
    // </ScreenWrapper>
  );
}

