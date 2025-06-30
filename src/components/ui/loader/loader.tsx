import styles from './styles.module.css';

interface Props {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
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
