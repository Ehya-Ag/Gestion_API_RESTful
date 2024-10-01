import RecetteService from "../models/RecetteModel.js";
class RecetteController {
  static async getAllRecettes(req, res, next) {
    try {
      const recettes = await RecetteService.getAllRecettes();
      res.json(recettes);
    } catch (error) {
      next(error);
    }
  }

  static async getRecetteById(req, res, next) {
    const { id } = req.params;
    try {
      const recette = await RecetteService.getRecetteById(id);
      if (!recette) {
        return res.status(404).json({ message: "Recette non trouvée" });
      }
      res.json(recette);
    } catch (error) {
      next(error);
    }
  }

  static async createRecette(req, res, next) {
    console.log("bonjour");
    const { titre, ingredients, type } = req.body;
    try {
      const id = await RecetteService.createRecette(titre, ingredients, type);
      res.status(201).json({ id, titre, ingredients, type });
    } catch (error) {
      next(error);
    }
  }

  static async updateRecette(req, res, next) {
    const { id } = req.params;
    const { titre, ingredients, type } = req.body;
    try {
      const affectedRows = await RecetteService.updateRecette(
        id,
        titre,
        ingredients,
        type,
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Recette non trouvée" });
      }
      res.json({ message: "Recette mise à jour avec succès" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRecette(req, res, next) {
    const { id } = req.params;
    try {
      const affectedRows = await RecetteService.deleteRecette(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Recette non trouvée" });
      }
      res.json({ message: "Recette supprimée avec succès" });
    } catch (error) {
      next(error);
    }
  }
}
export default RecetteController;
