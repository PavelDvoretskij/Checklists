import checklistService from "../service/checklist-service.js";

class ChecklistController {
  async getMyChecklists(req, res, next) {
    const { numberChecklistsPerPage } = req.query;
    const { num } = req.params;
    try {
      const checklists = await checklistService.getMyChecklists(
        num,
        numberChecklistsPerPage,
      );
      res.json(checklists);
    } catch (error) {
      next(error);
    }
  }

  async getChecklists(req, res, next) {
    try {
      const { numberChecklistsPerPage } = req.query;
      const { num } = req.params;
      const checklists = await checklistService.getChecklists(
        num,
        numberChecklistsPerPage,
      );
      res.json(checklists);
    } catch (error) {
      next(error);
    }
  }

  async getOneChecklist(req, res, next) {
    try {
      const { user, title } = req.params;
      const checklists = await checklistService.getOneChecklist(user, title);
      res.json(checklists);
    } catch (error) {
      next(error);
    }
  }

  async getCount(req, res, next) {
    const { namePage } = req.query;
    try {
      const count = await checklistService.getCount(namePage);
      res.json(count);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {
        titleValue: title,
        descValue: desc,
        point: note,
        updateChecklist,
        general,
      } = req.body;

      const checklist = await checklistService.create(
        title,
        desc,
        note,
        updateChecklist,
        general,
      );

      res.json(checklist);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const {
        updateChecklist: title,
        titleValue: newTitle,
        descValue: desc,
        point: note,
        general,
      } = req.body;
      const checklist = await checklistService.update(
        title,
        newTitle,
        desc,
        note,
        general,
      );
      res.json(checklist);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { title } = req.body;
      const checklist = await checklistService.delete(title);
      res.json(checklist);
    } catch (error) {
      next(error);
    }
  }
}

export default new ChecklistController();
