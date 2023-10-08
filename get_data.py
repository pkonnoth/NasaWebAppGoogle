from arduino_iot_cloud import ArduinoCloudClient


def main():
    # call = pd.read_csv("https://firms.modaps.eosdis.nasa.gov/api/area/csv/0a99be10cfebba71b9e96715339da3c1/VIIRS_NOAA20_NRT/world/1")
    # with open("data.json", "w") as f:
    #     json.dump(call.to_dict(), f, indent=4)
    #     f.close()
    # configure and instance the API client
    device_id = b"um9tCl5LIMzN1dMLZWv9Ry4JYy6QOZ2q"
    device_secret = b"r3aml5RArpjfLjxTQRRJ6f9lIBLYuDZ5b5gcS5OIDoSinxCBb22DoRlmZ0rHqTQD"
    client = ArduinoCloudClient(device_id=device_id, username=device_id, password=device_secret)
    client.start()


if __name__ == "__main__":
    main()
