// ...existing code...
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, postProduct, updateProduct, deleteProduct } from "@/src/services/products";
import type { ProductInput } from "@/src/services/products";
import { Product } from "@/src/models/Product";
import Button from "@/src/components/ui/Button";
import Badge from "@/src/components/ui/Badge";
import Card from "@/src/components/ui/Card";
import { useAuth } from "@/src/context/AuthContext";
// ...existing code...

// El formulario solo maneja campos editables (sin _id ni createdAt)
const emptyForm: ProductInput = {
  sku: "",
  name: "",
  brand: "",
  quantity: 0,
  price: 0,
  isActive: true,
  category: "",
  imageUrl: "",
};
// ...existing code...

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Guard: si no hay user redirige a /login
  useEffect(() => {
    if (!user && !document.cookie.includes("tn_auth=1")) {
      router.push("/login");
    }
  }, [user, router]);

  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductInput>({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter(
      p =>
        (!filterBrand || p.brand === filterBrand) &&
        (!filterCategory || p.category === filterCategory)
    );
  }, [items, filterBrand, filterCategory]);

  const load = async () => {
    try {
      const data = await getProducts();
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      if (editingId) {
        const updated = await updateProduct(editingId, form);
        setItems(prev => prev.map(p => (p._id === editingId ? updated : p)));
        setMessage("Producto actualizado");
      } else {
        const created = await postProduct(form);
        setItems(prev => [created, ...prev]);
        setMessage("Producto creado");
      }
      setForm({ ...emptyForm });
      setEditingId(null);
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    }
  };

  const onEdit = (p: Product) => {
    // Quitamos campos no editables antes de cargar al formulario
    const { _id, createdAt, ...rest } = p;
    setForm(rest as ProductInput);
    setEditingId(p._id!);
  };

  const onDelete = async (id: string) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      setItems(prev => prev.filter(p => p._id !== id));
    } catch (e: any) {
      setError(e.message || "Error al eliminar");
    }
  };

  const brands = Array.from(new Set(items.map(i => i.brand))).sort();
  const categories = Array.from(new Set(items.map(i => i.category))).sort();

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Dashboard</h2>
        <div className="row" style={{ gap: 8 }}>
          <span>Hola, {user?.name}</span>
          <Button variant="secondary" size="sm" onClick={logout}>
            Salir
          </Button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>{editingId ? "Editar producto" : "Nuevo producto"}</h3>
        <form onSubmit={onSubmit} className="row" style={{ flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label className="label">SKU*</label>
            <input
              className="input"
              value={form.sku}
              onChange={e => setForm({ ...form, sku: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <label className="label">Nombre*</label>
            <input
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <label className="label">Marca*</label>
            <input
              className="input"
              value={form.brand}
              onChange={e => setForm({ ...form, brand: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <label className="label">Cantidad*</label>
            <input
              className="input"
              type="number"
              min={0}
              value={form.quantity}
              onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
              required
            />
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <label className="label">Precio*</label>
            <input
              className="input"
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <label className="label">Categoría*</label>
            <input
              className="input"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 260px" }}>
            <label className="label">Imagen (URL)</label>
            <input
              className="input"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <label className="label">Activo</label>
            <select
              value={form.isActive ? "true" : "false"}
              onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div style={{ alignSelf: "end" }}>
            <Button type="submit">{editingId ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
        {message && <p style={{ color: "#10b981" }}>{message}</p>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      </div>

      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
        <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
          <option value="">Todas las marcas</option>
          {brands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <Card key={p._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Badge variant={p.isActive ? "success" : "danger"}>
                {p.isActive ? "Activo" : "Inactivo"}
              </Badge>
              <Badge>{p.category}</Badge>
            </div>
            <img
              src={p.imageUrl || "https://placehold.co/600x400?text=TechNova"}
              alt={p.name}
              style={{ width: "100%", borderRadius: 12, marginTop: 8 }}
            />
            <h4 style={{ marginBottom: 4 }}>{p.name}</h4>
            <p style={{ marginTop: 0, color: "#9aa4b2" }}>
              {p.brand} · SKU {p.sku}
              {p.createdAt && <> · {new Date(p.createdAt).toLocaleDateString()}</>}
            </p>
            <p style={{ fontWeight: 700 }}>COP ${p.price.toLocaleString()}</p>
            <div className="row">
              <Button size="sm" onClick={() => onEdit(p)}>
                Editar
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(p._id!)}>
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
// ...existing code...