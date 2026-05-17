"use client";

import { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";

const products = [
  {
    id: 1,
    name: "AirPods Pro",
    points: 12000,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=1200&auto=format&fit=crop",
    category: "電子產品",
  },
  {
    id: 2,
    name: "星巴克咖啡券",
    points: 500,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    category: "禮券",
  },
  {
    id: 3,
    name: "Dyson 吹風機",
    points: 25000,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    category: "生活用品",
  },
  {
    id: 4,
    name: "精品香水",
    points: 8000,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    category: "精品",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-black text-white" : "bg-[#f8f5f0] text-black"
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold tracking-widest">
          LUXURY REWARDS
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Luxury Rewards
          </h2>
          <p className="text-lg tracking-widest">
            精選點數兌換商城
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-6 md:px-12 py-10">
        <div className="max-w-xl mx-auto relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="搜尋商品..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white text-black shadow-lg outline-none"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-12 pb-8 flex gap-4 overflow-x-auto">
        {["全部", "電子產品", "禮券", "生活用品", "精品"].map((cat) => (
          <button
            key={cat}
            className="px-5 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 ${
                darkMode ? "bg-zinc-900" : "bg-white"
              }`}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-sm opacity-60 mb-2">
                  {product.category}
                </p>

                <h3 className="text-2xl font-semibold mb-4">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {product.points.toLocaleString()} 點
                  </span>

                  <button className="px-4 py-2 rounded-full bg-black text-white hover:opacity-80">
                    查看
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}