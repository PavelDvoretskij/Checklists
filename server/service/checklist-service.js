import ChecklistModel from "../models/checklist.js";

import ApiErrors from "../exceptions/api-errors.js";
import req from "express/lib/request.js";

class ChecklistService {
  async getMyChecklists(num, numberChecklistsPerPage) {
    return ChecklistModel.find({ user: req.userId })
      .skip(num)
      .limit(numberChecklistsPerPage);
  }

  async getChecklists(num, numberChecklistsPerPage) {
    return ChecklistModel.find({ general: true })
      .skip(num)
      .limit(numberChecklistsPerPage);
  }

  async getOneChecklist(user, title) {
    return ChecklistModel.find({ user, title });
  }

  async getCount(namePage) {
    if (namePage === "myChecklists") {
      return ChecklistModel.countDocuments({ user: req.userId });
    } else if (namePage === "generalChecklists") {
      return ChecklistModel.countDocuments({ general: true });
    }
  }

  async create(title, desc, note, updateChecklist, general) {
    const isUsed = await ChecklistModel.findOne({ user: req.userId, title });

    if (isUsed && !updateChecklist) {
      throw new ApiErrors(`Чеклист с таким названием уже существует`, 301);
    }

    if (!isUsed) {
      await ChecklistModel.create({
        user: req.userId,
        title,
        description: desc,
        note,
        general,
      });
      return {
        message: "Чеклист создан",
      };
    }
  }

  async update(title, newTitle, desc, note, general) {
    const isUsed = await ChecklistModel.findOne({
      user: req.userId,
      title: newTitle,
    });
    if (title !== newTitle && isUsed) {
      throw new ApiErrors(`Чеклист с таким названием уже существует`, 301);
    }

    await ChecklistModel.replaceOne(
      { user: req.userId, title },
      {
        user: req.userId,
        title: newTitle,
        description: desc,
        note,
        general,
      },
    );
    return {
      message: "Чеклист изменён",
    };
  }

  async delete(title) {
    return ChecklistModel.deleteOne({ user: req.userId, title });
  }
}

export default new ChecklistService();
