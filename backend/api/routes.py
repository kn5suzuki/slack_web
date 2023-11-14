from fastapi import APIRouter, HTTPException, Header, Depends, Body
from starlette.status import HTTP_401_UNAUTHORIZED
from slack_sdk.web import WebClient
from typing import List
import datetime

from slack_tools import get_active_sorted_channels, get_channel_members, get_conversations, send_response, send_message, get_replies_list
from api.schemas import channelData, memberData, messageData, ReplyData, countData, postMessageData

router = APIRouter()


def get_token(authorization: str = Header(default=None)):
    token_prefix = "Bearer "
    if authorization and authorization.startswith(token_prefix):
        return authorization[len(token_prefix):]
    raise HTTPException(
        status_code=HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )


@router.get("/channels")
async def list_channels(token: str = Depends(get_token)) -> List[channelData]:
    client = WebClient(token=token)
    try:
        channels = get_active_sorted_channels(client)
        response = [{"id": d["id"], "name": d["name"]} for d in channels]
        return response
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@ router.post("/channels")
async def post_message(data: postMessageData, token: str = Depends(get_token)) -> str:
    client = WebClient(
        token=token)
    try:
        response = send_message(
            client, channel_id=data.channel_id, text=data.text)
        print(response)
        if response["ok"]:
            return "success"
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/members")
async def list_members(channel_id: str, token: str = Depends(get_token)) -> List[memberData]:
    client = WebClient(token=token)
    try:
        members = get_channel_members(client, channel_id)
        return members
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/messages")
async def list_messages(channel_id: str, query: str, token: str = Depends(get_token)) -> List[messageData]:
    client = WebClient(token=token)
    try:
        messages = get_conversations(client, channel_id)
        response = []
        for message in messages:
            text = message["text"]
            ts = message["ts"]
            userId = message["user"] if "user" in message else ""
            if query in text:
                result = {"ts": ts, "text": text,
                          "senderId": userId, "reactorIds": [], "replyUserIds": []}
                if 'reactions' in message:
                    result["reactorIds"] = list(
                        set([user for reaction in message["reactions"] for user in reaction["users"]]))
                if 'reply_users' in message:
                    result["replyUserIds"] = message["reply_users"]
                response.append(result)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/count")
async def count_posts(channel_id: str, query: str, month: str = "", token: str = Depends(get_token)) -> List[countData]:
    client = WebClient(token=token)
    try:
        messages = get_conversations(client, channel_id)
        response = []
        for message in messages:
            text = message["text"]
            ts = message["ts"]
            userId = message["user"] if "user" in message else ""
            created_date = datetime.datetime.fromtimestamp(float(ts))
            if not month or created_date.month == int(month):
                if query in text:
                    result = {"ts": ts, "text": text,
                              "senderId": userId}
                    response.append(result)

                if 'reply_users' in message:
                    replies = get_replies_list(client, channel_id, ts)
                    for reply in replies:
                        reply_text = reply["text"]
                        reply_ts = reply["ts"]
                        created_date = datetime.datetime.fromtimestamp(
                            float(reply_ts))
                        if query in reply_text and (not month or created_date.month == int(month)):
                            result = {"ts": reply_ts, "text": reply_text,
                                      "senderId": reply["user"]}
                            response.append(result)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@ router.post("/reply")
async def post_reply(data: ReplyData = Body(), token: str = Depends(get_token)) -> str:
    client = WebClient(token=token)
    try:
        response = send_response(client, data.channel_id, data.ts,
                                 data.message, data.mention_ids)
        if response["ok"]:
            return "success"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
