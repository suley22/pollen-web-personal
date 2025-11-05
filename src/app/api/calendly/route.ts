import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("calendly-webhook-signature");
    const payload = await request.json();
    const event = payload.event;

    if (event === "invitee.created") {
      const source = payload.payload?.tracking?.utm_source;
      const application_id = payload.payload?.tracking?.utm_content;
      const scheduled_event_uri = payload.payload?.scheduled_event?.uri;

      if (source === "JOB_APPLICATION") {
        await saveToDatabase({
          calendly_invite: scheduled_event_uri,
          application_id: application_id,
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 },
    );
  }
}

async function saveToDatabase(data: any) {
  const supabase = await createClient();

  const { data: updatedData, error } = await supabase
    .from("job_applications")
    .update({
      calendly_invite: data.calendly_invite,
      interview_scheduled_at: new Date().toISOString(),
      sub_status: "Interview Booked",
    })
    .eq("id", data.application_id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return updatedData;
}
