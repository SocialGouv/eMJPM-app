import styled from "styled-components";

import SearchButton from "./SearchButton";

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

const RowAntenne = ({ antenne }) => {
  const { etablissement, disponibilite, dispo_max } = antenne;

  return (
    <tr style={{ background: "white" }}>
      <Cell style={{ width: "33%", verticalAlign: "middle" }}>
        <b>{etablissement}</b>
      </Cell>
      <td
        style={{
          fontSize: "0.8em",
          verticalAlign: "middle",
          textAlign: "center"
        }}
      >
        <PillDispo style={{ textAlign: "center" }} dispo={disponibilite} dispo_max={dispo_max} />
      </td>
      <td
        style={{
          width: "33%",
          fontSize: "0.8em",
          verticalAlign: "middle",
          textAlign: "center"
        }}
      >
        <SearchButton
          align="center"
          type="submit"
          style={{ width: "33%", height: "30px", marginTop: "5px" }}
        >
          Modifier
        </SearchButton>
      </td>
    </tr>
  );
};

export default RowAntenne;
