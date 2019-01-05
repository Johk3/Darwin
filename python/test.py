import random
import string

id = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(16))

print(id)
