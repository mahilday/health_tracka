import axios from "axios";
import fs from "fs";

export interface databaseTypes {
  id: number;
  long: string;
  lat: string;
  domain: string,
  geoname_id: string | any;
  isActive: boolean;
}

export default class IpLocationService {
  async getIpDatabase() {
    return new Promise((resolve, reject) => {
      fs.readFile("database.json", (err, data: databaseTypes[] | any) => {
        if (err) {
          if ((err.code = "ENOENT")) {
            resolve({});
          } else {
            reject(err);
          }
        } else {
          const ipDatabase = JSON.parse(data);
          resolve(ipDatabase);
        }
      });
    });
  }

  async saveIpInDatabase(newIpData: databaseTypes | any) {
    return new Promise((resolve, reject) => {
      fs.writeFile("database.json", JSON.stringify(newIpData), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("saved");
        }
      });
    });
  }

  async getIpInfo(domain: string) {
    const apiKey = process.env.IPLOC_API_KEY;
    const ipUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&domain=${domain}`;

    try {
      const response = await axios.get(ipUrl);
      const iplInfo = response.data;
      if (
        !("longitude" in iplInfo) ||
        !("latitude" in iplInfo) ||
        !("geoname_id" in iplInfo)
      ) {
        return null;
      }
      return iplInfo;
    } catch (err) {
        return err;
    }
  }
}
