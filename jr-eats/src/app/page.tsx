import Image from "next/image";
import MenuItem from "../components/MenuItem/MenuItem";
import Navbar from "@/components/Navbar/Navbar";

const MainPage = () => {
  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Food Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <MenuItem
          title="Meat Bowl"
          description="Juicy grilled meat with rice, veggies, and sauce."
          price={12.99}
          imageSrc="/meatbowl.jpg"
        />

        <MenuItem
          title="Salad Bowl"
          description="Roasted veggies, quinoa, and avocado dressing."
          price={10.99}
          imageSrc="/saladbowl.jpg"
        />
      </div>
    </div>
    </div>
  );
};

export default MainPage;
