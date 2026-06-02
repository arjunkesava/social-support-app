import type { ThemeMode } from '../../context/FormContext.shared';
import type {
  PersonalInfo,
  FamilyFinancialInfo,
} from '../../context/FormContext.shared';

export interface MockUser {
  id: string;
  displayName: string;
  description: string;
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
}

export interface DemoAutofillFabProps {
  popoverId: string | undefined;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DemoAutofillPopoverHeaderProps {
  themeMode: ThemeMode;
  onClose: () => void;
}

export interface DemoAutofillUserCardProps {
  user: MockUser;
  onSelect: (user: MockUser) => void;
}

export interface DemoAutofillPopoverProps {
  popoverId: string | undefined;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  themeMode: ThemeMode;
  users: MockUser[];
  onClose: () => void;
  onSelectUser: (user: MockUser) => void;
}

export interface DemoAutofillSnackbarProps {
  open: boolean;
  selectedUserName: string;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export interface DemoAutofillProps {
  themeMode: ThemeMode;
  popoverId: string | undefined;
  popoverOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  users: MockUser[];
  snackbarOpen: boolean;
  selectedUserName: string;
  onFabClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPopoverClose: () => void;
  onSelectUser: (user: MockUser) => void;
  onSnackbarClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void;
}
