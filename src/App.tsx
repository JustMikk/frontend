import { ChakraProvider } from "@chakra-ui/react";
import Routers from "./routes/Routes";

function App() {
  return (
    <>
      <ChakraProvider>
        <Routers />
      </ChakraProvider>
    </>
  );
}

export default App;
