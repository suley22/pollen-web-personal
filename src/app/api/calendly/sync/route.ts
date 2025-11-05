import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Endpoint manual para sincronizar un evento de Calendly con una aplicación
 * POST /api/calendly/sync
 * Body: { applicationId: number, eventUri: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, eventUri } = body;

    if (!applicationId || !eventUri) {
      return NextResponse.json(
        { error: "applicationId y eventUri son requeridos" },
        { status: 400 },
      );
    }

    console.log(
      `🔄 Sincronizando evento de Calendly para aplicación ${applicationId}`,
    );

    // Verificar que el eventUri sea válido
    if (!eventUri.startsWith("https://api.calendly.com/scheduled_events/")) {
      return NextResponse.json(
        { error: "eventUri debe ser un URI válido de la API de Calendly" },
        { status: 400 },
      );
    }

    // Actualizar la base de datos
    const supabase = await createClient();

    const { data: updatedApplication, error } = await supabase
      .from("job_applications")
      .update({
        calendly_invite: eventUri,
        interview_scheduled_at: new Date().toISOString(),
        sub_status: "Interview Booked",
      })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) {
      console.error("❌ Error actualizando aplicación:", error);
      return NextResponse.json(
        { error: `Error actualizando aplicación: ${error.message}` },
        { status: 500 },
      );
    }

    console.log("✅ Aplicación actualizada:", updatedApplication);

    return NextResponse.json(
      {
        success: true,
        message: "Evento de Calendly sincronizado exitosamente",
        data: updatedApplication,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Error en sincronización:", error);
    return NextResponse.json(
      { error: "Error procesando sincronización" },
      { status: 500 },
    );
  }
}
