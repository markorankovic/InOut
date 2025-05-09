import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Button, ScrollView, Text, TextStyle, View, ViewStyle } from 'react-native';
import { authorize, logout } from 'react-native-app-auth';

function Header(props: { loggedIn: boolean }): React.JSX.Element {
  const HEADER_STYLE: TextStyle = {
    fontSize: 30,
    textAlign: 'center',
  };

  return (
    <View>
      <Text style={HEADER_STYLE}>{`Test ${!props.loggedIn ? 'login' : 'logout'}`}</Text>
    </View>
  );
}

function Content(props: PropsWithChildren): React.JSX.Element {
  const SCREEN: ViewStyle = {
    flex: 8,
  };

  return (
    <View style={SCREEN}>
      {props.children}
    </View>
  );
}

function LoginView(props: { login: boolean, idToken: string | undefined, setIdToken: (idToken: string | undefined) => void }): React.JSX.Element {
  const SCROLL: ViewStyle = { height: 100, marginBottom: 20 };

  const [logoutStatus, setLogoutStatus] = useState<string>();

  async function LOGOUT() {
    const config = {
      issuer: 'https://login.microsoftonline.com/e9b7c3ca-e5b9-4e36-9505-31492675d3aa/v2.0',
      clientId: '7be81a56-1dbd-4817-b662-f9498b74fd4b',
    };
    logout(
      config,
      {
        postLogoutRedirectUrl: 'https://polite-desert-0d653561e.6.azurestaticapps.net',
        idToken: props.idToken!,
      },
    ).then(res => setLogoutStatus(res.state)).catch(err => setLogoutStatus(err));
    props.setIdToken(undefined);
  }

  async function LOGIN() {
    const config = {
      issuer: 'https://login.microsoftonline.com/e9b7c3ca-e5b9-4e36-9505-31492675d3aa/v2.0',
      clientId : "7be81a56-1dbd-4817-b662-f9498b74fd4b",
      redirectUrl: "com.inout://oauth/redirect",
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    };

    authorize(config)
    .then(res => props.setIdToken(res.idToken))
    .catch(err => props.setIdToken(err));
  }

  return (
    <View>
      <View style={SCROLL}>
        <ScrollView><Text>{props.idToken || !logoutStatus ? `ID Token: ${props.idToken ?? 'None'}` : `Logout status: ${logoutStatus}`}</Text></ScrollView>
      </View>
      <Button onPress={() => props.login ? LOGIN() : LOGOUT()} title={`${props.login ? 'Log in' : 'Log out'}`} />
    </View>
  );
}

function App(): React.JSX.Element {
  const SCREEN: ViewStyle = {
    flex: 1,
    padding: 20,
  };

  const [idToken, setIdToken] = useState<string>();

  const loggedIn = !!idToken;

  return (
    <View style={SCREEN}>
      <Header loggedIn={loggedIn} />
      <Content>
      </Content>
      <LoginView login={!loggedIn} idToken={idToken} setIdToken={setIdToken} />
    </View>
  );
}

export default App;
