"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { buildTranslations } from "@/lib/translator"

// --- PATIENT STORIES ---
export async function createStory(data: any) {
  const title_ar = data.title_ar;
  const content_ar = data.content_ar;
  let manualTranslations = undefined;
  if (title_ar || content_ar) {
    manualTranslations = { ar: { title: title_ar || undefined, content: content_ar || undefined } };
  }

  const finalTranslations = await buildTranslations({
    title: data.title,
    content: data.content
  }, manualTranslations);

  const story = await prisma.patientStory.create({
    data: {
      title: data.title,
      slug: data.slug,
      patientName: data.patientName,
      content: data.content,
      imageUrl: data.imageUrl || null,
      treatmentId: data.treatmentId || null,
      specialtyId: data.specialtyId || null,
      hospital: data.hospital || null,
      country: data.country || null,
      translations: finalTranslations ? finalTranslations : undefined,
    }
  })
  revalidatePath("/admin/stories")
  revalidatePath("/patient-stories")
  return { success: true, id: story.id }
}

export async function updateStory(id: string, data: any) {
  const title_ar = data.title_ar;
  const content_ar = data.content_ar;
  let manualTranslations = undefined;
  if (title_ar || content_ar) {
    manualTranslations = { ar: { title: title_ar || undefined, content: content_ar || undefined } };
  }

  const existingStory = await prisma.patientStory.findUnique({ where: { id }, select: { translations: true } });
  const existingTranslations = (existingStory?.translations as any) || {};

  if (manualTranslations?.ar) {
    existingTranslations.ar = { ...existingTranslations.ar, ...manualTranslations.ar };
  }

  const finalTranslations = await buildTranslations({
    title: data.title,
    content: data.content
  }, existingTranslations);

  await prisma.patientStory.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      patientName: data.patientName,
      content: data.content,
      imageUrl: data.imageUrl || null,
      treatmentId: data.treatmentId || null,
      specialtyId: data.specialtyId || null,
      hospital: data.hospital || null,
      country: data.country || null,
      translations: finalTranslations ? finalTranslations : undefined,
    }
  })
  revalidatePath("/admin/stories")
  revalidatePath("/patient-stories")
  return { success: true }
}

export async function deleteStory(id: string) {
  await prisma.patientStory.delete({ where: { id } })
  revalidatePath("/admin/stories")
  revalidatePath("/patient-stories")
  return { success: true }
}

// --- GALLERY ---
export async function createGalleryImage(data: any) {
  await prisma.galleryImage.create({
    data: {
      title: data.title,
      category: data.category || "General",
      imageUrl: data.imageUrl,
    }
  })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
  return { success: true }
}

// --- BLOGS ---
export async function createBlog(data: any) {
  const title_ar = data.title_ar;
  const excerpt_ar = data.excerpt_ar;
  const content_ar = data.content_ar;
  let manualTranslations = undefined;
  if (title_ar || excerpt_ar || content_ar) {
    manualTranslations = { ar: { title: title_ar || undefined, excerpt: excerpt_ar || undefined, content: content_ar || undefined } };
  }

  const finalTranslations = await buildTranslations({
    title: data.title,
    excerpt: data.excerpt,
    content: data.content
  }, manualTranslations);

  const blog = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      authorName: data.authorName || "Admin",
      published: data.published || false,
      translations: finalTranslations ? finalTranslations : undefined,
    }
  })
  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  return { success: true, id: blog.id }
}

export async function updateBlog(id: string, data: any) {
  const title_ar = data.title_ar;
  const excerpt_ar = data.excerpt_ar;
  const content_ar = data.content_ar;
  let manualTranslations = undefined;
  if (title_ar || excerpt_ar || content_ar) {
    manualTranslations = { ar: { title: title_ar || undefined, excerpt: excerpt_ar || undefined, content: content_ar || undefined } };
  }

  const existingBlog = await prisma.blogPost.findUnique({ where: { id }, select: { translations: true } });
  const existingTranslations = (existingBlog?.translations as any) || {};

  if (manualTranslations?.ar) {
    existingTranslations.ar = { ...existingTranslations.ar, ...manualTranslations.ar };
  }

  const finalTranslations = await buildTranslations({
    title: data.title,
    excerpt: data.excerpt,
    content: data.content
  }, existingTranslations);

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      authorName: data.authorName,
      published: data.published,
      translations: finalTranslations ? finalTranslations : undefined,
    }
  })
  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  return { success: true }
}

export async function deleteBlog(id: string) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  return { success: true }
}

// --- CONTACT MESSAGES ---
export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath("/admin/contact-messages")
  return { success: true }
}

export async function createContactMessage(data: any) {
  await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    }
  })
  // Let admin know
  revalidatePath("/admin/contact-messages")
  return { success: true }
}
