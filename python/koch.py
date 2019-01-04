#!/usr/bin/env python3

__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "YELLOWHATT, Hydra and Artistic Memes"
__email__ = "thekoolaidmannn@gmail.com"
__status__ = "Production - Beta"
__dates__ = "11/17/18 - 01/02/19"
__type__ = "Scientific Application"
__estimated_release_date__ = "02/03/19"
__name__ = "Microbe-Log"

# import wikipedia (Wikipedia API not compatible with Python 3.7)
import os
import sqlite3
import time
import argparse
import wikipedia

BLUE, RED, WHITE, YELLOW, MAGENTA, GREEN, END = ['\33[94m', '\033[91m', '\33[97m', '\33[93m', '\033[1;35m',
                                                 '\033[1;32m', '\033[0m']

logo = GREEN + '''     
           ....                                                         .                 
       .xH888888Hx.                                 x=~                @88>               
     .H8888888888888:                   .u    .    88x.   .e.   .e.    %8P      u.    u.  
     888*"""?""*88888X         u      .d88B :@8c  '8888X.x888:.x888     .     x@88k u@88c.
    'f     d8x.   ^%88k     us888u.  ="8888f8888r  `8888  888X '888k  .@88u  ^"8888""8888"
    '>    <88888X   '?8  .@88 "8888"   4888>'88"    X888  888X  888X ''888E`   8888  888R 
     `:..:`888888>    8> 9888  9888    4888> '      X888  888X  888X   888E    8888  888R 
            `"*88     X  9888  9888    4888>        X888  888X  888X   888E    8888  888R 
       .xHHhx.."      !  9888  9888   .d888L .+    .X888  888X. 888~   888E    8888  888R 
      X88888888hx. ..!   9888  9888   ^"8888*"     `%88%`"*888Y"      888&   "*88*" 8888"
     !   "*888888888"    "888*""888"     "Y"         `~     `"         R888"    ""   'Y"  
            ^"***"`       ^Y"   ^Y'                                     ""                                                                                                      

        ''' + END

parser = argparse.ArgumentParser()

ff = logo.encode("utf-")

parser = argparse.ArgumentParser(description="This is a science program made to search for bacteria, viruses, protozas and fungi. \nWe use advanced methods to deliver the best relevant information for you.")

parser.add_argument("--bacteria", type=str,
                    help="Search your bacteria using this argument")
parser.add_argument("--virus", type=str,
                    help="Search your virus using this argument")
parser.add_argument("--protozoa", type=str,k
                    help="Search your protozoa using this argument")
parser.add_argument("--fungi", type=str,
                    help="Search your fungi using this argument")

args = parser.parse_args()

print("Updating database...")
start = time.time()
conn = sqlite3.connect('bob_bacteria.db')

cur = conn.cursor()


# Readline module will be used for autocorrect or suggestions
# NEI = Not Enough Information
# Numbers are organized in binary
# A symptoms thing will be made later (possibly)

class virus:

    def __init__(self, namev, typev, speciesv, common_name_diseasev, groupv):
        self.namev = namev
        self.typev = typev
        self.speciesv = speciesv
        self.common_name_diseasev = common_name_diseasev
        self.groupv = groupv
        cur.execute("SELECT * FROM bob WHERE lower(name)=?", (self.namev.lower(),))
        exists = cur.fetchone()
        if not exists and self.groupv:
            cur.execute("INSERT into bob VALUES (?, ?, ?, ?)", (self.namev, self.typev, self.speciesv, self.groupv))
            conn.commit()
        if not exists and not self.groupv:
            cur.execute("INSERT into bob VALUES (?, ?, ?, null)", (self.namev, self.typev, self.speciesv))
            conn.commit()
        else:
            pass

    def __str__(self):
        return (" ".join(["Name:", self.namev, "Type:", self.typev, "Species:", self.speciesv, "Common disease name:",
                          self.common_name_diseasev, "Group:", self.groupv]))


# RNA || ODD NUMBERS
vrs00000001 = virus("Zaire Ebola Virus", "((-)ssRNA)", "Ebola Virus", "Ebola Hemorrhagic Fever", "Group V")  # 1
vrs00000011 = virus("Marburg Virus", "((-)ssRNA)", "Marburg", "Marburg Hemorrhagic Fever", "Group V")  # 3
# List Separation
vrs00000010 = virus("Variola Major", "(dsDNA)", "Variola", "Small Pox", "Group I")  # 2
vrs00000100 = virus("Human Herpes Simplex Virus I", "(dsDNA)", "Herpes Simplex Virus I", "Herpes Virus", "Group I")  # 4


