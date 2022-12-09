import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from "./SignupForm"
import sinon from "sinon"

test('should render without crashing', () => {
    render(<SignupForm />);
});

test('should put values into input', async () => {
    render(<SignupForm />);
    const user = userEvent.setup()
    const userNameInput = screen.getByTestId("Username")
    const passwordInput = screen.getByTestId("Password")
    
    await user.type(userNameInput, 'test')
    await user.type(passwordInput, 'test')

    expect(userNameInput).toHaveDisplayValue('test')
    expect(userNameInput).toHaveDisplayValue('test')
})

test('should trigger submit event', async () => {
    render(<SignupForm />);
    const user = userEvent.setup()
    const sendButton = screen.queryByTestId("submit")
    const signUpConfirmation = screen.queryByTestId("signedup")

    await user.click(sendButton)

    expect(signUpConfirmation).toBeTruthy()
});


test('should receive values from inputs', async () => {
    render(<SignupForm />);
    const user = userEvent.setup()
    const fetchedUserName = screen.getByTestId("TestUserName")
    const fetchedPassword = screen.getByTestId("TestPassword")
    const sendButton = screen.queryByTestId("submit")

    await user.type(fetchedUserName, 'test')
    await user.type(fetchedPassword, 'test')

    await user.click(sendButton)

    expect(fetchedUserName).toHaveDisplayValue('test')
    expect(fetchedUserName).toHaveDisplayValue('test')
})

