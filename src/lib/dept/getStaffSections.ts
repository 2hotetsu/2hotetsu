import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { staffPageQuery } from "@/sanity/lib/queries";

export interface StaffMember {
  id: string;
  name: string;
  img: string;
  /** extra line shown above the specialties (e.g. previous affiliation) */
  note?: string;
  specialties: string[];
  email?: string;
}

export interface StaffSection {
  /** anchor id — the old page's staff01…staff13 are kept for link compat */
  id: string;
  title: string;
  en: string;
  members: StaffMember[];
}

interface RawStaffSection {
  _key: string;
  title: string;
  en: string;
  anchor: string | null;
  members: (RawStaffMember | null)[] | null;
}

interface RawStaffMember {
  _id: string;
  name: string;
  photo: { asset?: unknown } | null;
  note: string | null;
  specialties: (string | null)[] | null;
  email: string | null;
}

const NO_IMAGE = "/images/staff/noimage.jpg";

/**
 * The staff page as edited in the Studio (スタッフページ). Sections without a
 * published member are dropped, as are members nobody published yet.
 *
 * Unlike the news and achievements fetchers this one does not swallow errors:
 * the whole page is this data, so a failed fetch should fail the render — ISR
 * then keeps serving the last good page instead of caching an empty one.
 */
export async function getStaffSections(locale: string): Promise<StaffSection[]> {
  const raw: RawStaffSection[] | null = await client.fetch(
    staffPageQuery,
    { locale },
    { next: { revalidate: 3600 } }
  );

  return (raw ?? [])
    .map(({ _key, title, en, anchor, members }) => ({
      id: anchor || `section-${_key}`,
      title,
      en,
      members: (members ?? [])
        .filter((m): m is RawStaffMember => m !== null)
        .map(({ _id, name, photo, note, specialties, email }) => ({
          id: _id,
          name,
          img: photo?.asset
            ? urlForImage(photo).width(320).height(320).fit("crop").url()
            : NO_IMAGE,
          ...(note && { note }),
          specialties: (specialties ?? []).filter((s): s is string => !!s),
          ...(email && { email: email.replace(/@/g, "＠") }),
        })),
    }))
    .filter((s) => s.members.length > 0);
}

/** "name＠domain" (display form) → "mailto:name@domain" */
export function mailtoHref(email: string): string {
  return `mailto:${email.replace(/＠/g, "@").replace(/\s+/g, "")}`;
}
