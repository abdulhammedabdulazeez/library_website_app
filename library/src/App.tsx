import { Button } from "./components/ui/button";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ALU Library
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Knowledge Management Platform
          </p>
          <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
            Library OPAC
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
