import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HeadingSm from "@/components/home/HeadingSm";
import HomeEffects from "@/components/home/HomeEffects";
import { getStaffSections, mailtoHref } from "@/data/dept/staff";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("staff.title"), description: t("meta.staffDesc") };
}

export default async function Staff({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");

  const sections = getStaffSections(locale as Locale).filter(
    (s) => s.members.length > 0
  );

  return (
    <main className="hm-main hm-subpage">
      <PageHero en="Staff" title={t("staff.title")} description={t("staff.desc")} />

      <nav className="hm-anchor-nav" aria-label={t("staff.ariaNav")}>
        <ul>
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hm-container hm-staff-body">
        {sections.map(({ id, title, en, members }) => (
          <section className="hm-staff-section" id={id} key={id}>
            <HeadingSm title={title} en={en} />
            <div className="hm-staff-grid" data-reveal-group>
              {members.map((m) => (
                <article className="hm-staff-card" key={m.name} data-reveal-item>
                  <div className="hm-staff-photo">
                    <Image src={m.img} alt={m.name} width={140} height={140} />
                  </div>
                  <div className="hm-staff-info">
                    <h3 className="hm-staff-name">{m.name}</h3>
                    {m.note && <p className="hm-staff-note">{m.note}</p>}
                    {m.specialties.length > 0 && (
                      <ul className="hm-staff-tags">
                        {m.specialties.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                    {m.email && (
                      <a className="hm-staff-mail" href={mailtoHref(m.email)}>
                        {m.email}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <HomeEffects />
    </main>
  );
}
