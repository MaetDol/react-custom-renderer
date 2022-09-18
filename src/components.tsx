import React from "react";

export function App() {
  return (
    <Container>
      <Text>Ayaya</Text>
      <Text>Also Ayayaya</Text>
    </Container>
  );
}

export function Container({ children }) {
  return <>{children}</>;
}

export function Text({ children }) {
  return (
    <>
      <SubText>Apple</SubText>
      <SubText>Banana</SubText>
      <SubText>Calabash</SubText>
      {children}
    </>
  );
}

function SubText({ children }) {
  return <>{children}</>;
}
