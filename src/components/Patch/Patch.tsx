import { getTranslations } from 'next-intl/server';
import styles from "./Patch.module.css";
import PatchFlow from '@/components/PatchFlow/PatchFlow';
import Image from 'next/image';
import patchImg from '@/img/patch/patch.png';
import Link from 'next/link';
import pdfDownload from '@/img/icons/pdf.png'


export default async function Patch() {
    const t = await getTranslations('Patch');
    const tSchedule = await getTranslations('Schedule');
    return (
        <section id="patchTest" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{t('patchTitle')}</h3>
            </div>
            <div className={styles.patchContainer}>
                <div className={styles.patchText}>
                    <div className={styles.patchTextHeader}>
                        <h2>{t('introTitle')}</h2>
                    </div>
                    <div className={styles.patchTextContent}>
                        <p>{t('text1')}</p>
                        <p>{t('text2')}</p>
                        <p>{t('text3')}</p>
                    </div>
                    <div className={styles.scheduleTableWrapper}>
                            <table className={styles.scheduleTable}>
                                <thead>
                                    <tr>
                                        <th>{tSchedule('department')}</th>
                                        <th>{tSchedule('mon')}</th>
                                        <th>{tSchedule('tue')}</th>
                                        <th>{tSchedule('wed')}</th>
                                        <th>{tSchedule('thu')}</th>
                                        <th>{tSchedule('fri')}</th>
                                        <th>{tSchedule('receptionHours')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={styles.departmentCell}>
                                            <span>{tSchedule('departmentName1')}</span>
                                            <span>{tSchedule('departmentName2')}</span>
                                            <span className={styles.departmentName3}>{tSchedule('departmentName3')}</span>
                                        </td>
                                        <td className={styles.symbolX}>×</td>
                                        <td className={styles.symbolO}>〇</td>
                                        <td className={styles.symbolX}>×</td>
                                        <td className={styles.symbolO}>〇</td>
                                        <td className={styles.symbolO}>〇</td>
                                        <td className={styles.timeCell}>
                                            <span>{tSchedule('timeMorning')}</span>
                                            <span>{tSchedule('timeAfternoon')}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className={styles.patchFlow}>
                        <PatchFlow />
                    </div>
                    <div className={styles.patchImage}>
                        <Image src={patchImg} alt="Patch" width={455} height={334} />
                    </div>
                    <div className={styles.observations}>
                        <p>{t('observation1')}</p>
                        <p>{t('observation2')}</p>
                    </div>
                    <div className={styles.moreInfo}>
                        <Link href="/documents/徳島大学病院_金属アレルギー外来_パッチテスト.pdf" target="_blank" rel="noopener noreferrer">
                            <p>{t('moreInfo')}</p>
                            <Image src={pdfDownload} alt="PDF Download" width={20} height={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}