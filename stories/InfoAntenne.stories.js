import React from "react";
import styled from "styled-components";
import InfoAntenne from "../src/components/InfoAntenne";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

storiesOf("InfoAntenne", module).add("InfoAntenne", () => <InfoAntenne />);
