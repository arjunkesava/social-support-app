import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import type { DemoAutofillPopoverHeaderProps } from './types';
import {
  getPopoverHeaderStyles,
  popoverHeaderTitleRowStyles,
  popoverTitleStyles,
} from './styles';

export const DemoAutofillPopoverHeader: React.FC<DemoAutofillPopoverHeaderProps> = ({
  themeMode,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={getPopoverHeaderStyles(themeMode)}>
      <Box sx={popoverHeaderTitleRowStyles}>
        <AutoFixHighIcon fontSize="small" color="primary" />
        <Typography variant="subtitle1" sx={popoverTitleStyles}>
          {t('demo_autofill.title')}
        </Typography>
      </Box>

      <IconButton
        size="small"
        onClick={onClose}
        aria-label={t('demo_autofill.close')}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DemoAutofillPopoverHeader;
