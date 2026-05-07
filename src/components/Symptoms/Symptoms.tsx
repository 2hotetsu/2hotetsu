import { getTranslations } from 'next-intl/server';
import styles from "./Symptoms.module.css";
import Link from 'next/link';
import Image from 'next/image';
import symptomsImg from '@/img/symptoms/symptoms.png';
import pdfDownload from '@/img/icons/pdf.png'

export default async function Symptoms() {
    
    const t = await getTranslations('Symptoms');
    return (
        <section id="symptoms" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{t('symptomsTitle')}</h3>
            </div>
            <div className={styles.symptomsContainer}>
                <div className={styles.symptomsImage}>
                    <Image src={symptomsImg} alt="Symptoms" width={532} height={743} />
                </div>
                <div className={styles.symptomsText}>
                    <h2>{t('introTitle')}</h2>
                    <div className={styles.symptomsImageMobile}>
                        <Image src={symptomsImg} alt="Symptoms" width={532} height={743} />
                    </div>
                    <div className={styles.symptomsTextContent}>
                        <p>{t('text1')}</p>
                        <p>{t('text2')}</p>
                        <p>{t('text3')}</p>
                    </div>
                    <div className={styles.symptomsDocuments}>
                        <h2>{t('learnMore')}</h2>
                        <Link href="/documents/徳島大学病院_金属アレルギー外来パンフレット最終版.pdf" target="_blank" rel="noopener noreferrer">
                            <p>{t('outpatientDocument')}</p>
                            <Image src={pdfDownload} alt="PDF Download" width={20} height={20} />
                        </Link>
                        <Link href="/documents/アクセサリーをいつまでも楽しむために.pdf" target="_blank" rel="noopener noreferrer">
                            <p>{t('guideDocument')}</p>
                            <Image src={pdfDownload} alt="PDF Download" width={20} height={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
