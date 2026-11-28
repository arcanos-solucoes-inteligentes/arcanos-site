// Prepara o DEMO local para a gravação: o porteiro registra uma encomenda "de hoje"
// para a Ana (A-101) pela API, do mesmo jeito que a tela faria. Só localhost.
const API = "http://localhost:5138/api";
const SENHA = process.env.DEMO_SENHA;
if (!SENHA) throw new Error("Defina DEMO_SENHA (ver scripts/gravacao/README.md)");

async function login(email) {
  const r = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password: SENHA }) });
  const j = await r.json();
  return j.token || j.accessToken || j.data?.token;
}

const tokPort = await login("porteiro.bosque@demo.local");
const residentId = process.env.DEMO_MORADOR_ID; // users.id da Ana (A-101) no DEMO local
console.log("ana:", residentId);

const r = await fetch(`${API}/packages`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokPort}` },
  body: JSON.stringify({ residentId, sender: "Correios", description: "Livros", trackingCode: "DM000981245BR" })
});
console.log("create:", r.status, (await r.text()).slice(0, 300));
