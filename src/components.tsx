interface ChildProps {
  children: React.ReactNode;
}

export function App() {
  return (
    <Container>
      <Text>Ayaya</Text>
      <Text>Also Ayayaya</Text>
    </Container>
  );
}

export function Container({ children }: ChildProps) {
  return <>{children}</>;
}

export function Text({ children }: ChildProps) {
  return (
    <>
      <SubText>Apple</SubText>
      <SubText>Banana</SubText>
      <SubText>Calabash</SubText>
      {children}
    </>
  );
}

function SubText({ children }: ChildProps) {
  return <>{children}</>;
}
