"use client";

import { useState, useMemo } from "react";

// Icons (Simple SVGs)
const Icons = {
  Smartphones: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  ),
  Laptops: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  Electronics: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  Audio: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
  ),
  Gaming: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
  ),
  Wearables: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Default: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
  )
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  oldPriceCents: number | null;
  imageUrl: string | null;
  categoryId: string | null;
};

type Category = {
  id: string;
  name: string;
};

export default function ShopClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("featured"); // featured, lowToHigh, highToLow

  // The Power Filter Logic
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    // 1. Filter by Search
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => {
        const catName = categories.find((c) => c.id === p.categoryId)?.name;
        return catName === selectedCategory;
      });
    }

    // 3. Sort
    if (sortOrder === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchTerm, selectedCategory, sortOrder, initialProducts, categories]);

  return (
    <div>
      {/* --- SEARCH & FILTER BAR --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 sticky top-4 z-10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for laptops, phones, electronics..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          {/* Sort Dropdown */}
          <select
            className="px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- CATEGORY CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
            selectedCategory === "All"
              ? "bg-gray-900 text-white shadow-lg scale-105"
              : "bg-white border text-gray-600 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
           {/* @ts-ignore */}
          {Icons.Default}
          <span className="mt-2 text-sm font-medium">All</span>
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
              selectedCategory === cat.name
                ? "bg-gray-900 text-white shadow-lg scale-105"
                : "bg-white border text-gray-600 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {/* @ts-ignore */}
            {Icons[cat.name] || Icons.Default}
            <span className="mt-2 text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* --- RESULTS INFO --- */}
      <div className="mb-4 text-gray-500 text-sm">
        Showing {filteredProducts.length} results
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group border rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
            <div className="aspect-square relative bg-gray-100 overflow-hidden">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-4">
               {categories.find(c => c.id === product.categoryId)?.name && (
                   <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                       {categories.find(c => c.id === product.categoryId)?.name}
                   </span>
               )}
              <h3 className="font-bold text-gray-900 truncate mt-1">{product.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <div>
                    <span className="text-lg font-bold text-gray-900">R{(product.price / 100).toFixed(2)}</span>
                    {product.oldPriceCents && (
                        <div className="text-xs text-gray-400 line-through">R{(product.oldPriceCents/100).toFixed(2)}</div>
                    )}
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm font-bold">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-400">No products found for "{searchTerm}"</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="mt-4 text-blue-600 hover:underline">
                Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}