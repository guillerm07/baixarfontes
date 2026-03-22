import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "O nome é obrigatório (mínimo 2 caracteres)" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Insira um endereço de email válido" }, { status: 400 });
    }
    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json({ error: "O assunto é obrigatório (mínimo 3 caracteres)" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "A mensagem deve ter pelo menos 10 caracteres" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim().slice(0, 200),
        email: email.trim().slice(0, 200),
        subject: subject.trim().slice(0, 300),
        message: message.trim().slice(0, 5000),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro ao enviar a mensagem" }, { status: 500 });
  }
}
