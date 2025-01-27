import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ITips } from "./tips.interface";
import { Tips } from "./tips.model";
import unlinkFile from "../../../shared/unlinkFile";
import mongoose from "mongoose";

const createTipsToDB = async (payload:ITips): Promise<ITips> => {

  const createTips:any = await Tips.create(payload);
  if (!createTips) {
    unlinkFile(payload.image)
    throw new ApiError(StatusCodes.OK, "Failed to created tips");
  }

  return createTips;
};

const getAllTipsFromDB = async (): Promise<ITips[]>=> {
  return await Tips.find({}).select("name image");
};

const updateTipsToDB = async (id: string, payload:ITips): Promise<ITips | null> => {

  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid Tips ID")
  }

  const isTipsExist:any = await Tips.findById(id);

  if (payload.image) {
    unlinkFile(isTipsExist?.image);
  }

  const tips: ITips | null = await Tips.findOneAndUpdate({ _id: id }, payload, {new: true});
  return tips;
};

const deleteTipsToDB = async (id: string): Promise<ITips | undefined> => {

  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Invalid Tips ID ")
  }

  const isTipsExist:any = await Tips.findById({_id: id});

  //delete from folder
  if(isTipsExist){
    unlinkFile(isTipsExist?.image);
  }

  //delete from database
  await Tips.findByIdAndDelete(id);
  return; 
};

export const TipsService = {
  createTipsToDB, 
  getAllTipsFromDB, 
  updateTipsToDB, 
  deleteTipsToDB
}