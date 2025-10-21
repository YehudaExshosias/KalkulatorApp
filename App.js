import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const Btn = ({ text, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
    <Text style={styles.btnText}>{text}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState(null);
  const [op, setOp] = useState(null);
  const [newInput, setNewInput] = useState(true);

  const pushDigit = (d) => {
    if (newInput) {
      setDisplay(d === "." ? "0." : String(d));
      setNewInput(false);
    } else {
      if (display === "0" && d === "0") return;
      if (d === "." && display.includes(".")) return;
      setDisplay(display === "0" && d !== "." ? String(d) : display + d);
    }
  };

  const clearAll = () => {
    setDisplay("0"); setStored(null); setOp(null); setNewInput(true);
  };

  const compute = (a, b, operator) => {
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") return b === 0 ? "Error" : a / b;
    return b;
  };

  const applyOp = (nextOp) => {
    try {
      const cur = parseFloat(display);
      if (stored == null) setStored(cur);
      else if (!newInput) {
        const res = compute(stored, cur, op);
        setStored(res);
        setDisplay(String(res));
      }
    } catch(e){}
    setOp(nextOp); setNewInput(true);
  };

  const pressEq = () => {
    if (op == null || stored == null) return;
    const cur = parseFloat(display);
    const res = compute(stored, cur, op);
    setDisplay(String(res)); setStored(null); setOp(null); setNewInput(true);
  };

  const plusMinus = () => {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const backspace = () => {
    if (newInput || display.length <= 1) { setDisplay("0"); setNewInput(true); }
    else setDisplay(display.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayWrap}>
        <Text style={styles.displayText} numberOfLines={2}>{display}</Text>
      </View>

      <View style={styles.row}>
        <Btn text="C" onPress={clearAll} style={{backgroundColor:'#bdbdbd'}}/>
        <Btn text="±" onPress={plusMinus} style={{backgroundColor:'#bdbdbd'}}/>
        <Btn text="⌫" onPress={backspace} style={{backgroundColor:'#bdbdbd'}}/>
        <Btn text="÷" onPress={() => applyOp('/')} style={{backgroundColor:'#ff9500'}}/>
      </View>

      <View style={styles.row}>
        <Btn text="7" onPress={() => pushDigit('7')}/>
        <Btn text="8" onPress={() => pushDigit('8')}/>
        <Btn text="9" onPress={() => pushDigit('9')}/>
        <Btn text="×" onPress={() => applyOp('*')} style={{backgroundColor:'#ff9500'}}/>
      </View>

      <View style={styles.row}>
        <Btn text="4" onPress={() => pushDigit('4')}/>
        <Btn text="5" onPress={() => pushDigit('5')}/>
        <Btn text="6" onPress={() => pushDigit('6')}/>
        <Btn text="−" onPress={() => applyOp('-')} style={{backgroundColor:'#ff9500'}}/>
      </View>

      <View style={styles.row}>
        <Btn text="1" onPress={() => pushDigit('1')}/>
        <Btn text="2" onPress={() => pushDigit('2')}/>
        <Btn text="3" onPress={() => pushDigit('3')}/>
        <Btn text="+" onPress={() => applyOp('+')} style={{backgroundColor:'#ff9500'}}/>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.zeroBtn]} onPress={() => pushDigit('0')}>
          <Text style={styles.btnText}>0</Text>
        </TouchableOpacity>
        <Btn text="." onPress={() => pushDigit('.')} />
        <Btn text="=" onPress={pressEq} style={{backgroundColor:'#ff9500'}}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#121212', padding:12, justifyContent:'flex-end'},
  displayWrap:{minHeight:120, justifyContent:'center', alignItems:'flex-end', paddingRight:12},
  displayText:{color:'#fff', fontSize:48, fontWeight:'700'},
  row:{flexDirection:'row', justifyContent:'space-between', marginBottom:12},
  btn:{flex:1, height:72, marginHorizontal:6, borderRadius:12, backgroundColor:'#2b2b2b', justifyContent:'center', alignItems:'center'},
  zeroBtn:{flex:2, height:72, marginHorizontal:6, borderRadius:12, backgroundColor:'#2b2b2b', justifyContent:'center', alignItems:'center'},
  btnText:{color:'#fff', fontSize:24, fontWeight:'700'}
});