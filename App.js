import { useState } from "react";

import {
  Button,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [height, setHeight] = useState(0);
  const [inch, setInch] = useState(0);
  const [weight, setWeight] = useState(0);
  const [unitSys, setUnitSys] = useState("S");
  const [BMI, setBMI] = useState(0);
  const calculate = () => {
    Keyboard.dismiss();
    if (height <= 0 || weight <= 0 || (unitSys === "S" && inch <= 0)) {
      return;
    } else {
      if (unitSys === "S") {
        console.log(
          parseInt(height) * 12 + inch,
          weight,
          (weight * 703) /
            ((12 * parseInt(height) + parseInt(inch)) *
              (12 * parseInt(height) + parseInt(inch)))
        );
        setBMI(
          Math.round(
            (parseInt(weight) /
              ((12 * parseInt(height) + parseInt(inch)) *
                (12 * parseInt(height) + parseInt(inch)))) *
              703 *
              10
          ) / 10
        );
      } else {
        setBMI(
          Math.round(
            (parseInt(weight) / parseInt(height) / parseInt(height)) *
              10000 *
              10
          ) / 10
        ); //100*100 is to convert cm to m
      }
      console.log(BMI);
      return;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top bar to select mesurement System */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => {
              setHeight(0);
              setWeight(0);
              setInch(0);
              setUnitSys("S");
            }}
          >
            <Text
              style={
                unitSys === "S"
                  ? StyleSheet.compose(
                      styles.topBarButtonText,
                      styles.topBarButtonTextSelected
                    )
                  : styles.topBarButtonText
              }
            >
              Standard Units
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => {
              setHeight(0);
              setWeight(0);
              setInch(0);
              setUnitSys("M");
            }}
          >
            <Text
              style={
                unitSys === "M"
                  ? StyleSheet.compose(
                      styles.topBarButtonText,
                      styles.topBarButtonTextSelected
                    )
                  : styles.topBarButtonText
              }
            >
              Metric Units
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputFieldBox}>
            <Text style={styles.inputLabel}>Height</Text>

            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="0"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>{unitSys === "S" ? "Ft" : "CM"}</Text>
            </View>
            {unitSys === "S" ? (
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  onChangeText={setInch}
                  value={inch}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <Text style={styles.unit}>In</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputFieldBox}>
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWeight}
              value={weight}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text style={styles.unit}>{unitSys === "M" ? "KG" : "LB"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
          <Text style={styles.calcBtnText}>Calculate</Text>
        </TouchableOpacity>
        {height <= 0 || weight <= 0 || (unitSys === "S" && inch <= 0) ? (
          <Text style={styles.err}>
            Please enter your proper weight and height to calculate your BMI
          </Text>
        ) : null}
        {BMI <= 0 ? null : <Text style={styles.ans}>Your BMI is {BMI}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FCFCFC",
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    height: 72,
    marginBottom: 64,
    borderWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: "#0F8B8D",
  },
  topBarButton: {
    flex: 1,
    height: "100%",
    color: "white",
  },
  topBarButtonTextSelected: {
    color: "#000",
    borderWidth: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 0,
    fontWeight: "500",
  },
  topBarButtonText: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#0F8B8D",
  },
  inputBox: {
    width: "60%",
  },
  inputFieldBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  inputField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 24,
    marginRight: 24,
  },
  input: {
    width: 40,
    height: 40,
    fontSize: 24,
    lineHeight: 24,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  unit: {
    marginLeft: 8,
  },
  calcBtn: {
    width: "60%",
    height: 40,
    backgroundColor: "#FF934F",
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center",
  },
  calcBtnText: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  err: {
    color: "#A30000",
    fontSize: 12,
    marginTop: 16,
  },
  ans: {
    fontSize: 32,
    fontWeight: "500",
    marginTop: 64,
  },
});
