import { getTranslations, getLocale } from 'next-intl/server';
import styles from "./Research.module.css";
import Link from 'next/link';


export default async function Research() {
    const t = await getTranslations('Research');
    const locale = await getLocale();
    return (
        <section id="research" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{t('researchTitle')}</h3>
            </div>
            <div className={styles.researchContainer}>
                <div className={styles.researchText}>
                    <div className={styles.researchTextHeader}>
                        <h2>{t('introTitle')}</h2>
                    </div>
                    <div className={styles.researchTextContent}>
                        <p>{t('text1')}</p>
                        <p>{t('text2')}</p>
                        <p>{t('text3')}</p>
                        <Link href={`/allergy/${locale}/research`} className={styles.joinButton}>
                            {t('joinButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}