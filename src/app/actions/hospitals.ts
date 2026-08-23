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
  
  const parseJsonArray = (name: string) => {
    const val = parseString(formData.get(name));
    if (val) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fallback for older formats
        if (val.includes(',')) return val.split(',').map(s => s.trim()).filter(Boolean);
        if (val.includes('\n')) return val.split('\n').map(s => s.trim()).filter(Boolean);
        return [val.trim()];
      }
    }
    return [];
  };

  const premiumFacilities = parseJsonArray("premiumFacilities");
  const advancedTechnologies = parseJsonArray("advancedTechnologies");
  const connectivityLocation = parseJsonArray("connectivityLocation");
  const excellenceInCare = parseJsonArray("excellenceInCare");
  
  const multiSpecialties = parseJsonArray("multiSpecialties");
  const facilityFood = parseJsonArray("facilityFood");
  const facilityComfort = parseJsonArray("facilityComfort");
  const facilityTransportation = parseJsonArray("facilityTransportation");
  const facilityLanguage = parseJsonArray("facilityLanguage");
  const facilityMoney = parseJsonArray("facilityMoney");

  const hospitalFacilities = {
    "Food": facilityFood,
    "Comfort During Stay": facilityComfort,
    "Transportation": facilityTransportation,
    "Language": facilityLanguage,
    "Money Matters": facilityMoney
  };

  const name_ar = formData.get("name_ar") as string;
  const description_ar = formData.get("description_ar") as string;
  const address_ar = formData.get("address_ar") as string;

  const parseJsonArrayAr = (name: string) => {
    const val = parseString(formData.get(name));
    if (val) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        if (val.includes(',')) return val.split(',').map(s => s.trim()).filter(Boolean);
        if (val.includes('\n')) return val.split('\n').map(s => s.trim()).filter(Boolean);
        return [val.trim()];
      }
    }
    return undefined;
  };

  const premiumFacilities_ar = parseJsonArrayAr("premiumFacilities_ar");
  const multiSpecialties_ar = parseJsonArrayAr("multiSpecialties_ar");
  const advancedTechnologies_ar = parseJsonArrayAr("advancedTechnologies_ar");
  const connectivityLocation_ar = parseJsonArrayAr("connectivityLocation_ar");
  const excellenceInCare_ar = parseJsonArrayAr("excellenceInCare_ar");

  let translations = undefined;
  if (name_ar || description_ar || address_ar || premiumFacilities_ar || multiSpecialties_ar || advancedTechnologies_ar || connectivityLocation_ar || excellenceInCare_ar) {
    translations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
        address: address_ar || undefined,
        premiumFacilities: premiumFacilities_ar,
        multiSpecialties: multiSpecialties_ar,
        advancedTechnologies: advancedTechnologies_ar,
        connectivityLocation: connectivityLocation_ar,
        excellenceInCare: excellenceInCare_ar,
      }
    };
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
      multiSpecialties,
      hospitalFacilities,
      cityId,
      translations: translations ? translations : undefined,
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
  
  const parseJsonArray = (name: string) => {
    const val = parseString(formData.get(name));
    if (val) {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fallback for older formats
        if (val.includes(',')) return val.split(',').map(s => s.trim()).filter(Boolean);
        if (val.includes('\n')) return val.split('\n').map(s => s.trim()).filter(Boolean);
        return [val.trim()];
      }
    }
    return [];
  };

  const premiumFacilities = parseJsonArray("premiumFacilities");
  const advancedTechnologies = parseJsonArray("advancedTechnologies");
  const connectivityLocation = parseJsonArray("connectivityLocation");
  const excellenceInCare = parseJsonArray("excellenceInCare");
  
  const multiSpecialties = parseJsonArray("multiSpecialties");
  const facilityFood = parseJsonArray("facilityFood");
  const facilityComfort = parseJsonArray("facilityComfort");
  const facilityTransportation = parseJsonArray("facilityTransportation");
  const facilityLanguage = parseJsonArray("facilityLanguage");
  const facilityMoney = parseJsonArray("facilityMoney");

  const hospitalFacilities = {
    "Food": facilityFood,
    "Comfort During Stay": facilityComfort,
    "Transportation": facilityTransportation,
    "Language": facilityLanguage,
    "Money Matters": facilityMoney
  };

  const name_ar = formData.get("name_ar") as string;
  const description_ar = formData.get("description_ar") as string;
  const address_ar = formData.get("address_ar") as string;

  const premiumFacilities_ar = parseJsonArrayAr("premiumFacilities_ar");
  const multiSpecialties_ar = parseJsonArrayAr("multiSpecialties_ar");
  const advancedTechnologies_ar = parseJsonArrayAr("advancedTechnologies_ar");
  const connectivityLocation_ar = parseJsonArrayAr("connectivityLocation_ar");
  const excellenceInCare_ar = parseJsonArrayAr("excellenceInCare_ar");

  let translations = undefined;
  if (name_ar || description_ar || address_ar || premiumFacilities_ar || multiSpecialties_ar || advancedTechnologies_ar || connectivityLocation_ar || excellenceInCare_ar) {
    translations = {
      ar: {
        name: name_ar || undefined,
        description: description_ar || undefined,
        address: address_ar || undefined,
        premiumFacilities: premiumFacilities_ar,
        multiSpecialties: multiSpecialties_ar,
        advancedTechnologies: advancedTechnologies_ar,
        connectivityLocation: connectivityLocation_ar,
        excellenceInCare: excellenceInCare_ar,
      }
    };
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
      multiSpecialties,
      hospitalFacilities,
      cityId: cityId || undefined,
      translations: translations ? translations : undefined,
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
