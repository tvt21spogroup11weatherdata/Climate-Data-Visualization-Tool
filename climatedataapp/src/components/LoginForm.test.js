import "@testing-library/jest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from "./LoginForm"
import sinon from "sinon"

test('should render without crashing', () => {
    render(<LoginForm />);
});

test('should put values into input', async () => {
    render(<LoginForm />);
    const user = userEvent.setup()
    const userNameInput = screen.getByTestId("Username")
    const passwordInput = screen.getByTestId("Password")
    
    await user.type(userNameInput, 'test')
    await user.type(passwordInput, 'test')

    expect(userNameInput).toHaveDisplayValue('test')
    expect(userNameInput).toHaveDisplayValue('test')
})

test('should trigger submit event', async () => {
    render(<LoginForm setUser={jest.fn()}/>);
    const user = userEvent.setup()
    const sendButton = screen.queryByTestId("submit")
    const loginConfirmation = screen.queryByTestId("loggedin")
    await user.click(sendButton)
    expect(loginConfirmation).toBeTruthy()
});

test('should receive values from inputs', async () => {
    render(<LoginForm />);
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