# DNA || EVEN NUMBERS

class fungi:

    def __init__(self, namef, typef, speciesf):
        self.namef = namef
        self.typef = typef
        self.speciesf = speciesf
        cur.execute("SELECT * FROM bob WHERE lower(name)=?", (self.namef.lower(),))
        exists = cur.fetchone()
        if not exists and self.speciesf:
            cur.execute("INSERT into bob VALUES (?, ?, ?, null)", (self.namef, self.typef, self.speciesf))
            conn.commit()
        else:
            pass

    def __str__(self):
        return (" ".join(["Name:", self.namef, "Type:", self.typef, "Species:", self.speciesf]))


fng00000001 = fungi("Synchytrium endobioticum", "Chytridiomycota", "Endobioticum")  # 1
# Separation
fng00000010 = fungi("Phycomyces blakesleeanus", "Zygomycota", "Blakesleeanus")  # 2
# Separation
fng00000011 = fungi("Sarcoscypha coccinea", "Ascomycota", "Coccinea")  # 3
fng00001001 = fungi("Aspergillus penicillioides", "Ascomycota", "Penicillioides")  # 9
# Separation
fng00000100 = fungi("Geastrum coronatum", "Basidiomycota", "Coronatum")  # 4
# Separation
# Deuteromycota NEI # 5 supossed to be 5
# Separation
fng00000101 = fungi("Geosiphon pyriformis", "Gleromycota", "Pyriformis")  # 5


class protozoa:

    def __init__(self, namep, typep, speciesp, common_name_diseasep):
        self.namep = namep
        self.typep = typep
        self.speciesp = speciesp
        self.common_name_diseasep = common_name_diseasep
        cur.execute("SELECT * FROM bob WHERE lower(name)=?", (self.namep.lower(),))
        exists = cur.fetchone()
        if not exists:
            cur.execute("INSERT into bob VALUES (?, ?, ?, null)", (self.namep, self.typep, self.speciesp))
            conn.commit()
        else:
            pass

    def __str__(self):
        return (" ".join(["Name:", self.namep, "Type:", self.typep, "Species:", self.speciesp, "Common disease name:",
                          self.common_name_diseasep]))


# Mastigophora
proto00000001 = protozoa("", "", "", "")  # 1
# Sarcodina
proto00000010 = protozoa("", "", "", "")  # 2
# Separation
proto00000011 = protozoa("Toxoplasma gondii", "Apicomplexa", "Gondii", "Toxoplasmosis")  # 3
proto00000100 = protozoa("Plasmodium vivax", "Apicomplexa", "Vivax", "Malaria")  # 4
# Separation
proto00000101 = protozoa("Oxytricha trifallax", "Ciliophora", "Trifallax", "None")  # 5


class bacteria:

    def __init__(self, nameb, typeb, speciesb, common_name_diseaseb):
        self.nameb = nameb
        self.typeb = typeb
        self.speciesb = speciesb
        self.common_name_diseaseb = common_name_diseaseb
        cur.execute("SELECT * FROM bob WHERE lower(name)=?", (self.nameb.lower(),))
        exists = cur.fetchone()
        if not exists:
            cur.execute("INSERT into bob VALUES (?, ?, ?, null)", (self.nameb, self.typeb, self.speciesb))
            conn.commit()
        else:
            pass

    def __str__(self):
        return (" ".join(["Name:", self.nameb, "Type:", self.typeb, "Species:", self.speciesb, "Common disease name:",
                          self.common_name_diseaseb]))


