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

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={true}
        maxLength={40}
      />
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageInicio: "pt",
      languageFim: "en",
      text: "",
      resultado: ""
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
    return <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Tradutor</Text>
        </View>
        <View style={{ flex:1, backgroundColor: "#000" }}>
          <View style={styles.containerOperadores}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>IDIOMA</Text>

              <Picker selectedValue={this.state.languageInicio} style={{ width: 140 }} onValueChange={(itemValue, itemIndex) => this.setState(
                    { languageInicio: itemValue }
                  )}>
                <Picker.Item label="Português" value="pt" />
                <Picker.Item label="Inglês" value="en" />
              </Picker>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>IDIOMA</Text>

              <Picker selectedValue={this.state.languageFim} style={{ width: 140 }} onValueChange={(itemValue, itemIndex) => this.setState(
                    { languageFim: itemValue }
                  )}>
                <Picker.Item label="Inglês" value="en" />
                <Picker.Item label="Português" value="pt" />
              </Picker>
            </View>
          </View>

          <View style={styles.container2}>
            <View style={styles.inputTraducao}>
              <TextInput style={{ height: 80, fontSize: 25 }} placeholder="Texto para traduzir" onChangeText={text => this.setState(
                    { text }
                  )} />
            </View>

            <View style={styles.inputResultado}>
              <Text style={{ fontSize: 25 }}>{this.state.resultado}</Text>
            </View>
            <View style={styles.ButtonTra}>
              <Button title="TRADUZIR" onPress={this.traduzir} />
            </View>
          </View>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerOperadores: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,

    paddingVertical: 15
  },
  inputResultado: {
    marginVertical: 15
  },
  inputTraducao: {
    marginVertical: 15
  },
  ButtonTra: {
    marginVertical: 15
  },
  header: {
    backgroundColor: "#696969",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    fontSize: 30,
    color: "#fff"
  },
  container2: {
    // flex: 4,
    marginVertical: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  fundo:{
    flex:1
  }
});
