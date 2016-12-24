#Render cowfiles into normal looking cows

import os
import subprocess
COWPATH = "/usr/share/cows/"
RENDERED_PATH = "./cowfiles/"

for cowfile in os.listdir(COWPATH):
    try:
        cow_name = cowfile.split(".cow")[0]
        cow = subprocess.check_output(["cowsay", "-f", cow_name, "cow processing"])

        with open(os.path.join(RENDERED_PATH, cowfile), "wb+") as f:
            f.write(cow[57:-1])
    except Exception:
        print("%s not found" % cowfile)