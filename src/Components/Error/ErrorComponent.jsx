function ErrorComponent({children}) {
  return (
    <div style={{ fontWeight: "bold", color: "var(--rose-500)" }}>
      {children}
    </div>
  );
}

export default ErrorComponent;
