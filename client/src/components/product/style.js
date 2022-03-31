import { styled } from "@mui/system";
import { Box } from "@mui/material";
export const AddToCart = styled("button")`
  padding: 1rem;
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  left: 0;
  background: #000;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;

  transform: translateY(50px);
  transition: all 0.3s ease-in-out;
`;
export const ProdCont = styled(Box)`
  &:hover {
    button {
      transform: translateY(0px);
    }
  }
`;
