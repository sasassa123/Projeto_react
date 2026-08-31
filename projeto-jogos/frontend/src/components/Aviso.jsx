export default function Aviso({ tipo = 'erro', mensagens }) {
  if (!mensagens || mensagens.length === 0) return null;

  const lista = Array.isArray(mensagens) ? mensagens : [mensagens];

  return (
    <div className={`aviso aviso--${tipo}`} role="alert">
      {lista.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}
