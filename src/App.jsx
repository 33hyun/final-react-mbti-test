import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

// Query 설정
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;