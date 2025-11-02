import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Verificar la firma del webhook (recomendado para producción)
    const signature = request.headers.get('calendly-webhook-signature');
    
    // Obtener el payload del webhook
    const payload = await request.json();
    
    console.log('Webhook recibido:', payload);

    // El evento contiene información del invitee
    const event = payload.event;

    if (event === 'invitee.created') {
      const source = payload.payload?.tracking?.utm_source;
      

      if(source == "JOB_APPLICATION") {
        const application_id = payload.payload?.tracking?.utm_content;
        console.log('Aplicación de trabajo detectada, ID:', application_id);

        // Procesar tu lógica aquí
        // Por ejemplo, guardar en base de datos
        await saveToDatabase({
          calendly_invite: payload.payload?.uri,
          application_id: application_id
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}

async function saveToDatabase(data: any) {
  const supabase = await createClient();

  const { data: updatedData, error } = await supabase
    .from("job_applications")
    .update({
      calendly_invite: data.calendly_invite
    })
    .eq("id", data.application_id)
    .single();

  if (error) {
    console.error('Error actualizando BD:', error);
    throw error;
  }

  console.log('✅ Guardado en BD:', updatedData);
  return updatedData;

}
