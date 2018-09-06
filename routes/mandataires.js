const express = require("express");

const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
  updateCountMesures,
  mesureEnAttente,
  update,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  getCoordonneByPosteCode
} = require("../db/queries/mandataires");

const { getTiByUserId } = require("../db/queries/tis");

// récupère les données d'un mandataire

/**
 * @swagger
 * security:
 *   - cookieAuth: []
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *   requestBodies:
 *     ActiveMandataireBody:
 *       description: A JSON object containing user active status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 required: true
 *   schemas:
 *     Mandataire:
 *       type: object
 *       properties:
 *         id:
 *           description: ID du mandataire
 *           type: integer
 *         type:
 *           description: Type de mandataire
 *           deprecated: true
 *           type: string
 *           enum:
 *             - preposes
 *             - individuels
 *             - services
 *         nom:
 *           description: Nom du mandataire
 *           type: string
 *         prenom:
 *           description: Prénom du mandataire
 *           type: string
 *         code_postal:
 *           description: Code postal du mandataire
 *           type: string
 *         created_at:
 *           description: Date de création du mandataire
 *           type: datetime
 *         last_login:
 *           description: Date de dernière connextion du mandataire
 *           type: datetime
 *
 *     SuccessResponse:
 *       description: conformation de succes
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           value: true
 *
 *     ActiveMandataireBody:
 *       description: changement etat du mandataire
 *       type: object
 *       properties:
 *         active:
 *           type: boolean
 *           value: true
 *
 * @swagger
 * /mandataires/1:
 *   get:
 *     description: get a mandataire
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: hash
 */
router.get("/1", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  res.status(200).json(mandataire);
});

const WHITELIST = [
  "nom",
  "prenom",
  "etablissement",
  "genre",
  "telephone",
  "telephone_portable",
  "email",
  "adresse",
  "code_postal",
  "ville",
  "dispo_max",
  "secretariat",
  "nb_secretariat",
  "mesures_en_cours"
];

const whiteList = obj =>
  Object.keys(obj)
    .filter(key => WHITELIST.indexOf(key) > -1)
    .reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

// met à jour les données d'un mandataire

/**
 * @swagger
 * /mandataire/1:
 *   put:
 *     description: update some user's data
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/ActiveMandataireBody'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.put("/1", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  const body = whiteList(req.body);

  if (Object.keys(body).length === 0) {
    res.status(200).json(mandataire);
    return next();
  }

  updateMandataire(mandataire.id, body)
    .then(() => getMandataireById(mandataire.id))
    .then(mandataire => {
      res.status(200).json(mandataire);
    })
    .catch(error => {
      console.log(error);
      throw error;
      next(error);
    });
});

// todo: test

/** @swagger
 * /mandataires/filters:
 *   post:
 *     description: post a new filters
 *     produces:
 *       - application/json
 *     requestBodies:
 *       description: A JSON object containing commentaire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latNorthEast:
 *                 type: float
 *                 required: true
 *               latSouthWest:
 *                 type: float
 *                 required: true
 *               longNorthEast:
 *                 type: float
 *                 required: true
 *               longSouthWest:
 *                 type: float
 *                 required: true
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllByMandatairesFilter(
    ti.id,
    req.body.latNorthEast,
    req.body.latSouthWest,
    req.body.longNorthEast,
    req.body.longSouthWest
  )
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      throw error;
      next(error);
    });
});

// récupère une liste de mandataires pour le user en question
// TODO : le user doit être un TI
// droits : ti lui-même
// récupère une liste de mandataires pour le user (ti) en question

/** @swagger
 * /mandataires :
 *   get:
 *     description: get all mandataires
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllMandataires(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

/** @swagger
 * /mandataires/services:
 *   get:
 *     description: get all services for a specific Ti
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/services", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllServicesByTis(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

// todo: test

router.post("/PosteCode", loginRequired, async (req, res, next) => {
  getCoordonneByPosteCode(req.body.codePoste)
    .then(function(mandataires) {
      res.status(200).json(mandataires);
    })
    .catch(function(error) {
      throw error;
      next(error);
    });
});

// ?
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : ?
//
// TODO : trigger pour MAJ + rename colonnes
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : user en cours

/** @swagger
 * /mandataires/1/capacite:
 *   put:
 *     description: update capacite of specific mandataire
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: Hash
 */
router.put("/:mandataireId/capacite", async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  updateCountMesures(mandataire.id).then(() => {
    res
      .status(200)
      .json(mandataire)
      .catch(error => next(error));
  });
});

/** @swagger
 * /mandataires/1/mesures-en-attente:
 *   put:
 *     description: update 'mesure en attente' from a mandataire
 *     produces:
 *       - application/json
 *     requestBodies:
 *       description: A JSON object containing mandataireId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mandataire_id:
 *                 type: integer
 *                 required: true
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: Hash
 */
router.put(
  "/:mandataireId/mesures-en-attente",
  loginRequired,
  async (req, res, next) => {
    // const mandataire = await queries.getMandataireByUserId(req.user.id);
    // if (!mandataire) {
    //   return next(new Error(401));
    // }
    // récupères le nb de mesure attribuées pour ce mandataire
    const MesureEnAttente = mesureEnAttente(req.body.mandataire_id);
    update(req.body.mandataire_id, { mesures_en_attente: MesureEnAttente })
      .then(mandataire => res.status(200).json(mandataire))
      .catch(error => next(error));
  }
);

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./mandatairesEtablissements"));
router.use("/", require("./tis"));

module.exports = router;
