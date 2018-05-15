import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import RowAntenne from "../src/components/RowAntenne";
import SearchButton from "../src/components/SearchButton";
import TableMesureByAntenne from "../src/components/TableMesureByAntenne";

storiesOf("TableMesureByAntenne", module).add("TableMesureByAntenne", () => (
	<TableMesureByAntenne />
));
