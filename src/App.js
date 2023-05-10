import Layout from "./pages/Layout";
import ProviderLayout from "./pages/ProviderLayout";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import { Routes, Route, useLocation } from "react-router-dom";

import "./styles/App.css";

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.path}>
      <Route element={<ProviderLayout />}>
        <Route path="/" element={<Layout />}>
          <Route path="/random-recipes" element={<RecipeCard />} />
          <Route path="/random-recipes/search/:query" element={<RecipeCard />} />
          <Route path="/random-recipes/:id" element={<RecipeDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
