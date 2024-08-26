import $api from "../http";

export default class ChecklistService {
  static async getOneChecklist(user, title) {
    return $api.get(`/oneChecklists/${user}/${title}`);
  }

  static async getMyChecklists(indexChecklist, numberChecklistsPerPage) {
    return $api.get(`/myChecklists/${indexChecklist}`, {
      params: { numberChecklistsPerPage },
    });
  }

  static async getChecklists(indexChecklist, numberChecklistsPerPage) {
    return $api.get(`/checklists/${indexChecklist}`, {
      params: { numberChecklistsPerPage },
    });
  }

  static async getCount(namePage) {
    return $api.get("/getCount", { params: { namePage } });
  }

  static async create(data) {
    return $api.post("/create", { ...data });
  }

  static async update(data) {
    return $api.patch("/update", { ...data });
  }

  static async delete(title) {
    return $api.delete("/delete", {
      data: {
        title,
      },
    });
  }
}
