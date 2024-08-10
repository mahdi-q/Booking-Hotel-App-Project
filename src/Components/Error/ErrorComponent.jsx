function ErrorComponent({ children }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        color: "var(--rose-500)",
        marginTop: "2rem",
      }}
    >
      {children}
    </div>
  );
}

export default ErrorComponent;
