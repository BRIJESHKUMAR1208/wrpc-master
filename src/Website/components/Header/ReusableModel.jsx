import React from "react";

const ReusableModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  className,
  style,
}) => {
  if (!show) return null;

  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const box = {
    background: "#fff",
    width: 350,
    maxWidth: "90vw",
    borderRadius: 10,
    padding: "32px 24px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
    ...style,
  };

  const titleStyle = {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  };

  const messageStyle = {
    color: "#222",
    fontSize: 17,
    marginBottom: 28,
    lineHeight: 1.4,
  };

  const btnRow = {
    display: "flex",
    justifyContent: "center",
    gap: 24,
  };

  const yesBtn = {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 28px",
    borderRadius: 7,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    outline: "none",
  };

  const noBtn = {
    background: "#F8B5B5",
    color: "#111",
    border: "none",
    padding: "10px 28px",
    borderRadius: 7,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    outline: "none",
  };

  return (
    <div style={overlay} role="dialog" aria-modal="true" aria-label={title || "Modal"}>
      <div style={box} className={className}>
        {title && <div style={titleStyle}>{title}</div>}
        {message && <p style={messageStyle}>{message}</p>}
        <div style={btnRow}>
          <button style={yesBtn} onClick={onConfirm}>{confirmText}</button>
          <button style={noBtn} onClick={onClose}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
