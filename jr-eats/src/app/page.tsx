import MenuItem from "../components/MenuItem/MenuItem";
import Navbar from "@/components/Navbar/Navbar";
import prisma from "@/lib/db";
import { Item } from "@/generated/prisma";

const MainPage = async () => {
  const menuItems : Item[] = await prisma.item.findMany();
  
  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Food Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {menuItems.map((item : Item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
            price={item.price}
            imageSrc={item.imageUrl}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default MainPage;
