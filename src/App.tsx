import Button from "@mui/material/Button";
import { useStore } from "./store-test";

function App() {
  const bears = useStore((state: any) => state?.bears);
  const increasePopulation = useStore((state: any) => state.increasePopulation);
  return (
    <>
      <div className="bg-black text-white">
        <p>hola</p>
        <p>{bears}</p>
        <Button variant="contained" onClick={increasePopulation}>
          Hello world{" "}
        </Button>
        ;
      </div>
    </>
  );
}

export default App;
