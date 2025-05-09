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
        postLogoutRedirectUrl: "https://polite-desert-0d653561e.6.azurestaticapps.net",
        idToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI3YmU4MWE1Ni0xZGJkLTQ4MTctYjY2Mi1mOTQ5OGI3NGZkNGIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZTliN2MzY2EtZTViOS00ZTM2LTk1MDUtMzE0OTI2NzVkM2FhL3YyLjAiLCJpYXQiOjE3NDY4MDk5ODUsIm5iZiI6MTc0NjgwOTk4NSwiZXhwIjoxNzQ2ODEzODg1LCJlbWFpbCI6InJheXNoYXc3NDM1QGdtYWlsLmNvbSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZC8iLCJuYW1lIjoiTWFya28gUmFua292aWMiLCJub25jZSI6InFBMzBJS3pVYlJIbHA1SUU1T195R1EiLCJvaWQiOiI5YWRjY2I1Mi1kZDhhLTQ1YzYtYWExMC1jMmE1YzUyNTRkNjYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYXlzaGF3NzQzNUBnbWFpbC5jb20iLCJyaCI6IjEuQVU0QXlzTzM2Ym5sTms2VkJURkpKblhUcWxZYTZIdTlIUmRJdG1MNVNZdDBfVXNXQVJOT0FBLiIsInNpZCI6IjAwNGRiMmI5LTg2NjEtYzRjMC00ODlhLWU4ZGFkZjRjMGE2YSIsInN1YiI6IkpVRWpqVGF6Y0IzUWplUmN3WEt4RURaVTN3dFBETzF5MjVfdmtxb1VLMWciLCJ0aWQiOiJlOWI3YzNjYS1lNWI5LTRlMzYtOTUwNS0zMTQ5MjY3NWQzYWEiLCJ1dGkiOiJpY0EyWXlDMWtrLUU0ZDZKa3JjU0FBIiwidmVyIjoiMi4wIn0.PmLqkODAQnajjDEPRtWhmlU29qpz7Hm52Xfzk2EWj6Ny5S1DCPTnLEZ8KcpMjR6bMMoCkPn5XnMI_ulREmH_KGqzpvH-dz8POJYZ25CS_i8JrRJBkJDHvzIi6RiBzMxEUTFC9K6y-VVnziOWb4ac6qDkuFVrxIqUHVFUiEB_WPoc-XDdgYfueE7-DiasinNKJ69tw3Ech-H-gsrtnciyUcLXxYJ0sSwLPxY4564GR1R_lb3DJBpGl5QnqeIwIQVYYw6JjkLByp0Cyom7hU_IGt9N8IhEsU2rceKPLaMUHksKgWZj8DxVfwk5OZdnkk_WUMw2SFKMRJkZD2Q9RKzOYw"
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
    .then(res => { console.log(res); props.setIdToken(res.idToken); })
    .catch(err => console.log(err));
    // const result = await authorize(config);
    // console.log('Sup');
    // console.log('[login] access token: ' + result.accessToken);
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
