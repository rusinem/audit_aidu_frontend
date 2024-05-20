import { motion } from 'framer-motion';

interface IProps {
  color?: 'white' | 'red';
}

function AnimatedLoader({ color }: IProps) {
  const imageSrc = () => {
    switch (color) {
      case 'white':
        return '/icon_loading--white.svg';
      case 'red':
        return '/icon_loading--red.svg';
      default:
        return '/icon_loading--white.svg';
    }
  };

  return (
    <motion.img
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      src={imageSrc()}
      className='w-20 h-20 mx-auto'
    />
  );
}

export default AnimatedLoader;
