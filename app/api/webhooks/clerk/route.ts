import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_SECRET_KEY environment variable is missing");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Error occurred -- no svix headers" }, { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Error occurred" }, { status: 400 });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id: clerkId, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(" ") || email;

    try {
      await prisma.user.create({
        data: {
          clerkId,
          email,
          name,
        },
      });
      console.log(`User created: ${clerkId}`);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Webhook received" });
}
