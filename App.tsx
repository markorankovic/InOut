import React, { PropsWithChildren, useState } from 'react';
import { Button, Text, TextStyle, View, ViewStyle } from 'react-native';

function Header(): React.JSX.Element {
  const HEADER_STYLE: TextStyle = {
    fontSize: 30,
    textAlign: 'center',
  };

  return (
    <View>
      <Text style={HEADER_STYLE}>Test login/logout</Text>
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

function LoginView(props: { login: boolean }): React.JSX.Element {
  const SCREEN: ViewStyle = {
    flex: 1,
  };

  return (
    <View style={SCREEN}>
      <Button title={`${props.login ? 'Log in' : 'Log out'}`} />
    </View>
  );
}

function App(): React.JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const SCREEN: ViewStyle = {
    flex: 1,
    padding: 20,
  };

  return (
    <View style={SCREEN}>
      <Header />
      <Content>
      </Content>
      <LoginView login={!loggedIn} />
    </View>
  );
}

export default App;
