import { getTranslations } from 'next-intl/server';
import styles from "./Access.module.css";
import Image from 'next/image';
import accessImg from '@/img/home/access.png';


export default async function Access() {
    const t = await getTranslations('Access');
    return (
        <section id="access" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{t('accessTitle')}</h3>
          </div>
          <div className={styles.accessContent}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3304.755173326183!2d134.5186714!3d34.0757898!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355372d0c234f4c3%3A0x38cc242abf2f6ce9!2sTokushima%20University%20Hospital!5e0!3m2!1spt-BR!2sjp!4v1776429228437!5m2!1spt-BR!2sjp" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <Image src={accessImg} alt="Access" width={532} height={743} />
          </div>
        </section>
    );
}