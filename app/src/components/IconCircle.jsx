export default function IconCircle({ children, size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        boxShadow: 'inset 0 0 0 3px #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
      }}
    >
      {children}
    </div>
  )
}
