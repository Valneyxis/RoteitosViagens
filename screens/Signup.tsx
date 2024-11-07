import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig'; 

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário criado:", user);
        navigation.replace('Splash'); 
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.error("Erro ao criar conta:", errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Criar conta</Text>
      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(val) => setName(val)}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(val) => setPassword(val)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(val) => setConfirmPassword(val)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? "Criando..." : "Criar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={() => navigation.replace('Login')}>
          <Text style={styles.signupTextExit}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1089D3',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#cff0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: 11,
    color: '#0099ff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#1089D3',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },

  errorText: {
    color: '#ff0000',
    fontSize: 12,
    },

  signup: {
    alignItems: 'center',
    marginTop: 20,
  },
  signupTextExit: {
    fontSize: 14,
    color: '#0099ff',
    textDecorationLine: 'none',
  },

  singupTextExit:{
    fontSize: 14,
    color: '#0099ff',
    },

  socialAccountContainer: {
    marginTop: 17,
  },
  socialAccountTitle: {
    fontSize: 10,
    color: '#aaa',
    textAlign: 'center',
  },
  socialAccounts: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 5,
  },
  socialButton: {
    backgroundColor: '#1089D3',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#cff0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  agreement: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 9,
    color: '#0099ff',
  },
});
