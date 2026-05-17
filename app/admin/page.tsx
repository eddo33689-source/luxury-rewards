"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string | null;
  points: number;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    points: "",
    image_url: "",
    category: "",
    is_active: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  }

  async function addProduct() {
    if (!form.name || !form.points) {
      alert("請填商品名稱與點數");
      return;
    }

    const { error } = await supabase.from("products").insert({
      name: form.name,
      description: form.description,
      points: Number(form.points),
      image_url: form.image_url,
      category: form.category,
      is_active: form.is_active,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setForm({
      name: "",
      description: "",
      points: "",
      image_url: "",
      category: "",
      is_active: true,
    });

    fetchProducts();
  }

  async function updateProduct(id: number, field: string, value: any) {
    const { error } = await supabase
      .from("products")
      .update({ [field]: value })
      .eq("id", id);

    if (error) alert(error.message);
    fetchProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm("確定要刪除這個商品？")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) alert(error.message);
    fetchProducts();
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0] p-6 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">商品管理後台</h1>

        <section className="bg-white rounded-3xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">新增商品</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-3 rounded-xl" placeholder="商品名稱" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="兌換點數" value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="分類" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="border p-3 rounded-xl" placeholder="圖片網址" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <textarea className="border p-3 rounded-xl md:col-span-2" placeholder="商品描述" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <button onClick={addProduct} className="mt-5 px-6 py-3 rounded-full bg-black text-white">
            新增商品
          </button>
        </section>

        <section className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl shadow p-5 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
              <div className="w-full h-28 bg-gray-200 rounded-2xl overflow-hidden">
                {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover" alt={p.name} /> : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                <input className="border p-2 rounded-xl" defaultValue={p.name} onBlur={(e) => updateProduct(p.id, "name", e.target.value)} />
                <input className="border p-2 rounded-xl" defaultValue={p.points} onBlur={(e) => updateProduct(p.id, "points", Number(e.target.value))} />
                <input className="border p-2 rounded-xl" defaultValue={p.category || ""} onBlur={(e) => updateProduct(p.id, "category", e.target.value)} />
                <button onClick={() => updateProduct(p.id, "is_active", !p.is_active)} className={`p-2 rounded-xl ${p.is_active ? "bg-green-600 text-white" : "bg-gray-300"}`}>
                  {p.is_active ? "上架中" : "已下架"}
                </button>
                <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-xl bg-red-600 text-white">
                  刪除
                </button>

                <input className="border p-2 rounded-xl md:col-span-5" defaultValue={p.image_url || ""} onBlur={(e) => updateProduct(p.id, "image_url", e.target.value)} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}