// Mock MUI styles and media queries globally
jest.mock('@mui/styles', () => ({
  makeStyles: () => () => ({}),
}));

jest.mock('@mui/material/useMediaQuery', () => () => () => ({}));
