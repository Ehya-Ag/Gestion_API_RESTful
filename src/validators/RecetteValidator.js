import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import RecetteService from "../models/RecetteModel.js";

const addRequestValidator = [
  check("titre")
    .not()
    .isEmpty()
    .withMessage("Titre est obligatoire!")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("Le titre doit comporter entre 5 et 100 caractères.")
    .bail()
    .custom(async (value) => {
      const result = await RecetteService.checkRecipe(value);
      if (result !== 0) {
        throw new Error("Cette recette existe déjà!");
      }
      return true;
    }),

  check("ingredients")
    .not()
    .isEmpty()
    .withMessage("Les ingrédients sont obligatoires!")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage("Les ingrédients doivent comporter entre 10 et 500 caractères."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const deleteRequestValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id est obligatoire!")
    .bail()
    .custom(async (value) => {
      const result = await RecetteService.getRecipeById(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export { addRequestValidator, deleteRequestValidator };
