export default function ProductCard({ name, img, price }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "250px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
      className="product-card"
    >
      <img
        src={img}
        alt={name}
        style={{ width: "100%", borderRadius: "12px 12px 0 0", objectFit: "cover" }}
      />
      <h4 style={{ margin: "12px 0 8px" }}>{name}</h4>
      <p style={{ fontWeight: "bold", color: "#333" }}>{price}</p>
    </div>
  );
}
