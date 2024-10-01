import db from "../config/database.js";

class RecetteService {
  static async checkRecipe(titre) {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM recettes WHERE titre = ?', [titre]);
    return rows[0].count;
}
  static async getAllRecettes() {
    try {
      const [rows] = await db.query("SELECT * FROM recettes");
      return rows;
    } catch (error) {
      console.error("Error fetching all recipes:", error.message);
      throw error;
    }
  }
  static async getRecetteById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM recettes WHERE id = ?", [
        id,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching recipe by ID:", error.message);
      throw error;
    }
  }
  static async createRecette(titre, ingredients, type) {
    try {
      const [result] = await db.query(
        "INSERT INTO recettes (titre, ingredients, type) VALUES (?, ?, ?)",
        [titre, ingredients, type],
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating recipe:", error.message);
      throw error;
    }
  }
  static async updateRecette(id, titre, ingredients, type) {
    try {
      const [result] = await db.query(
        "UPDATE recettes SET titre = ?, ingredients = ?, type = ? WHERE id = ?",
        [titre, ingredients, type, id],
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating recipe:", error.message);
      throw error;
    }
  }
  static async deleteRecette(id) {
    try {
      const [result] = await db.query("DELETE FROM recettes WHERE id = ?", [
        id,
      ]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
      throw error;
    }
  }
}

export default RecetteService;
