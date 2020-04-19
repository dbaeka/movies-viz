import requests
import sys
import shutil
import re
import os
import pandas as pd
import time
import threading
from bs4 import BeautifulSoup as soup

THREAD_COUNTER = 0
THREAD_MAX = 5


def get_source(link):
    r = requests.get(link)
    if r.status_code == 200:
        return soup(r.text, features="html.parser")
    else:
        sys.exit("[~] Invalid Response Received.")


def filter(html):
    poster_tag = html.find("div", class_="poster")
    if poster_tag:
        img = poster_tag.find_all("img")
        if img:
            return img
    else:
        print("[~] No images detected on the page.")
        return None


def append_dict(dict, key, value):
    dict[key] = value


def download_images(link, name):
    global THREAD_COUNTER
    THREAD_COUNTER += 1
    try:
        r = requests.get(link, stream=True)
        if r.status_code == 200:
            r.raw.decode_content = True
            f = open(name, "wb")
            shutil.copyfileobj(r.raw, f)
            f.close()
            print
            "[*] Downloaded Image: %s" % name
    except Exception as error:
        print("[~] Error Occured with %s : %s" % (name, error))
    THREAD_COUNTER -= 1


def main():
    data = pd.read_csv('data/movie_metadata.csv')
    name = "movie_poster_link"
    poster_links = {}
    for index, row in data.iterrows():
        link = row['movie_imdb_link']
        html = get_source(link)
        tags = filter(html)
        if not tags:
            _t = threading.Thread(target=append_dict, args=(poster_links, index, ""))
            _t.daemon = True
            _t.start()
            continue
        for tag in tags:
            src = tag.get("src")
            if src:
                src = re.match(r"((?:https?:\/\/.*)?\/(.*\.(?:png|jpg)))", src)
                if src:
                    (link, _) = src.groups()
                    # path = os.path.join(os.getcwd(), 'images')
                    # if not os.path.isdir(path):
                    #     os.mkdir(path)
                    # name = os.path.join(path, name)
                    _t = threading.Thread(target=append_dict, args=(poster_links, index, link))
                    _t.daemon = True
                    _t.start()
                    print(len(poster_links))
                    while THREAD_COUNTER >= THREAD_MAX:
                        pass
                        # time.sleep(5)

        while THREAD_COUNTER > 0:
            pass

    poster_links = sorted(poster_links.items(), key=lambda kv: kv[0])
    poster_links = [tup[1] for tup in poster_links]
    data[name] = poster_links
    path = os.path.join(os.getcwd(), 'data')
    data.to_csv(os.path.join(path, 'movies.csv'), index=False, header=True)


if __name__ == "__main__":
    main()
