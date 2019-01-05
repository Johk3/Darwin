import sqlite3
import time
import wikipedia

print("Updating database...")

start = time.time()
conn = sqlite3.connect('bob_bacteria.db')
cur = conn.cursor()

cur.execute("SELECT * FROM bob")
results = cur.fetchall()
sql = ''' INSERT INTO bob(description)
              VALUES(?) '''
for result in results:
    if not result[5]:
        name = result[0]
        try:
            description = wikipedia.summary(name.lower(), sentences=7)
            if description:
                print(name)
                cur.execute("UPDATE bob SET description = (?) WHERE name = (?)", (description, name, ))
        except Exception:
            print("Didnt found wikipedia page {}".format(name))
            continue

conn.commit()
cur.close()
conn.close()

end = time.time()
print("")
print("Updating and verifying database took\n"
      "---{0:.3f} Seconds---".format(end - start))
