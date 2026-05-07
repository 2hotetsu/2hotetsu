import { getTranslations } from 'next-intl/server';
import styles from './PatchFlow.module.css';

export default async function PatchFlow() {
  const t = await getTranslations('PatchFlow');

  return (
    <div className={styles.flowContainer}>
      <div className={styles.flowStep}>
        <div className={styles.leftCol + ' ' + styles.bgBox}>
          <div>{t('step1Left')}</div>
        </div>
        <div className={styles.connector}></div>
        <div className={styles.rightCol}>
          <div>{t('step1Right1')}</div>
          <div>{t('step1Right2')}</div>
        </div>
      </div>
      <div className={styles.arrowDown}></div>

      <div className={styles.flowStep}>
        <div className={styles.leftCol + ' ' + styles.bgBox}>
          <div>{t('step2Left1')}</div>
          <div className={styles.highlightText}>{t('step2Left2')}</div>
        </div>
        <div className={styles.connector}></div>
        <div className={styles.rightCol}>
          <div>{t('step2Right')}</div>
        </div>
      </div>
      <div className={styles.arrowDown}></div>

      <div className={styles.flowStep}>
        <div className={styles.leftCol + ' ' + styles.bgBox}>
          <div>{t('step3Left1')}</div>
          <div className={styles.highlightText}>{t('step3Left2')}</div>
        </div>
        <div className={styles.connector}></div>
        <div className={styles.rightCol}>
          <div>{t('step3Right1')}</div>
          <div>{t('step3Right2')}</div>
        </div>
      </div>
      <div className={styles.arrowDown}></div>

      <div className={styles.flowStep}>
        <div className={styles.leftCol + ' ' + styles.bgBox}>
          <div>{t('step4Left1')}</div>
          <div className={styles.highlightText}>{t('step4Left2')}</div>
        </div>
        <div className={styles.connector}></div>
        <div className={styles.rightCol}>
          <div>{t('step4Right')}</div>
        </div>
      </div>
      <div className={styles.arrowDown}></div>

      {/* Step 5 */}
      <div className={styles.flowStep}>
        <div className={styles.leftCol + ' ' + styles.bgBox}>
          <div>{t('step5Left1')}</div>
          <div className={styles.highlightText}>{t('step5Left2')}</div>
        </div>
        <div className={styles.connector}></div>
        <div className={styles.rightCol}>
          <div>{t('step5Right1')}</div>
          <div>{t('step5Right2')}</div>
        </div>
      </div>
    </div>
  );
}
