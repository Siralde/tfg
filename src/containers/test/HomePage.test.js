import React from "react";
import { render, fireEvent } from '@testing-library/react'

import { HomePage } from "../HomePage";
import { RoundDetailsPage } from "../RoundDetailsPage";

test("allows user to consult campaign details", () => {
	const { getByText, getByLabelText } = render(<HomePage/>);
	const goToCampaign = getByLabelText("Ver Detalles");
	const campaignDetails = fireEvent.click(goToCampaign);
	expect(campaignDetails.toBe(RoundDetailsPage))
}