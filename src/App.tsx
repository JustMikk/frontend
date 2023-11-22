import { ChakraProvider } from "@chakra-ui/react";
import Routers from "./routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ChakraProvider>
        <Toaster />
        <Routers />
      </ChakraProvider>
    </>
  );
}

export default App;
