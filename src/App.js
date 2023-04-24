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
          <Route path="/random-recipe" element={<RecipeCard />} />
          <Route path="/random-recipes/:query" element={<RecipeCard />} />
          <Route path="/random-recipe/:id" element={<RecipeDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
