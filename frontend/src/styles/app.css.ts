import { style } from "@vanilla-extract/css";

export const submitButton = style({
  width: 200,
  fontSize: 13,

  "@media": {
    "screen and (max-width: 768px)": {
      width: 150,
      fontSize: 10,
    },
  },
});

export const muiTextField = style({
  fontSize: 13,

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: 10,
      //   padding: "5px 14px",
    },
  },
});
