import styles from './styles.module.css';

interface Props {
  color?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Loader({
  size = 'large',
  color = '#000',
  className = '',
}: Props) {
  return (
    <div className={`${styles.loaderContainer} ${className}`} data-size={size}>
      <div
        className={styles.spinner}
        style={{
          borderColor: `${color}20`,
          borderTopColor: color,
        }}
      />
    </div>
  );
}
