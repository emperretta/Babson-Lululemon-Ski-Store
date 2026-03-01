import { useState, useEffect } from "react";

const PRODUCTS = [
  // Women's Tops
  { id: 1, name: "Scuba Oversized Half-Zip Hoodie", price: 65, colors: ["Black", "Navy", "Grey"], sizes: ["XS/S", "M/L", "XL/XXL"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW3IG3S_042797_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 2, name: "Scuba Oversized Funnel-Neck Half Zip *Long", price: 65, colors: ["Black", "Navy"], sizes: ["XS/S", "M/L", "XL/XXL"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW3ICYS_045797_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 3, name: "Swiftly Tech Long-Sleeve Shirt 2.0 *Waist Length", price: 40, colors: ["Black", "Grey"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW3HF4S_074082_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 4, name: "Swiftly Tech Racerback Tank Top 2.0 *Waist Length", price: 30, colors: ["Black", "Grey"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW1CN3S_073184_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 5, name: "Swiftly Tech Short-Sleeve Shirt 2.0 *Hip Length", price: 35, colors: ["Grey", "Black", "White", "Navy Blue"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW3DFMS_074073_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 6, name: "Free to Be Bra - Wild *Light Support, A/B Cup", price: 25, colors: ["Black"], sizes: ["2", "4", "6", "8", "10", "12"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW2731S_0002_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 7, name: "Love Tank Top", price: 20, colors: ["Black", "Grey"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW1DDWS_032493_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  // Women's Bottoms
  { id: 8, name: "Hotty Hot High-Rise Lined Short 2.5\"", price: 35, colors: ["Black", "Navy", "White"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW7DE5S_074056_1?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 9, name: "Scuba High-Rise Short 5\"", price: 35, colors: ["Grey"], sizes: ["XS/S", "M/L", "XL/XXL"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW7DLCS_072761_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 10, name: "Scuba Mid-Rise Oversized Jogger *Regular", price: 60, colors: ["Navy", "Black", "Grey"], sizes: ["XS/S", "M/L", "XL/XXL"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW5HJHS_030437_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 11, name: "lululemon Align™ High-Rise Pant 28\"", price: 50, colors: ["Black"], sizes: ["0", "2", "4", "6", "8", "10", "12", "14"], category: "Women", image: "https://images.lululemon.com/is/image/lululemon/LW5CZ4S_072757_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  // Men's Tops
  { id: 12, name: "City Sweat Pullover Hoodie", price: 65, colors: ["Navy", "Black", "Grey"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3GMVS_035955_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 13, name: "Soft Jersey Half Zip", price: 50, colors: ["Black", "Grey"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3ES1S_040468_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 14, name: "License to Train Long-Sleeve Shirt", price: 45, colors: ["Black", "White"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3EJXS_072761_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 15, name: "Evolution Short-Sleeve Polo Shirt", price: 45, colors: ["Navy", "Black", "White"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3EN0S_074027_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 16, name: "License to Train Short-Sleeve Shirt", price: 40, colors: ["Black", "Navy", "White"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3EJUS_072756_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 17, name: "Metal Vent Tech Short-Sleeve Shirt", price: 40, colors: ["Black", "Grey"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM3GDSS_075014_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  // Men's Bottoms
  { id: 18, name: "ABC Jogger *Regular", price: 65, colors: ["Black", "Navy", "Light Grey", "Dark Grey"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM5AQ5S_0001_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 19, name: "City Sweat Jogger *Regular", price: 60, colors: ["Grey", "Navy", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM5ABTT_032489_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 20, name: "Steady State Classic-Fit Jogger *Regular", price: 60, colors: ["Black", "Grey", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM5BIMS_072756_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 21, name: "Zeroed In Linerless Short 7\"", price: 35, colors: ["Black"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM7BU1S_075488_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  { id: 22, name: "Pace Breaker Linerless Short 7\"", price: 35, colors: ["Black"], sizes: ["S", "M", "L", "XL", "XXL"], category: "Men", image: "https://images.lululemon.com/is/image/lululemon/LM7B80S_074052_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
  // Accessories
  { id: 23, name: "Everywhere Backpack 22L", price: 40, colors: ["Black"], sizes: ["One Size"], category: "Accessories", image: "https://images.lululemon.com/is/image/lululemon/LU9CMAS_075034_2?wid=750&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" },
];

const EMBROIDERY_COST = 5;

const SkiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
    <circle cx="17" cy="3" r="2" />
    <path d="M7 21l4-4" />
  </svg>
);

const CartIcon = ({ count }) => (
  <div style={{ position: "relative", cursor: "pointer" }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && (
      <span className="cart-badge" key={count} style={{
        position: "absolute", top: -6, right: -8,
        background: "linear-gradient(135deg, #e63946, #c41e3a)", color: "#fff", fontSize: 11, fontWeight: 700,
        width: 20, height: 20, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(196,30,58,0.4)",
      }}>{count}</span>
    )}
  </div>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #e6f5ec, #d4edda)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(26,107,58,0.15)" }}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a472a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("store"); // store | cart | checkout | confirmed
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [venmo, setVenmo] = useState("");
  const [orders, setOrders] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);

  // Load orders from storage
  useEffect(() => {
    const data = localStorage.getItem("ski_store_orders");
    if (data) setOrders(JSON.parse(data));
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem("ski_store_orders", JSON.stringify(newOrders));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartEmbroidery = cart.reduce((s, i) => s + EMBROIDERY_COST * (i.embroideryQty || 0), 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = () => {
    if (!selectedColor || !selectedSize) return;
    const existing = cart.findIndex(
      (i) => i.productId === selectedProduct.id && i.color === selectedColor && i.size === selectedSize
    );
    if (existing >= 0) {
      const updated = [...cart];
      updated[existing].qty += qty;
      setCart(updated);
    } else {
      setCart([...cart, {
        id: Date.now(),
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        color: selectedColor,
        size: selectedSize,
        qty,
        embroideryQty: qty,
      }]);
    }
    setSelectedProduct(null);
    setSelectedColor("");
    setSelectedSize("");
    setQty(1);
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart(cart.map((i) => {
      if (i.id === id) {
        const newQty = Math.max(1, i.qty + delta);
        const newEmbQty = Math.min(i.embroideryQty, newQty);
        return { ...i, qty: newQty, embroideryQty: newEmbQty };
      }
      return i;
    }));
  };

  const setEmbroideryQty = (id, val) => {
    setCart(cart.map((i) => {
      if (i.id === id) {
        const newVal = Math.max(0, Math.min(i.qty, val));
        return { ...i, embroideryQty: newVal };
      }
      return i;
    }));
  };

  const submitOrder = () => {
    if (!name.trim() || !email.trim()) return;
    const orderEmbroidery = cart.reduce((s, i) => s + EMBROIDERY_COST * (i.embroideryQty || 0), 0);
    const order = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      venmo: venmo.trim(),
      items: [...cart],
      subtotal: cartTotal,
      embroidery: orderEmbroidery,
      total: cartTotal + orderEmbroidery,
      paid: false,
      date: new Date().toISOString(),
    };
    const newOrders = [...orders, order];
    saveOrders(newOrders);
    setCart([]);
    setName("");
    setEmail("");
    setPhone("");
    setVenmo("");
    setView("confirmed");
  };

  const togglePaid = (orderId) => {
    const newOrders = orders.map((o) =>
      o.id === orderId ? { ...o, paid: !o.paid } : o
    );
    saveOrders(newOrders);
  };

  const deleteOrder = (orderId) => {
    const newOrders = orders.filter((o) => o.id !== orderId);
    saveOrders(newOrders);
  };

  const cancelOrder = (orderId) => {
    const newOrders = orders.map((o) =>
      o.id === orderId ? { ...o, cancelled: !o.cancelled } : o
    );
    saveOrders(newOrders);
  };

  const activeOrders = orders.filter((o) => !o.cancelled);
  const cancelledOrders = orders.filter((o) => o.cancelled);

  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const totalRevenue = activeOrders.reduce((s, o) => s + o.total, 0);
  const totalPaid = activeOrders.filter((o) => o.paid).reduce((s, o) => s + o.total, 0);
  const totalUnpaid = totalRevenue - totalPaid;

  // Aggregate items for master order (only active orders)
  const aggregateItems = () => {
    const map = {};
    activeOrders.forEach((o) => {
      o.items.forEach((item) => {
        const key = `${item.name}|${item.color}|${item.size}`;
        if (!map[key]) map[key] = { ...item, qty: 0, embroideryQty: 0 };
        map[key].qty += item.qty;
        map[key].embroideryQty += (item.embroideryQty || 0);
      });
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  };

  const exportMasterCSV = () => {
    const agg = aggregateItems();
    if (agg.length === 0) return;
    const headers = ["Item", "Color", "Size", "Qty", "Embroidery Qty", "Unit Price", "Line Total"];
    const rows = agg.map((item) => [
      `"${item.name}"`, item.color, item.size, item.qty, item.embroideryQty,
      `$${item.price.toFixed(2)}`, `$${(item.price * item.qty).toFixed(2)}`
    ]);
    const grandTotal = agg.reduce((s, i) => s + i.price * i.qty, 0);
    const totalEmbroidery = agg.reduce((s, i) => s + i.embroideryQty * EMBROIDERY_COST, 0);
    rows.push([]);
    rows.push(["", "", "", "", "", "Lululemon Total", `$${grandTotal.toFixed(2)}`]);
    rows.push(["", "", "", "", "", "Embroidery Total", `$${totalEmbroidery.toFixed(2)}`]);
    rows.push(["", "", "", "", "", "Grand Total", `$${(grandTotal + totalEmbroidery).toFixed(2)}`]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "babson_ski_team_lululemon_order.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportAllOrdersCSV = () => {
    if (activeOrders.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Venmo", "Item", "Color", "Size", "Qty", "Embroidery Qty", "Unit Price", "Line Total", "Order Total", "Paid"];
    const rows = [];
    activeOrders.forEach((o) => {
      o.items.forEach((item, idx) => {
        rows.push([
          idx === 0 ? `"${o.name}"` : "", idx === 0 ? o.email : "", idx === 0 ? o.phone : "",
          idx === 0 ? (o.venmo || "") : "",
          `"${item.name}"`, item.color, item.size, item.qty, item.embroideryQty || 0,
          `$${item.price.toFixed(2)}`, `$${(item.price * item.qty).toFixed(2)}`,
          idx === 0 ? `$${o.total.toFixed(2)}` : "", idx === 0 ? (o.paid ? "Yes" : "No") : ""
        ]);
      });
    });
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "babson_ski_team_all_orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // COLOR MAP for swatches
  const colorMap = {
    "Black": "#1a1a1a", "Navy": "#1b2a4a", "Navy Blue": "#1b2a4a", "Grey": "#7a7a7a",
    "White": "#f5f5f5", "Light Grey": "#b5b5b5", "Dark Grey": "#4a4a4a",
  };

  // ---- STYLES ----
  const styles = {
    app: {
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "#f5f4f1",
      minHeight: "100vh",
      color: "#1a1a1a",
    },
    header: {
      background: "linear-gradient(180deg, #1a472a 0%, #1d5030 100%)",
      color: "#fff",
      padding: "0 32px",
      height: 68,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    },
    logo: {
      display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 18,
      letterSpacing: "0.02em", cursor: "pointer",
    },
    headerRight: { display: "flex", alignItems: "center", gap: 20 },
    banner: {
      background: "linear-gradient(135deg, #14352a 0%, #1a472a 30%, #2d6b45 70%, #1a472a 100%)",
      backgroundSize: "200% 200%",
      color: "#fff",
      padding: "56px 24px 52px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    bannerTitle: {
      fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", margin: 0,
      fontFamily: "'DM Sans', sans-serif",
      fontStyle: "italic",
      textShadow: "0 2px 12px rgba(0,0,0,0.15)",
    },
    bannerSub: { fontSize: 16, opacity: 0.9, marginTop: 10, fontWeight: 400, letterSpacing: "0.01em" },
    filterBar: {
      display: "flex", gap: 8, padding: "20px 24px", justifyContent: "center",
      flexWrap: "wrap",
    },
    filterBtn: (active) => ({
      padding: "10px 24px", borderRadius: 100, border: "none",
      background: active ? "linear-gradient(135deg, #1a472a, #2d6b45)" : "#fff",
      color: active ? "#fff" : "#555",
      fontWeight: 600, fontSize: 13, cursor: "pointer",
      boxShadow: active ? "0 4px 14px rgba(26,71,42,0.25)" : "0 2px 8px rgba(0,0,0,0.06)",
      fontFamily: "inherit",
      letterSpacing: "0.02em",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: 22, padding: "4px 28px 48px",
      maxWidth: 1140, margin: "0 auto",
    },
    card: {
      background: "#fff", borderRadius: 14, overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      cursor: "pointer",
    },
    cardImgWrap: {
      overflow: "hidden", position: "relative", background: "#eae8e4",
    },
    cardImg: {
      width: "100%", height: 240, objectFit: "cover",
      background: "#eae8e4", display: "block",
    },
    cardBody: { padding: "16px 18px 20px" },
    cardName: { fontSize: 14, fontWeight: 600, lineHeight: 1.4, margin: 0, minHeight: 40, color: "#2a2a2a" },
    cardPrice: { fontSize: 17, fontWeight: 800, color: "#1a472a", marginTop: 8 },
    cardColors: { display: "flex", gap: 6, marginTop: 10 },
    colorDot: (hex, selected) => ({
      width: 20, height: 20, borderRadius: "50%", background: hex,
      border: selected ? "2.5px solid #1a472a" : hex === "#f5f5f5" ? "1px solid #d0d0d0" : "1px solid transparent",
      cursor: "pointer",
      boxShadow: selected ? "0 0 0 2px #fff, 0 0 0 4px #1a472a" : "none",
    }),
    // Modal
    overlay: {
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    },
    modal: {
      background: "#fff", borderRadius: 20, maxWidth: 440, width: "100%",
      maxHeight: "85vh", overflow: "auto", padding: 28,
      boxShadow: "0 25px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
    },
    modalClose: {
      background: "none", border: "none", cursor: "pointer", color: "#888",
      position: "absolute", top: 16, right: 16,
    },
    label: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#666", marginTop: 16, display: "block" },
    sizeGrid: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 },
    sizeBtn: (active) => ({
      padding: "9px 16px", borderRadius: 10,
      border: active ? "2px solid #1a472a" : "1.5px solid #e0e0e0",
      background: active ? "#eef5f0" : "#fff",
      fontWeight: 600, fontSize: 13, cursor: "pointer",
      fontFamily: "inherit",
    }),
    addBtn: {
      width: "100%", padding: "16px", borderRadius: 12,
      background: "linear-gradient(135deg, #1a472a, #2d6b45)", color: "#fff", border: "none",
      fontWeight: 700, fontSize: 15, cursor: "pointer",
      marginTop: 20, fontFamily: "inherit",
      letterSpacing: "0.02em",
    },
    addBtnDisabled: {
      width: "100%", padding: "16px", borderRadius: 12,
      background: "#e0e0e0", color: "#999", border: "none",
      fontWeight: 700, fontSize: 15, cursor: "not-allowed",
      marginTop: 20, fontFamily: "inherit",
      letterSpacing: "0.02em",
    },
    // Cart
    cartContainer: {
      maxWidth: 640, margin: "0 auto", padding: "24px",
    },
    cartItem: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 0", borderBottom: "1px solid #eee",
    },
    cartItemInfo: { flex: 1 },
    cartItemName: { fontWeight: 600, fontSize: 14, margin: 0 },
    cartItemMeta: { fontSize: 12, color: "#888", marginTop: 2 },
    qtyControl: {
      display: "flex", alignItems: "center", gap: 8, marginTop: 6,
    },
    qtyBtn: {
      width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd",
      background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", fontFamily: "inherit",
    },
    cartItemPrice: { fontWeight: 700, fontSize: 15, minWidth: 60, textAlign: "right" },
    removeBtn: {
      background: "none", border: "none", color: "#c41e3a", cursor: "pointer",
      fontSize: 12, fontWeight: 600, marginLeft: 12, fontFamily: "inherit",
    },
    // Input
    input: {
      width: "100%", padding: "13px 16px", borderRadius: 10,
      border: "1.5px solid #e0e0e0", fontSize: 14, fontFamily: "inherit",
      marginTop: 6, boxSizing: "border-box",
      outline: "none", background: "#fafaf8",
    },
    // Admin
    adminBtn: {
      fontSize: 11, color: "rgba(255,255,255,0.45)", background: "none",
      border: "none", cursor: "pointer", fontFamily: "inherit",
      letterSpacing: "0.08em", fontWeight: 600,
      transition: "color 0.2s",
    },
    adminTag: (paid) => ({
      display: "inline-block", padding: "3px 10px", borderRadius: 100,
      fontSize: 11, fontWeight: 700,
      background: paid ? "#e6f5ec" : "#fde8e8",
      color: paid ? "#1a6b3a" : "#c41e3a",
    }),
  };

  // ---- PRODUCT MODAL ----
  const ProductModal = () => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    const canAdd = selectedColor && selectedSize;
    return (
      <div className="modal-overlay" style={styles.overlay} onClick={() => { setSelectedProduct(null); setSelectedColor(""); setSelectedSize(""); setQty(1); }}>
        <div className="modal-content" style={{ ...styles.modal, padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
          {/* Modal Product Image */}
          <div style={{ position: "relative" }}>
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: 220, objectFit: "cover", display: "block", background: "#e8e6e1" }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <button onClick={() => { setSelectedProduct(null); setSelectedColor(""); setSelectedSize(""); setQty(1); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", color: "#888", padding: 6, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
              <XIcon />
            </button>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{p.name}</h2>
                <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 800, color: "#1a472a" }}>${p.price}.00</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#888" }}>+ ${EMBROIDERY_COST}.00 embroidery per item</p>
              </div>
            </div>

            <span style={styles.label}>Color</span>
            <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
              {p.colors.map((c) => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{
                  padding: "6px 14px", borderRadius: 100,
                  border: selectedColor === c ? "2px solid #1a472a" : "1px solid #ddd",
                  background: selectedColor === c ? "#eef5f0" : "#fff",
                  fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: colorMap[c] || "#888", border: c === "White" ? "1px solid #ccc" : "none" }} />
                  {c}
                </button>
              ))}
            </div>

            <span style={styles.label}>Size</span>
            <div style={styles.sizeGrid}>
              {p.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)} style={styles.sizeBtn(selectedSize === s)}>
                  {s}
                </button>
              ))}
            </div>

            <span style={styles.label}>Quantity</span>
            <div style={{ ...styles.qtyControl, marginTop: 6 }}>
              <button style={styles.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon /></button>
              <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>{qty}</span>
              <button style={styles.qtyBtn} onClick={() => setQty(qty + 1)}><PlusIcon /></button>
            </div>

            <button
              onClick={canAdd ? addToCart : undefined}
              style={canAdd ? styles.addBtn : styles.addBtnDisabled}
            >
              {canAdd ? `Add to Cart — $${(p.price * qty).toFixed(2)}` : "Select color & size"}
            </button>
          </div>{/* end padding wrapper */}
        </div>
      </div>
    );
  };

  // ---- ADMIN PANEL ----
  const AdminPanel = () => {
    if (!showAdmin) return null;
    if (!adminAuthed) {
      return (
        <div style={styles.overlay} onClick={() => setShowAdmin(false)}>
          <div style={{ ...styles.modal, maxWidth: 340, textAlign: "center" }} onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 16px" }}>Admin Access</h3>
            <input
              type="password"
              placeholder="Enter password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && adminPass === "babsonski") setAdminAuthed(true); }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              style={styles.input}
              autoFocus
            />
            <button
              onClick={() => { if (adminPass === "babsonski") setAdminAuthed(true); }}
              style={{ ...styles.addBtn, marginTop: 12 }}
            >
              Enter
            </button>
          </div>
        </div>
      );
    }

    const agg = aggregateItems();

    return (
      <div style={styles.overlay} onClick={() => { setShowAdmin(false); setAdminAuthed(false); setAdminPass(""); }}>
        <div style={{ ...styles.modal, maxWidth: 720, maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>📋 Admin Dashboard</h2>
            <button onClick={() => { setShowAdmin(false); setAdminAuthed(false); setAdminPass(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}>
              <XIcon />
            </button>
          </div>

          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "#f0f7f2", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#666", letterSpacing: "0.05em" }}>Active Orders</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1a472a" }}>{activeOrders.length}</div>
            </div>
            <div style={{ background: "#e6f5ec", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#666", letterSpacing: "0.05em" }}>Paid</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1a6b3a" }}>${totalPaid.toFixed(2)}</div>
            </div>
            <div style={{ background: "#fde8e8", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#666", letterSpacing: "0.05em" }}>Unpaid</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#c41e3a" }}>${totalUnpaid.toFixed(2)}</div>
            </div>
          </div>

          {/* Export Buttons */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            <button onClick={exportMasterCSV} style={{
              padding: "10px 20px", borderRadius: 8, border: "2px solid #1a472a",
              background: "#fff", color: "#1a472a", fontWeight: 700, fontSize: 13,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              📥 Download Master Order (CSV)
            </button>
            <button onClick={exportAllOrdersCSV} style={{
              padding: "10px 20px", borderRadius: 8, border: "2px solid #1a472a",
              background: "#fff", color: "#1a472a", fontWeight: 700, fontSize: 13,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              📥 Download All Orders (CSV)
            </button>
          </div>

          {/* Master Order */}
          {agg.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Master Order (for Lululemon)</h3>
              <div style={{ background: "#f9f9f7", borderRadius: 10, padding: 14 }}>
                {agg.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < agg.length - 1 ? "1px solid #eee" : "none", fontSize: 13 }}>
                    <span><strong>{item.qty}x</strong> {item.name} — {item.color}, {item.size} {item.embroideryQty > 0 ? `(Embroidery: ${item.embroideryQty})` : ""}</span>
                    <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Orders */}
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Active Orders</h3>
          {activeOrders.length === 0 ? (
            <p style={{ color: "#999", fontSize: 14 }}>No orders yet.</p>
          ) : (
            activeOrders.map((o) => (
              <div key={o.id} style={{ background: "#f9f9f7", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: 15 }}>{o.name}</strong>
                    <span style={{ marginLeft: 10 }}>{styles.adminTag ? <span style={styles.adminTag(o.paid)}>{o.paid ? "PAID" : "UNPAID"}</span> : null}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#1a472a" }}>${o.total.toFixed(2)}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{o.email} {o.phone && `· ${o.phone}`} {o.venmo && `· Venmo: ${o.venmo}`}</div>
                <div style={{ marginTop: 6 }}>
                  {o.items.map((item, idx) => (
                    <div key={idx} style={{ fontSize: 12, color: "#555", padding: "2px 0" }}>
                      {item.qty}x {item.name} — {item.color}, {item.size}{item.embroideryQty > 0 ? ` (Embroidery: ${item.embroideryQty})` : ""} (${(item.price * item.qty).toFixed(2)})
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                    Embroidery: ${(o.items.reduce((s, i) => s + (i.embroideryQty || 0), 0) * EMBROIDERY_COST).toFixed(2)} ({o.items.reduce((s, i) => s + (i.embroideryQty || 0), 0)} items)
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => togglePaid(o.id)} style={{
                    padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                    background: o.paid ? "#fde8e8" : "#e6f5ec",
                    color: o.paid ? "#c41e3a" : "#1a6b3a",
                    fontWeight: 600, fontSize: 12, fontFamily: "inherit",
                  }}>
                    {o.paid ? "Mark Unpaid" : "Mark Paid"}
                  </button>
                  <button onClick={() => cancelOrder(o.id)} style={{
                    padding: "6px 16px", borderRadius: 6, border: "1px solid #e8a840",
                    background: "#fff8ed", color: "#b47a1a", fontWeight: 600, fontSize: 12,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    Cancel Order
                  </button>
                  <button onClick={() => deleteOrder(o.id)} style={{
                    padding: "6px 16px", borderRadius: 6, border: "1px solid #ddd",
                    background: "#fff", color: "#c41e3a", fontWeight: 600, fontSize: 12,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Cancelled Orders */}
          {cancelledOrders.length > 0 && (
            <>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, marginTop: 24, color: "#888" }}>Cancelled Orders</h3>
              {cancelledOrders.map((o) => (
                <div key={o.id} style={{ background: "#f5f5f5", borderRadius: 10, padding: 14, marginBottom: 10, opacity: 0.7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: 15, textDecoration: "line-through" }}>{o.name}</strong>
                      <span style={{ marginLeft: 10, display: "inline-block", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: "#f5ecd7", color: "#b47a1a" }}>CANCELLED</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#888", textDecoration: "line-through" }}>${o.total.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{o.email}</div>
                  <div style={{ marginTop: 6 }}>
                    {o.items.map((item, idx) => (
                      <div key={idx} style={{ fontSize: 12, color: "#999", padding: "2px 0" }}>
                        {item.qty}x {item.name} — {item.color}, {item.size}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button onClick={() => cancelOrder(o.id)} style={{
                      padding: "6px 16px", borderRadius: 6, border: "1px solid #ddd",
                      background: "#e6f5ec", color: "#1a6b3a", fontWeight: 600, fontSize: 12,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>
                      Restore Order
                    </button>
                    <button onClick={() => deleteOrder(o.id)} style={{
                      padding: "6px 16px", borderRadius: 6, border: "1px solid #ddd",
                      background: "#fff", color: "#c41e3a", fontWeight: 600, fontSize: 12,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>
                      Delete Permanently
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.app}>

      {/* Header */}
      <header className="store-header" style={styles.header}>
        <div style={styles.logo} onClick={() => setView("store")}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/images/babson-skiing-logo.png" alt="Babson Skiing" style={{ height: 42, objectFit: "contain" }} />
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.adminBtn} onClick={() => setShowAdmin(true)} onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.45)'}>ADMIN</button>
          <div onClick={() => cart.length > 0 && setView("cart")} style={{ transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <CartIcon count={cartCount} />
          </div>
        </div>
      </header>

      {view === "store" && (
        <>
          {/* Banner */}
          <div className="store-banner" style={styles.banner}>
            <div className="banner-pattern" />
            <h1 style={styles.bannerTitle}>Team Store</h1>
            <p style={styles.bannerSub}>Babson Alpine Ski Team × Lululemon — Exclusive team pricing</p>
            <p style={{ fontSize: 13, opacity: 0.55, marginTop: 8, letterSpacing: "0.02em" }}>All items will be embroidered with team logo (+${EMBROIDERY_COST}/item)</p>
          </div>

          {/* Filters */}
          <div style={styles.filterBar}>
            {["All", "Women", "Men", "Accessories"].map((f) => (
              <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={styles.filterBtn(filter === f)}>{f}</button>
            ))}
          </div>

          {/* Product Grid */}
          <div style={styles.grid}>
            {filtered.map((p) => (
              <div
                key={p.id}
                className="product-card"
                style={styles.card}
                onClick={() => setSelectedProduct(p)}
              >
                <div style={styles.cardImgWrap}>
                  <img
                    className="card-image"
                    src={p.image}
                    alt={p.name}
                    style={styles.cardImg}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.querySelector('.card-fallback').style.display = 'flex'; }}
                  />
                  <div className="card-fallback" style={{ ...styles.cardImg, display: "none", alignItems: "center", justifyContent: "center", fontSize: 40, background: "#eae8e4", color: "#bbb", position: "absolute", top: 0, left: 0 }}>
                    ⛷
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <p style={styles.cardName}>{p.name}</p>
                  <p style={styles.cardPrice}>${p.price}.00</p>
                  <div style={styles.cardColors}>
                    {p.colors.map((c) => (
                      <span key={c} className="color-swatch" style={styles.colorDot(colorMap[c] || "#888", false)} title={c} />
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: "#b0b0b0", marginTop: 8, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{p.category}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "cart" && (
        <div className="page-section" style={styles.cartContainer}>
          <button onClick={() => setView("store")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1a472a", fontWeight: 600, fontSize: 14, fontFamily: "inherit", marginBottom: 16, padding: 0, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
            ← Continue Shopping
          </button>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 24px", letterSpacing: "-0.02em" }}>Your Cart</h2>
          {cart.length === 0 ? (
            <p style={{ color: "#999" }}>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartItemInfo}>
                    <p style={styles.cartItemName}>{item.name}</p>
                    <p style={styles.cartItemMeta}>{item.color} · {item.size}</p>
                    <div style={styles.qtyControl}>
                      <span style={{ fontSize: 12, color: "#888", minWidth: 28 }}>Qty:</span>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}><MinusIcon /></button>
                      <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}><PlusIcon /></button>
                    </div>
                    <div style={{ ...styles.qtyControl, marginTop: 4 }}>
                      <span style={{ fontSize: 12, color: "#1a472a", fontWeight: 600, minWidth: 28 }}>Embroidery:</span>
                      <button style={styles.qtyBtn} onClick={() => setEmbroideryQty(item.id, item.embroideryQty - 1)}><MinusIcon /></button>
                      <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.embroideryQty}</span>
                      <button style={styles.qtyBtn} onClick={() => setEmbroideryQty(item.id, item.embroideryQty + 1)}><PlusIcon /></button>
                      <span style={{ fontSize: 11, color: "#999" }}>of {item.qty} embroidered (+${EMBROIDERY_COST}/ea)</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={styles.cartItemPrice}>${(item.price * item.qty + EMBROIDERY_COST * item.embroideryQty).toFixed(2)}</div>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{ padding: "20px 0", borderTop: "2px solid #1a472a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                  <span>Subtotal</span><span style={{ fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4, color: "#888" }}>
                  <span>Embroidery ({cart.reduce((s, i) => s + (i.embroideryQty || 0), 0)} items × ${EMBROIDERY_COST})</span><span>${cartEmbroidery.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 800, marginTop: 10, color: "#1a472a" }}>
                  <span>Total</span><span>${(cartTotal + cartEmbroidery).toFixed(2)}</span>
                </div>
              </div>
              <button className="cta-btn" onClick={() => setView("checkout")} style={styles.addBtn}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {view === "checkout" && (
        <div className="page-section" style={styles.cartContainer}>
          <button onClick={() => setView("cart")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1a472a", fontWeight: 600, fontSize: 14, fontFamily: "inherit", marginBottom: 16, padding: 0, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
            ← Back to Cart
          </button>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Checkout</h2>
          <p style={{ color: "#888", fontSize: 14, marginTop: 0, marginBottom: 24 }}>
            Submit your order. Payment will be collected separately via Venmo/Zelle.
          </p>

          <label style={{ ...styles.label, marginTop: 0 }}>Full Name *</label>
          <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} placeholder="Your full name" />

          <label style={styles.label}>Email *</label>
          <input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} placeholder="your.email@babson.edu" type="email" />

          <label style={styles.label}>Phone</label>
          <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} placeholder="(optional)" />

          <label style={styles.label}>Venmo Username *</label>
          <input className="form-input" value={venmo} onChange={(e) => setVenmo(e.target.value)} style={styles.input} placeholder="@your-venmo" />

          <div style={{ background: "#f9f9f7", borderRadius: 14, padding: 20, marginTop: 28, border: "1px solid #eee" }}>
            <h4 style={{ margin: "0 0 10px", fontSize: 14 }}>Order Summary</h4>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span>{item.qty}x {item.name} — {item.color}, {item.size}{item.embroideryQty > 0 ? ` (Embroidery: ${item.embroideryQty})` : ""}</span>
                <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #eee", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span>Embroidery ({cart.reduce((s, i) => s + (i.embroideryQty || 0), 0)} items)</span><span>${cartEmbroidery.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, marginTop: 8, color: "#1a472a" }}>
              <span>Total</span><span>${(cartTotal + cartEmbroidery).toFixed(2)}</span>
            </div>
          </div>

          <button
            className={name.trim() && email.trim() && venmo.trim() ? "cta-btn" : ""}
            onClick={name.trim() && email.trim() && venmo.trim() ? submitOrder : undefined}
            style={name.trim() && email.trim() && venmo.trim() ? styles.addBtn : styles.addBtnDisabled}
          >
            Submit Order
          </button>
        </div>
      )}

      {view === "confirmed" && (
        <div className="page-section" style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }}>
          <div style={{ marginBottom: 20 }}><CheckIcon /></div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 10px", color: "#1a472a", letterSpacing: "-0.02em" }}>Order Submitted!</h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7 }}>
            Your order has been recorded. Perry or Sonnie will reach out regarding payment via Venmo or Zelle.
          </p>
          <button className="cta-btn" onClick={() => setView("store")} style={{ ...styles.addBtn, maxWidth: 260, margin: "28px auto 0" }}>
            Back to Store
          </button>
        </div>
      )}

      <ProductModal />
      <AdminPanel />

      {/* Footer */}
      <footer className="store-footer" style={{ textAlign: "center", padding: "32px 24px", fontSize: 12, color: "#b0b0b0", borderTop: "1px solid #eee" }}>
        <div style={{ fontWeight: 600, letterSpacing: "0.04em" }}>Babson Alpine Ski Team</div>
        <div style={{ marginTop: 4 }}>For questions contact eperretta1@babson.edu</div>
      </footer>
    </div>
  );
}
