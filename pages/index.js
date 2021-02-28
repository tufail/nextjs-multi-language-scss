import useTranslation from '@/i18n/useTranslation';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={styles[`heading-1`]}>{t('home')}</h1>
    </div>
  );
}
