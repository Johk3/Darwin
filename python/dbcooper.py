import sqlite3
import time
import wikipedia
import random
import string
from bs4 import BeautifulSoup as bs4
from urllib import request
import random
from base64 import b64encode
import re

print("Updating database...")

url = "https://en.wikipedia.org/wiki/List_of_clinically_important_bacteria"
page = request.urlopen(url)
soup = bs4(page.read())

data = soup.findAll("a", {"class": "mw-redirect"})
textdata = []
i = 0
types = []

for value in data:
    if value.text.strip() != "List of human diseases associated with infectious pathogens" and value.text != "list of viruses":
        print(value.text)
        textdata.append(value.text)

start = time.time()
conn = sqlite3.connect('bacterias.db')
cur = conn.cursor()

cur.execute("SELECT * FROM main")
results = cur.fetchall()
sql = ''' INSERT INTO main
              VALUES(?, ?, ?, ?, ?, ?) '''
for text in textdata:
        try:
            id = random._urandom(12)
            id = b64encode(id).decode("utf-8")
            id = re.sub(r'\W+', '', id)
            description = wikipedia.summary(text.lower(), sentences=7)
            if description:
                cur.execute(sql, (text, "Bacteria", "null", "null", id, description))
            else:
                cur.execute(sql, (text, "Bacteria", "null", "null", id, "null"))
            print(text)
        except Exception as e:
            print("Error code:\n{}".format(e))
            continue

conn.commit()
cur.close()
conn.close()

end = time.time()
print("")
print("Updating and verifying database took\n"
      "---{0:.3f} Seconds---".format(end - start))
