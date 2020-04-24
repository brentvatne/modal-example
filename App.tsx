import React from "react";
import {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

enableScreens();

/**
 * Here we use a form sheet via the Modal component.
 * Comment this App component out and uncomment the one below to try it with react-native-screens
 */
export default function App() {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal visible={modalIsVisible} presentationStyle="formSheet" animated={true}>
        <View style={styles.centeredView}>
          <SegmentedControlIOS
            values={["Option 1", "Option 2"]}
            selectedIndex={0}
            style={{ marginBottom: 30 }}
          />
        </View>
      </Modal>
      <SegmentedControlIOS
        values={["Option 1", "Option 2"]}
        selectedIndex={0}
        style={{ marginBottom: 30 }}
      />
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalIsVisible(false);
          requestAnimationFrame(() => {
            setModalIsVisible(true);
          });
        }}
      >
        <Text style={styles.textStyle}>Show Modal via Modal component</Text>
      </TouchableHighlight>
    </View>
  );
}

/**
 * Here we use a form sheet via react-native-screens.
 */
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Home />
//     </NavigationContainer>
//   );
// }

const Stack = createNativeStackNavigator();
function Home() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, stackPresentation: "formSheet" }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Modal" component={ModalScreen} />
    </Stack.Navigator>
  );
}

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.centeredView}>
      <SegmentedControlIOS
        values={["Option 1", "Option 2"]}
        selectedIndex={0}
        style={{ marginBottom: 30 }}
      />
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => navigation.navigate("Modal")}
      >
        <Text style={styles.textStyle}>Show Modal via Navigation</Text>
      </TouchableHighlight>
    </View>
  );
};

const ModalScreen = ({ navigation }: any) => {
  return (
    <View style={styles.centeredView}>
      <View style={{ marginTop: 30 }} />
      <View style={styles.centeredView}>
        <SegmentedControlIOS
          values={["Option 1", "Option 2"]}
          selectedIndex={0}
          style={{ marginBottom: 30 }}
        />

        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
