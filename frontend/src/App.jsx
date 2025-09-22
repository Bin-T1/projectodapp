import {Toaster} from "sonner";
import {BrowserRouter,Routes,Route} from "react-router";
import HomePage from "./pages/HomePage";
function App() {

  return (
    <>
      <Toaster position="top-right" richColors/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
