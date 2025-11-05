import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Verificar la firma del webhook (recomendado para producción)
    const signature = request.headers.get("calendly-webhook-signature");

    // Obtener el payload del webhook
    const payload = await request.json();

    console.log("📥 Webhook recibido de Calendly");
    console.log("📋 Event type:", payload.event);
    console.log("📦 Full payload:", JSON.stringify(payload, null, 2));

    // El evento contiene información del invitee
    const event = payload.event;

    if (event === "invitee.created") {
      console.log("✅ Evento invitee.created detectado");

      const source = payload.payload?.tracking?.utm_source;
      const application_id = payload.payload?.tracking?.utm_content;
      const scheduled_event_uri = payload.payload?.scheduled_event?.uri;

      console.log("🔍 Tracking info:", {
        utm_source: source,
        utm_content: application_id,
        scheduled_event_uri: scheduled_event_uri,
      });

      if (source === "JOB_APPLICATION") {
        console.log("✅ Aplicación de trabajo detectada, ID:", application_id);
        console.log("📅 Scheduled Event URI:", scheduled_event_uri);

        // Guardar en base de datos
        await saveToDatabase({
          calendly_invite: scheduled_event_uri,
          application_id: application_id,
        });

        console.log("💾 Datos guardados exitosamente en la BD");
      } else {
        console.log("⚠️ No es una aplicación de trabajo, source:", source);
      }
    } else {
      console.log("⚠️ Evento no manejado:", event);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error procesando webhook:", error);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 },
    );
  }
}

async function saveToDatabase(data: any) {
  console.log("💾 Intentando guardar en BD:", data);

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
    console.error("❌ Error actualizando BD:", error);
    throw error;
  }

  console.log("✅ Datos guardados en BD:", updatedData);
  return updatedData;
}
