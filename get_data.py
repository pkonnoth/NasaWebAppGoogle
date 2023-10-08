import pandas as pd
import json


def main():
    call = pd.read_csv("https://firms.modaps.eosdis.nasa.gov/api/area/csv/0a99be10cfebba71b9e96715339da3c1/VIIRS_NOAA20_NRT/world/1")
    with open("data.json", "w") as f:
        json.dump(call.to_dict(), f, indent=4)
        f.close()

if __name__ == "__main__":
    main()
