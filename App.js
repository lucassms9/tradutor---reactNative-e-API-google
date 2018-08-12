import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Alert,
  View,
  Picker,
  TextInput
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageInicio: "pt",
      languageFim: "en",
      text: "",
      resultado: "12313123"
    };

    this.traduzir = this.traduzir.bind(this);
  }
  traduzir() {
    var languageInicio = this.state.languageInicio;
    var languageFim = this.state.languageFim;
    var textTraduzir = this.state.text;

    var url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
      languageInicio +
      "&tl=" +
      languageFim +
      "&dt=t&q=" +
      encodeURI(textTraduzir);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ resultado: data[0][0][0] });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Tradutor</Text>
        </View>

        <View style={styles.containerOperadores}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>IDIOMA</Text>

            <Picker
              selectedValue={this.state.languageInicio}
              style={{ width: 140 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ languageInicio: itemValue })
              }
            >
              <Picker.Item label="Português" value="pt" />
              <Picker.Item label="Inglês" value="en" />
            </Picker>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>IDIOMA</Text>

            <Picker
              selectedValue={this.state.languageFim}
              style={{ width: 140 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ languageFim: itemValue })
              }
            >
              <Picker.Item label="Inglês" value="en" />
              <Picker.Item label="Português" value="pt" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputTraducao}>
          <TextInput
            style={{ height: 80 }}
            placeholder="Texto para traduzir"
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <View style={styles.inputResultado}>
          <TextInput
            editable={false}
            style={{ height: 80 }}
            value={this.state.resultado}
            onChangeText={resultado => this.setState({ resultado })}
          />
        </View>
        <Button title="TRADUZIR" onPress={this.traduzir} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerOperadores: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15
  },
  inputTraducao: {

  },
  header: {
    backgroundColor: "#808080",

    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    fontSize: 30,
    color: "#fff"
  }
});
