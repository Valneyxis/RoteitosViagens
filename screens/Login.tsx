import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig'; 

export default function LoginScreen({ navigation }: any)  {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.replace('Splash');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage); 
      })
      .finally(() => setLoading(false)); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
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
        {error && <Text style={styles.errorText}>{error}</Text>} 
        
        <TouchableOpacity 
          style={styles.forgotPassword} 
          onPress={() => Linking.openURL('#')} 
          accessible={true} 
          accessibilityRole="link">
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading} 
        >
          {loading ? ( 
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signup} 
          onPress={() => navigation.replace('Signup')}
        >
          <Text style={styles.signupText}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialAccountContainer}>
        <Text style={styles.socialAccountTitle}>Ou entre com</Text>
        <View style={styles.socialAccounts}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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

  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
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

  signup: {
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#0099ff',
    textDecorationLine: 'none',
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
