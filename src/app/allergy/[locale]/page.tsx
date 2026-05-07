import { getTranslations, setRequestLocale } from 'next-intl/server';
import styles from "./page.module.css";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Nav from "@/components/Nav/Nav";
import FadeIn from "@/components/FadeIn/FadeIn";
import Symptoms from '@/components/Symptoms/Symptoms';
import Patch from '@/components/Patch/Patch';
import Articles from '@/components/Articles/Articles';
import News from '@/components/News/News';
import Highlights from '@/components/Highlights/Highlights';
import Research from '@/components/Research/Research';
import Access from '@/components/Access/Access';



export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Index');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HeroSlider>
          <h2>{t('heroTitle')}</h2>
          <p>{t('heroDescription')}</p>
        </HeroSlider>
        <Nav />

        <FadeIn>
          <Symptoms />
        </FadeIn>

        <FadeIn>
          <Patch />
        </FadeIn>

        <FadeIn>
          <Articles />
        </FadeIn>

        <FadeIn>
          <News params={params} />
        </FadeIn>

        <FadeIn>
          <Highlights params={params} />
        </FadeIn>

        <FadeIn>
          <Research />
        </FadeIn>

        <FadeIn>
          <Access />
        </FadeIn>
      </main>
    </div>
  );
}

