import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// "banco" temporário em memória
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  gender: string | null;
  password: string;
  date_birth: string | null;
};

const users: User[] = [];

// helper: remove password do retorno
function toSafeUser(user: User) {
  const { password, ...safe } = user;
  return safe;
}

// rota teste
router.get("/", (req: Request, res: Response) => {
  res.send("API do Skoob Clone está funcionando 🚀");
});

//CRIAR usuário
router.post("/users", async (req: Request, res: Response) => {
  const { name, username, email, phone, cpf, gender, password, date_birth } =
    req.body as Partial<User>;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      error: "Campos obrigatórios: name, username, email, password",
    });
  }

  const usernameExists = users.some((u) => u.username === username);
  if (usernameExists) {
    return res.status(409).json({ error: "Username já existe" });
  }

  const emailExists = users.some((u) => u.email === email);
  if (emailExists) {
    return res.status(409).json({ error: "Email já existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: users.length + 1,
    name,
    username,
    email,
    phone: phone ?? null,
    cpf: cpf ?? null,
    gender: gender ?? null,
    password: passwordHash,
    date_birth: date_birth ?? null,
  };

  users.push(newUser);

  return res.status(201).json(toSafeUser(newUser));
});

//LOGIN POST login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  // validação básica
  if (!email || !password) {
    return res.status(400).json({
      error: "Campos obrigatórios: email, password",
    });
  }

  // procurar usuário
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // comparar senha
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // segredo do .env
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET não configurado" });
  }

  // gerar token
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  return res.json({ accessToken: token });
});

//LISTAR usuário
router.get("/users", (req: Request, res: Response) => {
  return res.json(users.map(toSafeUser));
});

//BUSCAR por id

router.get("/users/:id", (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(toSafeUser(user));
});

// DELETAR por id
router.delete("/users/:id", (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.splice(userIndex, 1);

  return res.status(204).send();
});

export default router;