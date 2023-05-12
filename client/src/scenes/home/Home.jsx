import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe" 

const Home = () => {
  return (
    <main className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </main>
  );
};

export default Home;
