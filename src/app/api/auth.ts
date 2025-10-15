import { NextRequest, NextResponse } from "next/server";

let users: { email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  const { email, password, type } = await req.json();

  if (type === "signup") {
    if (users.find(u => u.email === email)) return NextResponse.json({ success: false, error: "User already exists" });
    users.push({ email, password });
    return NextResponse.json({ success: true });
  }

  if (type === "login") {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) return NextResponse.json({ success: true });
    return NextResponse.json({ success: false, error: "Invalid credentials" });
  }

  return NextResponse.json({ success: false, error: "Unknown error" });
}
