import FormMandataire from "./FormMandataire";
import uiSchema from "./uiSchema.json";
import { Autocomplete } from "..";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";

const schema = {
  type: "object",
  required: [
    "username",
    "pass1",
    "pass2",
    "nom",
    "prenom",
    "telephone",
    "email",
    "adresse",
    "code_postal",
    "ville"
  ],
  properties: {
    username: {
      type: "string",
      default: ""
    },
    pass1: { type: "string" },
    pass2: { type: "string" },
    nom: { type: "string", default: "" },
    prenom: { type: "string", default: "" },
    genre: {
      type: "string",
      title: "Genre",
      enum: ["F", "H"],
      enumNames: ["Femme", "Homme"]
    },
    telephone: { type: "string", default: "" },
    telephone_portable: { type: "string", default: "" },
    email: { type: "string", default: "" },
    adresse: { type: "string", default: "" },
    code_postal: { type: "integer" },
    ville: { type: "string", default: "" },
    dispo_max: { type: "integer", default: 0 }
  }
};

const TisOfMandataireAutoComplete = ({ items, value, onChange }) => (
  <Autocomplete
    items={["75800", "76000"]}
    inputProps={{
      style: { width: 300 },
      placeholder: "Choisissez un tis ou vous êtes agrée"
    }}
    resetOnSelect={false}
    value={value}
    onSelect={obj => onChange(obj.id)}
    labelKey={"etablissement"}
  />
);

const TisOfMandataireAutoCompleteRedux = connect(state => ({
  items: state.mandataire.tis
}))(TisOfMandataireAutoComplete);

const widgets = {
  TisOfMandataireAutoComplete: TisOfMandataireAutoCompleteRedux
};

const InscriptionIndividuel = props => (
  <FormMandataire schema={schema} uiSchema={uiSchema} widgets={widgets} {...props} />
);

export default InscriptionIndividuel;
