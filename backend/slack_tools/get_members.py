import os
from dotenv import load_dotenv

from slack_sdk.web import WebClient


def get_all_members(client):
    all_members = client.users_list()['members']
    members_list = []
    for member in all_members:
        members_list.append(
            {"id": member["id"], "name": member["profile"]['display_name']})
    return members_list


def get_channel_members(client, channel_id):
    all_members = client.users_list()['members']
    channel_members = client.conversations_members(channel=channel_id)[
        "members"]
    members_list = []
    for member in all_members:
        if member["id"] in channel_members and member["profile"]['display_name']:
            members_list.append(
                {"id": member["id"], "name": member["profile"]['display_name']})
    return members_list


if __name__ == "__main__":
    load_dotenv()
    SLACK_API_TOKEN = os.getenv('UserOAuthToken')
    client = WebClient(token=SLACK_API_TOKEN)

    MEMBER_LIST = get_all_members(client)
    # print(create_members_dict(MEMBER_LIST))
