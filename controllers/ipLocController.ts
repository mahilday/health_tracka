import IpLocationService from "../services/ipLocation";
const ipLocService = new IpLocationService();
import { Request, Response } from "express";
import { getActiveData, getNextId } from "../helpers";
import { databaseTypes } from "../services/ipLocation";

export const postIpLoc = async (req: Request, res: Response) => {
  const { domain } = req.body;
  const ipDatabase: any = await ipLocService.getIpDatabase();

  try {
    if (!domain) {
      res.status(400).send("Domain property is required");
    }
    const getDomain = ipDatabase.filter(
      (item: databaseTypes) => item.domain === domain
    );

    if (getDomain.length > 0) {
      res
        .status(200)
        .json({ message: "Retrieved successfully", data: getDomain });
      return;
    }
    const iplInfo = await ipLocService.getIpInfo(domain);
    if (!iplInfo) {
      res.status(404).send("IPLocation not found");
      return;
    }

    ipDatabase[domain] = iplInfo;

    const formattedIpObj = {
      id: getNextId(ipDatabase),
      domain: domain,
      long: iplInfo.longitude,
      lat: iplInfo.latitude,
      geoname_id: iplInfo.geoname_id,
      isActive: true,
    };

    ipDatabase.push(formattedIpObj);

    await ipLocService.saveIpInDatabase(ipDatabase);

    res.status(201).json({ message: "Created successfully", data: iplInfo });
  } catch (error) {
    throw error;
  }
};

export const getAllData = async (req: Request, res: Response) => {
  try {
    const ipDatabase: any = await ipLocService.getIpDatabase();
    res.status(200).json({
      message: "Retrieved successfully",
      data: getActiveData(ipDatabase),
    });
  } catch (error) {
    throw error;
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Id is required, please send as a param");
    }
    const ipDatabase: any = await ipLocService.getIpDatabase();
    const data = ipDatabase.filter((item: any) => {
      return Number(item.id) === Number(id);
    });

    res.status(200).json({
      message: "Retrieved successfully",
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteIpLoc = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).send("Id is required, please send as a param");
    }
    const ipDatabase: any = await ipLocService.getIpDatabase();

    const updatedIpDatabase = ipDatabase.map((item: any) => {
      if (Number(item.id) === Number(id)) {
        return { ...item, isActive: false };
      }
      return item;
    });

    await ipLocService.saveIpInDatabase(updatedIpDatabase);

    res.status(200).json({
      message: "Deleted successfully",
      data: getActiveData(updatedIpDatabase),
    });
  } catch (error) {
    throw error;
  }
};

export const updateIpLoc = async (req: Request, res: Response) => {
  const ipDatabase: any = await ipLocService.getIpDatabase();
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).send("Id is required, please send as a param");
    }
    const updatedIpDatabase = ipDatabase.map((item: any) => {
      if (Number(item.id) === Number(id)) {
        return { ...item, ...req.body };
      }
      return item;
    });

    await ipLocService.saveIpInDatabase(updatedIpDatabase);
    res.status(200).json({message: "Updated successfully", data: getActiveData(updatedIpDatabase) });
  } catch (error) {
    throw error;
  }
};
