"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Ensure user is an admin
async function checkAuth() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function createHospital(formData: FormData) {
  await checkAuth();

  const parseNumber = (val: FormDataEntryValue | null) => {
    if (!val) return null;
    const str = val.toString().trim();
    if (!str) return null;
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
  };

  const parseString = (val: FormDataEntryValue | null) => {
    if (!val) return null;
    const str = val.toString().trim();
    return str || null;
  };

  const name = parseString(formData.get("name")) || "Unnamed Hospital";
  const slug = parseString(formData.get("slug")) || `hospital-${Date.now()}`;
  const description = parseString(formData.get("description"));
  const address = parseString(formData.get("address"));
  const imageUrl = parseString(formData.get("imageUrl"));
  const beds = parseNumber(formData.get("beds"));
  const icuBeds = parseNumber(formData.get("icuBeds"));
  const otCount = parseNumber(formData.get("otCount"));
  
  const accreditationsStr = parseString(formData.get("accreditations"));
  const accreditations = accreditationsStr
    ? accreditationsStr.split(",").map(s => s.trim()).filter(Boolean)
    : [];
    
  const internationalServicesStr = parseString(formData.get("internationalServices"));
  const internationalServices = internationalServicesStr
    ? internationalServicesStr.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const specialtyIds = formData.getAll("specialtyIds").map(id => id.toString());

  const cityId = parseString(formData.get("cityId"));
  if (!cityId) {
    throw new Error("City is required");
  }

  const established = parseNumber(formData.get("established"));
  const airportDistance = parseNumber(formData.get("airportDistance"));
  
  const parseStringArray = (name: string) => {
    const val = parseString(formData.get(name));
    return val ? val.split("\n").map(s => s.trim()).filter(Boolean) : [];
  };

  const premiumFacilities = parseStringArray("premiumFacilities");
  const advancedTechnologies = parseStringArray("advancedTechnologies");
  const connectivityLocation = parseStringArray("connectivityLocation");
  const excellenceInCare = parseStringArray("excellenceInCare");
  
  let hospitalFacilities = null;
  const hfStr = parseString(formData.get("hospitalFacilities"));
  if (hfStr) {
    try {
      hospitalFacilities = JSON.parse(hfStr);
    } catch (e) {
      console.error("Invalid JSON in hospitalFacilities");
    }
  }

  await prisma.hospital.create({
    data: {
      name,
      slug,
      description,
      address,
      imageUrl,
      beds,
      icuBeds,
      otCount,
      accreditations,
      internationalServices,
      established,
      airportDistance,
      premiumFacilities,
      advancedTechnologies,
      connectivityLocation,
      excellenceInCare,
      hospitalFacilities: hospitalFacilities || undefined,
      cityId,
      specialties: {
        connect: specialtyIds.map(id => ({ id }))
      }
    },
  });

  revalidatePath("/admin/hospitals");
  redirect("/admin/hospitals");
}

export async function updateHospital(id: string, formData: FormData) {
  await checkAuth();

  const parseNumber = (val: FormDataEntryValue | null) => {
    if (!val) return null;
    const str = val.toString().trim();
    if (!str) return null;
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
  };

  const parseString = (val: FormDataEntryValue | null) => {
    if (!val) return null;
    const str = val.toString().trim();
    return str || null;
  };

  const name = parseString(formData.get("name")) || "Unnamed Hospital";
  const slug = parseString(formData.get("slug")) || `hospital-${Date.now()}`;
  const description = parseString(formData.get("description"));
  const address = parseString(formData.get("address"));
  const imageUrl = parseString(formData.get("imageUrl"));
  const beds = parseNumber(formData.get("beds"));
  const icuBeds = parseNumber(formData.get("icuBeds"));
  const otCount = parseNumber(formData.get("otCount"));
  
  const accreditationsStr = parseString(formData.get("accreditations"));
  const accreditations = accreditationsStr
    ? accreditationsStr.split(",").map(s => s.trim()).filter(Boolean)
    : [];
    
  const internationalServicesStr = parseString(formData.get("internationalServices"));
  const internationalServices = internationalServicesStr
    ? internationalServicesStr.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const specialtyIds = formData.getAll("specialtyIds").map(id => id.toString());
  const cityId = parseString(formData.get("cityId"));

  const established = parseNumber(formData.get("established"));
  const airportDistance = parseNumber(formData.get("airportDistance"));
  
  const parseStringArray = (name: string) => {
    const val = parseString(formData.get(name));
    return val ? val.split("\n").map(s => s.trim()).filter(Boolean) : [];
  };

  const premiumFacilities = parseStringArray("premiumFacilities");
  const advancedTechnologies = parseStringArray("advancedTechnologies");
  const connectivityLocation = parseStringArray("connectivityLocation");
  const excellenceInCare = parseStringArray("excellenceInCare");
  
  let hospitalFacilities = null;
  const hfStr = parseString(formData.get("hospitalFacilities"));
  if (hfStr) {
    try {
      hospitalFacilities = JSON.parse(hfStr);
    } catch (e) {
      console.error("Invalid JSON in hospitalFacilities");
    }
  }

  await prisma.hospital.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      address,
      imageUrl,
      beds,
      icuBeds,
      otCount,
      accreditations,
      internationalServices,
      established,
      airportDistance,
      premiumFacilities,
      advancedTechnologies,
      connectivityLocation,
      excellenceInCare,
      hospitalFacilities: hospitalFacilities || undefined,
      cityId: cityId || undefined,
      specialties: {
        set: specialtyIds.map(id => ({ id }))
      }
    },
  });

  revalidatePath("/admin/hospitals");
  revalidatePath(`/admin/hospitals/${id}`);
  redirect("/admin/hospitals");
}

export async function deleteHospital(id: string) {
  await checkAuth();
  
  await prisma.hospital.delete({
    where: { id },
  });

  revalidatePath("/admin/hospitals");
}
