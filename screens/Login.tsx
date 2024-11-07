import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const handleLogin = () => {
    // Simulação do login
    navigation.replace('Splash');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword} onPress={() => Linking.openURL('#')} accessible={true} accessibilityRole="link">
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singup} onPress={() => Linking.openURL('#')}>
          <Text style={styles.singupText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialAccountContainer}>
        <Text style={styles.socialAccountTitle}>Or Sign in with</Text>
        <View style={styles.socialAccounts}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>G</Text>
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

  singup: {
    alignItems: 'center',
    marginTop: 20,
  },
  singupText: {
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
    backgroundColor: '#6f6f6f',
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
  socialButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  agreement: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 9,
    color: '#0099ff',
  },
});
