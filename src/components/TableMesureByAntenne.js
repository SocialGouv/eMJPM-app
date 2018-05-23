import styled from "styled-components";

import RowAntenne from "./RowAntenne";
import SearchButton from "./SearchButton";

const antenne0 = {
	etablissement: "CentreMartin",
	disponibilite: "40",
	dispo_max: "60"
};
const antenne1 = {
	etablissement: "CentreMartin",
	disponibilite: "55",
	dispo_max: "60"
};
const antenne2 = {
	etablissement: "CentreMartin",
	disponibilite: "65",
	dispo_max: "60"
};

const TableMesureByAntenne = () => {
	return (
		<div style={{ height: "auto", width: "auto" }}>
			<table className="table">
				<thead style={{ fontWeight: "16px" }}>
					<tr>
						<th scope="col" style={{ textAlign: "left" }}>
							Antenne
						</th>
						<th scope="col" style={{ textAlign: "left" }}>
							Mesures en cours
						</th>
						<th scope="col" style={{ textAlign: "center" }}>
							Modifier
						</th>
					</tr>
				</thead>
				<tbody>
					<RowAntenne antenne={antenne0} />
					<RowAntenne antenne={antenne1} />
					<RowAntenne antenne={antenne2} />
				</tbody>
			</table>
		</div>
	);
};

export default TableMesureByAntenne;
