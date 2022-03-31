import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
export const Burger = styled("div")`
  z-index: 10;
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 50px;
  div {
    width: 27px;
    height: 2px;
    background: ${(props) => (props.open ? "transparent" : "#000")};
    transform: ${(props) =>
      props.open ? "translateX(-50px)" : "translateX(0px)"};
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 27px;
      height: 2px;
      background-color: #000;
      border-radius: 5px;
      transition: all 0.5s ease-in-out;
    }
    &::after {
      transform: ${(props) =>
        props.open
          ? "rotate(-45deg) translate(35px,35px)"
          : "translate(0px,7px)"};
    }
    &::before {
      transform: ${(props) =>
        props.open
          ? "rotate(45deg) translate(35px,-35px)"
          : "translate(0px,-7px)"};
    }
  }
  @media (min-width: 800.02px) {
    display: none;
  }
`;
export const Menu = styled(Box)`
  display: flex;
  flex-grow: 4;
  justify-content: center;
  gap: 3vw;
  transition: all 0.5s ease-in-out;
  @media (max-width: 800px) {
    position: fixed;
    display: flex;
    background-color: #fff;
    z-index: 10;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transform: ${(props) =>
      props.open ? "translateX(0px)" : "translateX(100%)"};
  }
`;

export const MyLink = styled(Link)`
  color: #000;
  min-width: 4rem;
  padding: 4px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgb(100, 98, 98);
    background: linear-gradient(
      270deg,
      rgba(100, 98, 98, 1) 0%,
      rgba(100, 98, 98, 0) 100%
    );
    transition: all 0.2s ease-in-out;
    transform: scaleX(0);
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
