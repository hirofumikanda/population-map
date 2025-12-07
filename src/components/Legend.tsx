const Legend = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "30px",
        left: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px 15px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        fontSize: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
        人口密度 (人/km²)
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(255,0,0,1)",
              }}
            />
            <span>24,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(255,128,0,1)",
              }}
            />
            <span>20,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(255,255,0,1)",
              }}
            />
            <span>16,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(0,255,0,1)",
              }}
            />
            <span>12,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(0,255,128,1)",
              }}
            />
            <span>8,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(0,255,255,1)",
              }}
            />
            <span>4,000</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "20px",
                height: "12px",
                backgroundColor: "rgba(0,0,255,0)",
              }}
            />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
