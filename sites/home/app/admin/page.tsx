import "@/app/home.css";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopbar } from "@/components/AdminTopbar";
import { MetricsGrid } from "@/components/MetricsGrid";
import { ProductsTable } from "@/components/ProductsTable";

export default function AdminDashboard() {
  return (
    <div className="eco-admin">
      <AdminSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminTopbar title="Dashboard" />

        <div className="eco-main">
          <MetricsGrid />
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", color: "var(--dark)" }}>
            Produtos Recentes
          </h2>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}
