import React, { useEffect, useState } from "react";
import { getData } from "../../apiService";
import AdminLayout from "./AdminLayout";

// Kart Bileşeni
const StatCard = ({ title, value, icon, color }) => (
  <div style={{
    flex: 1,
    minWidth: "200px",
    backgroundColor: color || "#4CAF50",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
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
    <div style={{ fontSize: "16px", fontWeight: "600" }}>{title}</div>
    <div style={{ fontSize: "28px", fontWeight: "700", marginTop: "10px" }}>{value}</div>
    {icon && <div style={{ fontSize: "24px", marginTop: "10px" }}>{icon}</div>}
  </div>
);

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchChair, setSearchChair] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isTodayActive, setIsTodayActive] = useState(false);

  const fullTitle = "Admin Dashboard";
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => { fetchReservations(); }, []);
  useEffect(() => { filterReservations(); }, [searchId, searchUser, searchEmployee, searchChair, startDate, endDate, reservations]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getData("/store/getMyReservations");
      setReservations(data);
      setFilteredReservations(data);
    } catch (err) {
      setError("Rezervasyonlar alınamadı");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = [...reservations];
    if (searchId) filtered = filtered.filter(r => String(r.id).includes(searchId));
    if (searchUser) filtered = filtered.filter(r => r.userName.toLowerCase().includes(searchUser.toLowerCase()));
    if (searchEmployee) filtered = filtered.filter(r => r.employeeName.toLowerCase().includes(searchEmployee.toLowerCase()));
    if (searchChair) filtered = filtered.filter(r => r.chairName.toLowerCase().includes(searchChair.toLowerCase()));
    if (startDate) filtered = filtered.filter(r => new Date(r.reservationDate) >= new Date(startDate));
    if (endDate) filtered = filtered.filter(r => new Date(r.reservationDate) <= new Date(endDate));
    setFilteredReservations(filtered);
  };

  const exportExcel = async () => {
    try {
      const response = await getData("/store/exportReservations");
      const blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reservations.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Excel alınamadı", err);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const upcomingReservations = reservations.filter(r => new Date(r.reservationDate) >= today).length;
  const todayReservations = reservations.filter(r => {
    const rDate = new Date(r.reservationDate);
    rDate.setHours(0, 0, 0, 0);
    return rDate.getTime() === today.getTime();
  }).length;

  const handleTodayFilter = () => {
    if (isTodayActive) {
      setStartDate("");
      setEndDate("");
      setIsTodayActive(false);
    } else {
      setStartDate(todayStr);
      setEndDate(todayStr);
      setIsTodayActive(true);
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: "30px", fontFamily: "'Segoe UI', sans-serif" }}>

        {/* Başlık */}
        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "20px",
          borderRight: "2px solid #333",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}>
          {typedTitle}
        </h1>

        {/* Kartlar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "25px" }}>
          <StatCard title="Toplam Rezervasyon" value={reservations.length} color="#4CAF50" icon="📊" />
          <StatCard title="Gelecek Rezervasyon" value={upcomingReservations} color="#2196F3" icon="⏰" />
          <StatCard title="Bugünün Rezervasyonu" value={todayReservations} color="#FF5722" icon="📅" />
        </div>

        {/* Filtreler */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px", alignItems: "center" }}>
          {[
            { placeholder: "ID", value: searchId, onChange: setSearchId, icon: "🔍" },
            { placeholder: "Kullanıcı", value: searchUser, onChange: setSearchUser, icon: "🕵️‍♂️" },
            { placeholder: "Çalışan", value: searchEmployee, onChange: setSearchEmployee, icon: "👤" },
            { placeholder: "Koltuk", value: searchChair, onChange: setSearchChair, icon: "💺" }
          ].map((item, i) => (
            <div key={i} style={{ position: "relative", flex: "1", minWidth: "160px" }}>
              <input
                type="text"
                placeholder={item.placeholder}
                value={item.value}
                onChange={e => item.onChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 35px 12px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14px"
                }}
              />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>{item.icon}</span>
            </div>
          ))}

          {/* Tarih */}
          {["Başlangıç", "Bitiş"].map((label, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
              <label style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>{label}</label>
              <input
                type="date"
                value={idx === 0 ? startDate : endDate}
                onChange={e => idx === 0 ? setStartDate(e.target.value) : setEndDate(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" }}
              />
            </div>
          ))}

          <button
            onClick={handleTodayFilter}
            style={{
              padding: "10px 20px",
              backgroundColor: isTodayActive ? "#c62828" : "#FF9800",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {isTodayActive ? "Bugün Filtreyi Kapat" : "Bugün"}
          </button>

          <button
            onClick={exportExcel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Excel İndir
          </button>
        </div>

        {/* Tablo */}
        <div style={{ overflowX: "auto", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead style={{ backgroundColor: "#f7f7f7", color: "#555" }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Tarih</th>
                <th style={tableHeaderStyle}>Başlangıç</th>
                <th style={tableHeaderStyle}>Bitiş</th>
                <th style={tableHeaderStyle}>Koltuk</th>
                <th style={tableHeaderStyle}>Kullanıcı</th>
                <th style={tableHeaderStyle}>Çalışan</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res, i) => (
                <tr key={res.id} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9", transition: "0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e3f2fd"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#fff" : "#f9f9f9"}>
                  <td style={tableCellStyle}>{res.id}</td>
                  <td style={tableCellStyle}>{res.reservationDate}</td>
                  <td style={tableCellStyle}>{res.startTime}</td>
                  <td style={tableCellStyle}>{res.endTime}</td>
                  <td style={tableCellStyle}>{res.chairName}</td>
                  <td style={tableCellStyle}>{res.userName}</td>
                  <td style={tableCellStyle}>{res.employeeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

const tableHeaderStyle = { padding: "12px 15px", borderBottom: "2px solid #ddd", textAlign: "left", fontWeight: "600" };
const tableCellStyle = { padding: "12px 15px", borderBottom: "1px solid #eee" };

export default AdminDashboard;
