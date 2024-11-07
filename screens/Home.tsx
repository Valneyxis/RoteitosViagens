import { useState } from "react";
import { Text, View, StyleSheet, StatusBar, TextInput, Platform, Pressable, ScrollView, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';



const statusBarHeight = StatusBar.currentHeight;

export default function Index() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState('');

  const KEY_GPT = "Minha chave";

  async function handleGenerate() {
    if (city === "") {
      Alert.alert("Atenção", "Preencha o nome da cidade!");
      return;
    }

    setLoading(true);
    setTravel('');
    Keyboard.dismiss();

    const prompt = `Crie um roteiro para uma viagem de exatos ${days.toFixed(0)} dias na cidade de ${city}, busque por lugares turisticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${KEY_GPT}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.2,
          top_p: 1
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setTravel(data.choices[0].message.content.trim());
      } else {
        Alert.alert("Erro", "Não foi possível gerar o roteiro.");
      }
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#f1f1f1" />
        <Text style={styles.heading}>Roteiro em Mente</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Cidade destino</Text>
          <TextInput
            placeholder="Ex: Fortaleza, CE"
            style={styles.input}
            value={city}
            onChangeText={(text) => setCity(text)}
          />

          <Text style={styles.label}>Tempo de estadia: <Text style={styles.days}>{days.toFixed(0)}</Text> dias</Text>
          <Slider
            minimumValue={1}
            maximumValue={7}
            minimumTrackTintColor="#009688"
            maximumTrackTintColor="#000000"
            value={days}
            onValueChange={setDays}
          />
        </View>

        <Pressable
            style={[styles.button, loading && { backgroundColor: '#aaa' }]}
            onPress={handleGenerate}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <>
              <Text style={styles.buttonText}>Gerar roteiro</Text>
              <MaterialIcons name="travel-explore" size={24} color="#fff" />
            </>}
          </Pressable>

        <ScrollView contentContainerStyle={{ paddingBottom: 18, marginTop: 4 }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
          {loading && (
            <View style={styles.content}>
              <Text style={styles.title}>Carregando roteiro...</Text>
              <ActivityIndicator size="large" color="#009688" />
            </View>
          )}
          {travel && (
            <View style={styles.content}>
              <Text style={styles.title}>Roteiro da viagem 👇</Text>
              <Text>{travel}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 54,
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  days: {
    backgroundColor: "#f1f1f1"
  },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  containerScroll: {
    flex: 1,
    width: '100%',
  }
});