# Gram Negative Bacteria || ODD NUMBERS
bac00000001 = bacteria("Eschericia Coli", "Gram Negative", "Coli", "Shiga Toxin")  # 1
bac00000011 = bacteria("Pseudomonas Aeruginosa", "Gram Negatove", "Aeruginosa", "Lorem ipsum")  # 3
bac00000101 = bacteria("Salmonella Enterica", "Gram Negative", "Enterica", "Lorem  ipsum")  # 5
bac00000111 = bacteria("Helicobacter Pylori", "Gram Negative", "Pylori", "Stomach Ulcers")  # 7
bac00001001 = bacteria("Klebsiella Pneumoniae", "Gram Negative", "Pneumoniae", "Lorem ipsum")  # 9
bac00001011 = bacteria("Burkholderia Pseudomallei", "Gram Negative", "Pseudomallei", "Lorem ipsum")  # 11
bac00001101 = bacteria("Enterobacter Cloacae", "Gram Negative", "Cloacae", "Lorem ipsum")  # 13
bac00001111 = bacteria("Yersinia Pestis", "Gram Negative", "Pestis", "Plague")  # 15
bac00010001 = bacteria("Neisseria Meningitidis", "Gram Negative", "Meningitidis", "Lorem ipsum")  # 17
bac00010011 = bacteria("Prevotella Melaninogenica", "Gram Negative", "Melaninogenica", "Lorem ipsum")  # 19
bac00010101 = bacteria("Salmonella Bongori", "Gram Negative", "Bongori", "Lorem ipsum")  # 21
bac00010111 = bacteria("Vibrio Cholerae", "Gram Negative", "Cholerae", "Cholera")  # 23
bac00011001 = bacteria("Brucellosis Canis", "Gram Negative", "Canis", "Lorem ipsum")  # 25
# List Separation
bac00000010 = bacteria("Streptococcus Sanguinis", "Gram Negative", "Sanguinis", "Lorum ipsum")  # 2
bac00000100 = bacteria("Staphylococcus Aureus", "Gram Positive", "Aureus", "Lorem ipsum")  # 4
bac00000110 = bacteria("Clostridium Botulinum", "Gram Positive", "Botulinum", "Botulism")  # 6
bac00001000 = bacteria("Clostridium Tetani", "Gram Positive", "Tetani", "Tetanus")  # 8
bac00001010 = bacteria("Bacillus Anthracis", "Gram Positive", "Anthracis", "Anthrax")  # 10
bac00001100 = bacteria("Listeria Monocytogenes", "Gram Positive", "Monocytogenes", "Lorum ipsum")  # 12
bac00001110 = bacteria("Clostridioides Difficile", "Gram Positive", "Difficile", "Lorum ipsum")  # 14
bac00010000 = bacteria("Streptococcus Mitis", "Gram Positive", "Mitis", "Lorum ipsum")  # 16
bac00010010 = bacteria("Clostridium Perfringens", "Gram Positive", "Perfringens", "Lorum ipsum")  # 18
bac00010100 = bacteria("Staphylococcus Saprophyticus", "Gram Positive", "Saprophyticus", "Lorum ipsum")  # 20
bac00010110 = bacteria("Corynebacterium Diphtheriae", "Gram Positive", "Diphtheriae", "Lorem ipsum")  # 22
bac00011000 = bacteria("Streptococcus Pyogenes", "Gram Positive", "Pyogenes", "Lorem ipsum")  # 24
bac00011010 = bacteria("Clostridium Perfringens", "Gram Positive", "Perfringens", "Lorum ipsum")  # 26
bac00011100 = bacteria("Methicillin Resistant Staphylococcus Areus", "Gram Positive", "Areus", "Lorem ipsum")  # 28
# Gram Positive Bacteria || EVEN NUMBERS

end = time.time()
print("")
print("Updating and verifying database took\n"
      "---{0:.3f} Seconds---".format(end - start))
time.sleep(1)
os.system('cls' if os.name == 'nt' else 'clear')

print(logo)

if args.bacteria:
    print(wikipedia.summary(args.bacteria, sentences=2))
    cur.execute("SELECT * FROM bob WHERE lower(name)=?", (args.bacteria.lower(),))
    results = cur.fetchone()
    if results:
        print("\n\nFound from the database:\n"
              "Name: {}\n"
              "Type: {}\n"
              "Specie: {}\n"
              "Disease: {}\n".format(results[0], results[1], results[2], results[3]))

if args.virus:
    print(wikipedia.summary(args.virus, sentences=2))
    cur.execute("SELECT * FROM bob WHERE lower(name)=?", (args.virus.lower(),))
    results = cur.fetchone()
    if results:
        print("Found from the database:\n"
              "Name: {}\n"
              "Type: {}\n"
              "Specie: {}\n"
              "Disease: {}\n".format(results[0], results[1], results[2], results[3]))

if args.protozoa:
    print(wikipedia.summary(args.protozoa, sentences=2))
    cur.execute("SELECT * FROM bob WHERE lower(name)=?", (args.protozoa.lower(),))
    results = cur.fetchone()
    if results != None:
        print("Found from the database:\n"
              "Name: {}\n"
              "Type: {}\n"
              "Specie: {}\n"
              "Disease: {}\n".format(results[0], results[1], results[2], results[3]))


if args.fungi:
    print(wikipedia.summary(args.fungi, sentences=2))
    cur.execute("SELECT * FROM bob WHERE lower(name)=?", (args.fungi.lower(),))
    results = cur.fetchone()
    if results != None:
        print("Found from the database:\n"
              "Name: {}\n"
              "Type: {}\n"
              "Specie: {}\n"
              "Disease: {}\n".format(results[0], results[1], results[2], results[3]))
