import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { useTranslation } from 'react-i18next';
import type { DemoAutofillUserCardProps } from './types';
import {
  userCardContentStyles,
  userCardHeaderRowStyles,
  userNameStyles,
  countryChipStyles,
  userDescriptionStyles,
  userStatsDividerStyles,
  userStatsRowStyles,
  userStatItemStyles,
  userStatIconStyles,
  capitalizeStatTextStyles,
  dependentsStatTextStyles,
  incomeStatTextStyles,
} from './styles';

export const DemoAutofillUserCard: React.FC<DemoAutofillUserCardProps> = ({
  user,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Card onClick={() => onSelect(user)}>
      <CardContent sx={userCardContentStyles}>
        <Box sx={userCardHeaderRowStyles}>
          <Typography variant="subtitle2" sx={userNameStyles}>
            {user.personal.name}
          </Typography>

          <Chip
            label={user.personal.country}
            size="small"
            color="primary"
            variant="outlined"
            sx={countryChipStyles}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={userDescriptionStyles}
        >
          {user.description}
        </Typography>

        <Divider sx={userStatsDividerStyles} />

        <Box sx={userStatsRowStyles}>
          <Box sx={userStatItemStyles}>
            <PersonIcon sx={userStatIconStyles} />
            <Typography
              variant="caption"
              color="text.primary"
              sx={capitalizeStatTextStyles}
            >
              {user.personal.gender}
            </Typography>
          </Box>

          <Box sx={userStatItemStyles}>
            <PeopleIcon sx={userStatIconStyles} />
            <Typography
              variant="caption"
              color="text.primary"
              sx={dependentsStatTextStyles}
            >
              {t('demo_autofill.dependents_short', {
                count: user.family.dependents,
              })}
            </Typography>
          </Box>

          <Box sx={userStatItemStyles}>
            <WorkIcon sx={userStatIconStyles} />
            <Typography
              variant="caption"
              color="text.primary"
              sx={capitalizeStatTextStyles}
            >
              {user.family.employmentStatus.replace('_', ' ')}
            </Typography>
          </Box>

          <Box sx={userStatItemStyles}>
            <AttachMoneyIcon sx={userStatIconStyles} />
            <Typography variant="caption" sx={incomeStatTextStyles}>
              {user.family.monthlyIncome} {user.family.currency}
            </Typography>
          </Box>

          <Box sx={userStatItemStyles}>
            <HomeIcon sx={userStatIconStyles} />
            <Typography
              variant="caption"
              color="text.primary"
              sx={capitalizeStatTextStyles}
            >
              {user.family.housingStatus}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DemoAutofillUserCard;
