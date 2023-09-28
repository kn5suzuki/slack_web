import Accordion from "@mui/material/Accordion";
import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/material";
import { Member } from "../types/Member";
import SendMessage from "./SendMessage";
import RemindMessage from "./RemindMessage";
import CountMessage from "./CountMessage";

export default function ChannelOperations({
  token,
  channelId,
  members,
}: {
  token: string;
  channelId: string;
  members: Member[];
}) {
  const CustomizedAccordionSummary = styled((props: AccordionSummaryProps) => (
    <AccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));
  return (
    <Box sx={{ width: "80%" }}>
      <Accordion>
        <CustomizedAccordionSummary>
          <Typography variant="h5">1. Send message to this channel</Typography>
        </CustomizedAccordionSummary>
        <AccordionDetails>
          <SendMessage token={token} channelId={channelId} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <CustomizedAccordionSummary>
          <Typography variant="h5">
            2. Send remind to a specific message
          </Typography>
        </CustomizedAccordionSummary>
        <AccordionDetails>
          <RemindMessage
            token={token}
            channelId={channelId}
            members={members}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <CustomizedAccordionSummary>
          <Typography variant="h5">
            3. Count messages of channel members which contains a specific word
          </Typography>
        </CustomizedAccordionSummary>
        <AccordionDetails>
          <CountMessage token={token} channelId={channelId} members={members} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
