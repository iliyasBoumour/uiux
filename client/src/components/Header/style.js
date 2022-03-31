import { styled } from "@mui/system";
import { Box } from "@mui/material";
export const Header = styled(Box)`
  height: calc(100vh - 64px);
  background: url("/images/bg.jpg") center center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
`;
export const Text = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 100px;
`;
