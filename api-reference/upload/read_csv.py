file_name = r"c:\Users\13104\Downloads\DGS10.csv"

with open(file_name) as open_file:
    data = open_file.read()

print(str(data))