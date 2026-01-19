import React, { useEffect, useState } from "react";
import { getData } from "../../apiService";
import AdminLayout from "./AdminLayout";

/* ===================== STAT CARD ===================== */
const StatCard = ({ title, value, icon, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: "200px",
      backgroundColor: color,
      color: "#fff",
      padding: "20px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "all .3s ease",
      cursor: "pointer"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    }}
  >
    <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 24 }}>{icon}</div>
  </div>
);

/* ===================== DASHBOARD ===================== */
const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState({
    user: "",
    employee: "",
    chair: "",
    phone: ""
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isTodayActive, setIsTodayActive] = useState(false);

  const title = "Yönetici Rezervasyon Paneli";
  const [typedTitle, setTypedTitle] = useState("");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getData("/store/getMyReservations");
      setReservations(data);
      setFiltered(data);
    } catch {
      setError("Rezervasyonlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- TYPE EFFECT ---------------- */
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTypedTitle(title.slice(0, i + 1));
      i++;
      if (i === title.length) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  /* ---------------- FILTER ---------------- */
  useEffect(() => {
    let data = [...reservations];

    if (search.user) data = data.filter(r => r.userName?.toLowerCase().includes(search.user.toLowerCase()));
    if (search.employee) data = data.filter(r => r.employeeName?.toLowerCase().includes(search.employee.toLowerCase()));
    if (search.chair) data = data.filter(r => r.chairName?.toLowerCase().includes(search.chair.toLowerCase()));
    if (search.phone) data = data.filter(r => r.phoneNumber?.includes(search.phone));

    if (startDate) data = data.filter(r => r.reservationDate >= startDate);
    if (endDate) data = data.filter(r => r.reservationDate <= endDate);

    setFiltered(data);
  }, [search, startDate, endDate, reservations]);

  /* ---------------- DATE & STATS ---------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStr = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  const upcoming = reservations.filter(r => r.reservationDate >= todayStr).length;
  const todayCount = reservations.filter(r => r.reservationDate === todayStr).length;

  const toggleToday = () => {
    if (isTodayActive) {
      setStartDate("");
      setEndDate("");
    } else {
      setStartDate(todayStr);
      setEndDate(todayStr);
    }
    setIsTodayActive(!isTodayActive);
  };

  const exportExcel = async () => {
    const res = await getData("/store/exportReservations");
    const blob = new Blob([res], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reservations.xlsx";
    link.click();
  };

  const formatDateTR = date =>
    new Date(date).toLocaleDateString("tr-TR");

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div style={{ padding: 30 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{typedTitle}</h1>

        <div style={{ display: "flex", gap: 20, marginBottom: 25 }}>
          <StatCard title="Bu Ay Toplam Rezervasyon" value={reservations.length} color="#4CAF50" icon="📊" />
          <StatCard title="Gelecek Rezervasyon" value={upcoming} color="#2196F3" icon="⏰" />
          <StatCard title="Bugünün Rezervasyonu" value={todayCount} color="#FF5722" icon="📅" />
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto"}}>
          {[
            ["Kullanıcı", "user"],
            ["Telefon", "phone"],
            ["Çalışan", "employee"],
            ["Koltuk", "chair"]
          ].map(([p, k]) => (
            <input
              key={k}
              placeholder={p}
              value={search[k]}
              onChange={e => setSearch({ ...search, [k]: e.target.value })}
              style={inputStyle}
            />
          ))}

          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />

          <button onClick={toggleToday} style={btn(isTodayActive ? "#c62828" : "#FF9800")}>
            {isTodayActive ? "Bugün değil" : "Bugün"}
          </button>

          <button onClick={exportExcel} style={btn("#4CAF50")}>
            Excel
          </button>
        </div>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Tarih", "Başlangıç", "Bitiş", "Koltuk", "Kullanıcı", "Telefon", "Çalışan"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                style={{ background: i % 2 ? "#f9f9f9" : "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e3f2fd"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 ? "#f9f9f9" : "#fff"}
              >
                <td style={td}>{formatDateTR(r.reservationDate)}</td>
                <td style={td}>{r.startTime}</td>
                <td style={td}>{r.endTime}</td>
                <td style={td}>{r.chairName}</td>
                <td style={td}>
                  {r.userName}
                  <span style={badge(r.guest)}>{r.guest ? "Misafir" : "Üye"}</span>
                </td>
                <td style={td}>{r.phoneNumber}</td>
                <td style={td}>{r.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

/* ===================== STYLES ===================== */
const inputStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc"
};

const btn = color => ({
  padding: "10px 16px",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
});

const th = { padding: 12, borderBottom: "2px solid #ddd", textAlign: "left" };
const td = { padding: 12, borderBottom: "1px solid #eee" };

const badge = guest => ({
  marginLeft: 8,
  padding: "3px 8px",
  fontSize: 11,
  borderRadius: 10,
  color: "#fff",
  background: guest ? "#E53935" : "#43A047"
});

export default AdminDashboard;
