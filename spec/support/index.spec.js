import RecetteService from "../../src/models/RecetteModel.js";

describe("Recipe tests", () => {
  let recipeId = null;

  it("can be create", async () => {
    const recipe = { titre: "bon", type: "dessert", ingredients: "farime" };
    const result = await RecetteService.createRecette(
      recipe.titre,
      recipe.type,
      recipe.ingredients,
    );
    expect(result);
  });

  it("can be update", async () => {
    const recipe = { titre: "bah", type: "test", ingredients: "challenge" };
    const result = await RecetteService.updateRecette(
      1,
      recipe.titre,
      recipe.type,
      recipe.ingredients,
    );
    recipeId = result.insertId;
    const recipeCreated = await RecetteService.getRecetteById(1);
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
  });

  it("can not be create", async () => {
    try {
      const recipe = { titre: null, type: "dessert", ingredients: "farime" };
      const result = await RecetteService.createRecette(
        recipe.titre,
        recipe.type,
        recipe.ingredients,
      );
      recipeId = result.insertId;
      const recipeCreated = await RecetteService.getRecetteById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {}
  });

  it("Can get by Id recipes", async () => {
    const getId = await RecetteService.getRecetteById(1);
    expect(getId).not.toBeNull();
  });

  it("Can get all recipes", async () => {
    const getAll = await RecetteService.getAllRecettes();
    expect(getAll).not.toBeNull();
  });
  it("Can delete recipes", async () => {
    const deleted = await RecetteService.deleteRecette(25);
    expect(deleted).not.toBeNull();
  });
});
