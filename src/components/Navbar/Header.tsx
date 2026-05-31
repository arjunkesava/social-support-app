import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { headerTitleStyles } from './styles';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="h1" sx={headerTitleStyles}>
      {t('header.title')}
    </Typography>
  );
};
export default Header;
