import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import RecetteService from "../models/RecetteModel.js";

const addRequestValidator = [
    check("titre")
      .not()
      .isEmpty()
      .withMessage("Le titre est obligatoire!")
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
  
    check("type")
      .not()
      .isEmpty()
      .withMessage("Le type de recette est obligatoire!")
      .bail()
      .isIn(['entrée', 'plat', 'dessert'])
      .withMessage("Le type de recette doit être l'une des valeurs suivantes : entrée, plat, dessert."),
  
    (req, res, next) => {
      for (const key of ['titre', 'ingredients', 'type']) {
        if (req.body[key] === null) {
          return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: `${key.charAt(0).toUpperCase() + key.slice(1)} ne doit pas être null!` }] });
        }
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
      }
      next();
    },
];

const updateRequestValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("L'ID est obligatoire!")
    .bail()
    .custom(async (value) => {
      const result = await RecetteService.getRecetteById(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),

  check("titre")
    .not()
    .isEmpty()
    .withMessage("Le titre est obligatoire!")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("Le titre doit comporter entre 5 et 100 caractères.")
    .bail()
    .custom(async (value, { req }) => {
      const result = await RecetteService.getRecipeByTitle(value);
      if (result && result.id !== parseInt(req.params.id)) {
        throw new Error("Ce titre de recette existe déjà!");
      }
      return true;
    }),

  check("ingredients")
    .not()
    .isEmpty()
    .withMessage("Les ingrédients sont obligatoires!")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Les ingrédients doivent comporter entre 10 et 500 caractères.",
    ),

  check("type")
    .not()
    .isEmpty()
    .withMessage("Le type de recette est obligatoire!")
    .bail()
    .isIn(["entrée", "plat", "dessert"])
    .withMessage(
      "Le type de recette doit être l'une des valeurs suivantes : entrée, plat, dessert.",
    ),
  (req, res, next) => {
    for (const key of ["titre", "ingredients", "type"]) {
      if (req.body[key] === null) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({
            errors: [
              {
                msg: `${key.charAt(0).toUpperCase() + key.slice(1)} ne doit pas être null!`,
              },
            ],
          });
      }
    }

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
    .withMessage("L'ID est obligatoire!")
    .bail()
    .custom(async (value) => {
      const result = await RecetteService.getRecetteById(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

export { addRequestValidator, updateRequestValidator, deleteRequestValidator };
