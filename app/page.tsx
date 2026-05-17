"use client";

import { useEffect, useState } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { supabase } from "./lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string | null;
  points: number;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-black text-white" : "bg-[#f8f5f0] text-black"
      }`}
    >
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold tracking-widest">LUXURY REWARDS</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury banner"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Luxury Rewards
          </h2>
          <p className="text-lg tracking-widest">豪華獎勵兌換平台</p>
        </div>
      </section>

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

      <section className="px-6 md:px-12 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            目前尚無商品，請到 Supabase 新增商品。
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? "bg-zinc-900" : "bg-white"
                }`}
              >
                <div className="h-64 overflow-hidden bg-gray-200">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      className="w-full h-full object-cover"
                      alt={product.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      尚無圖片
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-sm opacity-60 mb-2">
                    {product.category || "未分類"}
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
        )}
      </section>
    </main>
  );
}