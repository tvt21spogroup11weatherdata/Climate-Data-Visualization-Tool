
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserAccount from "./UserAccount"

test('should trigger submit event', async () => {
    render(<UserAccount />);
    const user = userEvent.setup()

    const sendButton = screen.queryByTestId("submit")
    const deleteConfirmation = screen.queryByTestId("deleted")

    await user.click(sendButton)

    expect(deleteConfirmation).toHaveDisplayValue("deleted")
});
