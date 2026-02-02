import { Router, Request, Response } from "express";

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

// rota teste
router.get("/", (req: Request, res: Response) => {
  res.send("API do Skoob Clone está funcionando 🚀");
});

// CRIAR usuário
router.post("/users", (req: Request, res: Response) => {
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

  const newUser: User = {
    id: users.length + 1,
    name,
    username,
    email,
    phone: phone ?? null,
    cpf: cpf ?? null,
    gender: gender ?? null,
    password,
    date_birth: date_birth ?? null,
  };

  users.push(newUser);

  return res.status(201).json(newUser);
});

// LISTAR usuários
router.get("/users", (req: Request, res: Response) => {
  return res.json(users);
});

// BUSCAR por id
router.get("/users/:id", (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(user);
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