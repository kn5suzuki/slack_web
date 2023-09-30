import os
from dotenv import load_dotenv
from slack_sdk.web import WebClient
from slack_sdk.web.slack_response import SlackResponse


def send_message(client, channel_id, text, mention_names=[], mention_channel=False):
    if mention_channel:
        text = '<!channel>\n' + text
    elif mention_names:
        mention_text = ''
        for mention_name in mention_names:
            mention_text += f'<@{mention_name}> '
        text = mention_text+'\n'+text
    response: SlackResponse = client.chat_postMessage(
        channel=channel_id, text=text)
    return response


def send_response(client, channel_id, ts, text, mention_names=[]):
    print(channel_id)
    print(mention_names)
    if mention_names:
        mention_text = ''
        for member in mention_names:
            mention_text += f'<@{member}> '
        text = mention_text+'\n'+text
    response: SlackResponse = client.chat_postMessage(
        channel=channel_id, thread_ts=ts, text=text)
    return response


if __name__ == "__main__":
    load_dotenv()
    SLACK_API_TOKEN = os.getenv('BotUserOAuthToken')
    CHANNEL_ID = os.getenv('ChannelID')
    client = WebClient(token=SLACK_API_TOKEN)

    result = send_message(
        client, CHANNEL_ID, "テストです", mention_channel=True)
    print(result)
