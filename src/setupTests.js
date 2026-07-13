import { vi } from 'vitest';

vi.mock('@mui/styles', () => ({
  makeStyles: () => () => ({}),
}));

vi.mock('@mui/material/useMediaQuery', () => ({ default: () => () => ({}) }));
