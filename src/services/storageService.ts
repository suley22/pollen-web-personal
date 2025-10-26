import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const uploadFile = async (
  file,
  bucketName = "company-logos",
  folder = "logos",
) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export const deleteFile = async (fileName, bucketName, folder) => {
  try {
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};

/**
 * Procesa y sube una imagen desde FormData
 * Si ya existe una URL, la retorna. Si hay un archivo nuevo, lo sube.
 *
 * @param formData - FormData que contiene los campos de imagen
 * @param urlFieldName - Nombre del campo que contiene la URL existente
 * @param fileFieldName - Nombre del campo que contiene el archivo nuevo
 * @param bucketName - Nombre del bucket de Supabase
 * @param folder - Carpeta dentro del bucket
 * @returns URL pública de la imagen o string vacío si no hay imagen
 */
export const processImageFromFormData = async (
  formData: FormData,
  urlFieldName: string,
  fileFieldName: string,
  bucketName: string,
  folder: string,
): Promise<string> => {
  // Si ya existe una URL, retornarla
  const existingUrl = formData.get(urlFieldName);
  if (
    existingUrl &&
    typeof existingUrl === "string" &&
    existingUrl.startsWith("http")
  ) {
    return existingUrl;
  }

  // Si hay un archivo nuevo, subirlo
  const imageFile = formData.get(fileFieldName);
  const file = imageFile instanceof File ? imageFile : null;

  if (file && file.size > 0) {
    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    const publicUrl = await uploadFile(file, bucketName, folder);

    if (!publicUrl) {
      throw new Error("Failed to upload image");
    }

    return publicUrl;
  }

  return "";
};
