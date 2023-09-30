import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Member } from "../types/Member";
import { useState } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import { CountData, CountResult } from "../types/Count";
import CountResultTable from "./CountResultTable";
import decodeTimestamp from "../utils/decodeTimestamp";
import CircularIndeterminate from "./CircularIndeterminate";
import { StyledButton } from "./StyledButton";

export default function CountMessage({
  token,
  channelId,
  members,
}: {
  token: string;
  channelId: string;
  members: Member[];
}) {
  const [query, setQuery] = useState<string>("");
  const [month, setMonth] = useState<string>(`${new Date().getMonth() + 1}`);
  const [sentQuery, setSentQuery] = useState<boolean>(false);
  const [result, setResult] = useState<CountResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const makeCountResult = (
    countData: CountData[],
    members: Member[]
  ): CountResult[] => {
    const result: CountResult[] = members.map((member) => ({
      id: member.id,
      name: member.name,
      messages: [],
    }));
    countData.forEach((data) => {
      result.map((member) => {
        if (member.id === data.senderId) {
          member.messages.push({
            date: decodeTimestamp(data.ts),
            text: data.text,
          });
        }
      });
    });
    result.sort((a, b) => b.messages.length - a.messages.length);
    return result;
  };

  const handleSearchMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentQuery(false);
    setLoading(true);
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/count");
    url.searchParams.append("channel_id", channelId);
    url.searchParams.append("query", query);
    url.searchParams.append("month", month);

    const data = await fetchWrapper<CountData[]>(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data) {
      const result = makeCountResult(data, members);
      setResult(result);
      setSentQuery(true);
    }
    setLoading(false);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        component="form"
        noValidate
        onSubmit={handleSearchMessage}
      >
        <TextField
          margin="normal"
          id="query"
          label="Query"
          fullWidth
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            autoWidth
            label="Month"
            required
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledButton type="submit" variant="contained" sx={{ width: 150 }}>
          集計
        </StyledButton>
      </Box>
      {loading && <CircularIndeterminate />}
      {sentQuery && <CountResultTable result={result} />}
    </>
  );
}
