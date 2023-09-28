from pydantic import BaseModel
from typing import List


class ReplyData(BaseModel):
    channel_id: str
    ts: str
    message: str
    mention_names: List[str]


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
