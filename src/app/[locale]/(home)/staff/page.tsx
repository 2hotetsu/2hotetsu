import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { STAFF_SECTIONS, mailtoHref } from "@/data/dept/staff";

export const metadata: Metadata = {
  title: "スタッフ | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野のスタッフ紹介ページです。",
};

export default function Staff() {
  const sections = STAFF_SECTIONS.filter((s) => s.members.length > 0);

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Staff"
        title="スタッフ"
        description="顎機能咬合再建学分野に所属するスタッフをご紹介します。"
      />

      <nav className="hm-anchor-nav" aria-label="職位別ナビゲーション">
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
            <header className="hm-heading-sm" data-reveal>
              <h2>{title}</h2>
              <span className="hm-heading-sm-en">{en}</span>
            </header>
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
