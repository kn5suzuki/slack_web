import { ErrorData } from "../types/ErrorData";

export default async function fetchWrapper<T>(
  url: URL,
  options: RequestInit
): Promise<T | null> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData: ErrorData = await response.json();
      throw new Error(errorData.detail);
    }

    const data: T = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      const errorDetail = error.message;
      console.error(errorDetail);
      if (errorDetail.includes("invalid_auth")) {
        alert("無効なトークンです");
      } else if (errorDetail.includes("not_in_channel")) {
        alert("トークンの持ち主がチャンネルにいません");
      } else if (errorDetail.includes("scope")) {
        alert("トークンの権限が足りません");
      } else {
        alert(errorDetail);
      }
    } else {
      console.error(error);
      alert("エラー！！\n" + error);
    }
    return null;
  }
}
