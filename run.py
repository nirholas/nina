import urllib.request
import ssl
import json
import time
import tweepy

ssl._create_default_https_context = ssl._create_unverified_context

# Oauth keys
consumer_key ="XXX"
consumer_secret ="XXX"
access_token ="XXX"
access_token_secret ="XXX"

# Authentication with Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
#LunarCRUSH API Key
api_key = "XXX"

# Allows adding as many coins as desired
coin_list = [
    "LTC",
    "ETH",
    "BTC"
]
coins = ','.join(coin_list)

# A list of the fields desired from the API - key is the Lunar Crush key, and the value is the field name outputted to Twitter
# {"LUNAR_CRUSH_KEY": "RENDERED_NAME"}
# For example, to add tweet_replies, you would add:
# {"tweet_replies": "Tweet Replies: "},
# to the list below.
map = [
    {"name":""},
    {"symbol": ""},
    {"price": " Price: "},
    {"percent_change_24h": " - 24 Hour Percent Change: "},
    {"market_cap": " Market Cap: "},
    {"volume_24h": " 24 Hour Volume: "},
    {"url_shares": " URL Shares: "},
    {"reddit_posts": " Reddit Posts: "},
    {"tweets": " Tweets: "},
    {"galaxy_score": " Galaxy Score: "},
    {"volatility": " Volatility: "},
    {"social_volume": " Social Volume: "},
    {"news": " News: "},
    {"close": " Close: "},
]

def final_render(asset_tweet, value, key, asset):
    # As the program becomes more complex, this should be written in a more robust manner
    if key == 'symbol':
        asset_tweet += " (" + asset[key] + ")"
    elif key == 'percent_change_24h':
        asset_tweet += value + str(asset[key]) + "%"
    else:
        asset_tweet += value + str(asset[key])
    return asset_tweet


# Iterates over each of the fields from Lunar Crush, gets the value from Lunar Crush and renders it with the field name
def main():

    url = "https://api.lunarcrush.com/v2?data=assets&key=" + api_key + "&symbol=" + coins
    assets = json.loads(urllib.request.urlopen(url).read())

    for asset in assets['data']:
        asset_tweet = ""
        for field in map:
            key = list(field.keys())[0]
            value = list(field.values())[0]
            asset_tweet = final_render(asset_tweet, value, key, asset)
        print(asset_tweet)
        print(len(asset_tweet))
        # Posts tweets
        api.update_status(status=asset_tweet)

    # Runs main() every 30 minutes
while True:
    main()
    time.sleep(1800)
