import React from 'react';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useTranslation } from 'react-i18next';
import type { DemoAutofillFabProps } from './types';
import { fabStyles } from './styles';

export const DemoAutofillFab: React.FC<DemoAutofillFabProps> = ({
  popoverId,
  onOpen,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('demo_autofill.fab_tooltip')} placement="left" arrow>
      <Fab
        color="primary"
        aria-describedby={popoverId}
        onClick={onOpen}
        sx={fabStyles}
      >
        <AutoFixHighIcon />
      </Fab>
    </Tooltip>
  );
};

export default DemoAutofillFab;
