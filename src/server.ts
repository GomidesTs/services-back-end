import z from "zod";

const userSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter 3 ou mais caracteres" }),
  age: z.number().min(18, { message: "Sua idade deve ser maior que 18 anos" }),
});

type User = z.infer<typeof userSchema>;

function saveUserToDatabase(user: User) {
  const { name, age } = userSchema.parse(user);

  console.log(name, age);
}

saveUserToDatabase({
  name: "Tulio",
  age: 24,
});
