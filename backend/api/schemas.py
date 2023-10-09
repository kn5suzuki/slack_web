from pydantic import BaseModel
from typing import List


class ReplyData(BaseModel):
    channel_id: str
    ts: str
    message: str
    mention_ids: List[str] = []


class postMessageData(BaseModel):
    channel_id: str
    text: str


class channelData(BaseModel):
    id: str
    name: str


class memberData(BaseModel):
    id: str
    name: str


class messageData(BaseModel):
    ts: str
    text: str
    senderId: str
    reactorIds: List[str]
    replyUserIds: List[str]


class countData(BaseModel):
    ts: str
    text: str
    senderId: str
