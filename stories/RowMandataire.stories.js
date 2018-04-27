import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

const mandataire = {
  ville: "MartinVille",
  type: "Martin",
  etablissement: "CentreMartin",
  disponibilite: "40",
  referent: "Martin Martin",
  code_postal: "00000",
  dispo_max: "60"
};

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

const Cell = ({ style, title, children }) => (
  <td
    className="pagination-centered"
    style={{ fontSize: "1em", textAlign: "left", verticalAlign: "middle", ...style }}
    title={title}
  >
    {children}
  </td>
);

const PillDispo = ({ dispo, dispo_max }) => (
  <Pill
    style={{
      background: getColorFromDisponibilite(dispo_max - dispo)
    }}
  >
    {dispo} / {dispo_max}
  </Pill>
);

const Pill = styled.div`
  font-size: 18px;
  width: 130px;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  text-align: center;
  color: white;
`;

const Circle = styled.div`
  line-height: 45px;
  font-size: 1em;
  height: 45px;
  width: 45px;
  text-align: center;
  color: white;
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
`;

const RowMandataire = ({ mandataire, showDetails, onClick }) => {
  const {
    ville,
    type,
    etablissement,
    disponibilite,
    referent,
    code_postal,
    dispo_max
  } = mandataire;

  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <Cell style={{ width: "45px" }}>
        <Circle style={{ backgroundColor: getColorFromDisponibilite(dispo_max - disponibilite) }}>
          {" "}
          {type.toUpperCase().substr(0, 1)}
        </Circle>
      </Cell>

      <Cell style={{ width: "250px", verticalAlign: "middle" }}>
        <b>
          {referent} - {etablissement}
        </b>
        <br /> <div style={{ color: "#808080" }}>{type.toUpperCase()} </div>
      </Cell>

      {showDetails && (
        <Cell style={{ width: "150px" }}>
          <b>
            {code_postal} - {ville}
          </b>
        </Cell>
      )}
      <td style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "center" }}>
        <PillDispo dispo={disponibilite} dispo_max={dispo_max} />
      </td>
    </tr>
  );
};

storiesOf("RowMandataire", module).add("RowMandataire", () => (
  <div>
    <RowMandataire showDetails mandataire={mandataire} />
    <RowMandataire mandataire={mandataire} />
  </div>
));
