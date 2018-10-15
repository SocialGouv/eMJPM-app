import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";

const cabinet = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"];
const schema = {
  type: "object",
  required: ["username", "pass1", "pass2", "email"],
  properties: {
    username: { type: "string", title: "Identifiant", default: "" },
    pass1: { type: "string", title: "Mot de passe", minLength: 10 },
    pass2: { type: "string", title: "Verifier le Mot de passe", minLength: 10 },
    email: { type: "string", title: "Adresse email", default: "" },
    cabinet: { type: "string", title: "Cabinet (pour Paris)", default: "", enum: cabinet }
  }
};

const InscriptionTis = props => (
  <FormMandataire schema={schema} uiSchema={uiSchema} {...props} />
);

export default InscriptionTis;

