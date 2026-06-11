import { NextRequest, NextResponse } from "next/server";
import { submitForm, type FormSubmitInput } from "@/lib/forms-service";
import type { FormType } from "@/lib/db";

const validTypes: FormType[] = ["contact", "consortium", "volunteer"];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FormSubmitInput;

    if (!body.formType || !validTypes.includes(body.formType)) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const { referenceId } = await submitForm(
      {
        formType: body.formType,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim(),
        subject: body.subject?.trim(),
        message: body.message.trim(),
        details: body.details,
      },
      request
    );

    return NextResponse.json({
      success: true,
      referenceId,
      message:
        "Your message has been received. A confirmation email has been sent to your inbox.",
    });
  } catch (err) {
    console.error("[form-submit]", err);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
