import { TodoForm } from "./components/TodoForm";

function App() {

  const electron = window.electron

  console.log("electronWeb ", electron)
  console.log("homeDir ", electron?.homeDir)
  console.log("arch ", electron?.osVersion)
  return (
    <div className="App">
      <h1>This is a electron app.</h1>
      <TodoForm />
    </div>
  );
}

export default App;
