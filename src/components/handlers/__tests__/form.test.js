import React from 'react';
import { render, screen, debug} from '@testing-library/react';
import Form from '../../Form';
import userEvent from '@testing-library/user-event';

describe('Test related to the form component',()=>{
    test('A form component must have a input and label elements for the following: title, user ID and body when rendring on screen', ()=>{
        render(<Form />);

        const titleLabel = screen.getByText('Title');
        const userIdLabel = screen.getByText('User Id');
        const bodyLabel = screen.getByText('Body');

        /* Note:  '.getByTestId' allows us to test an element on the screen whcih has a 'data-testid' attribute */
        const titleInputElement = screen.getByTestId('title');
        const userIdInputElement = screen.getByTestId('userId');
        const bodyInputElement = screen.getByTestId('body');

        /* Assertions: we expect all these variables to be rendered on the screen */
        expect(titleLabel).toBeInTheDocument();
        expect(userIdLabel).toBeInTheDocument();
        expect(bodyLabel).toBeInTheDocument();

        expect(titleInputElement).toBeInTheDocument();
        expect(userIdInputElement).toBeInTheDocument();
        expect(bodyInputElement).toBeInTheDocument();
    });

    test('Entering a title that has a length of under 5 characters displays an error message', ()=>{
        render(<Form />);

        /* User inputs an invalid title */
        const titleInputElement = screen.getByTestId('title');
        const invalidInputValue = '1234'; // length < 5
        userEvent.type(titleInputElement, invalidInputValue);

        /* User submits the form */ 
        const submitButtonElement = screen.getByTestId('Submit');
        userEvent.click(submitButtonElement);

        /* Title error message is displayed*/
        const titleInputErrorMessage = screen.getByText("Invalid: Title must be between 5 and 100 characters long");
        expect(titleInputErrorMessage).toBeInTheDocument();
    });

    test('Not entering a userId dislays an error message',()=>{
        render(<Form />);

        /* User inputs a valid title */
        const inputElement = screen.getByTestId('title');
        const titleValue = '12345';
        userEvent.type(inputElement, titleValue);
        
        /* User does NOT enter any values for userId  and submits the form */
        const submitButtonElement = screen.getByTestId('Submit');
        userEvent.click(submitButtonElement);

        /* userId error message is displayed */
        const userIdError = screen.getByText("Invalid: Post must contain a User ID");
        expect(userIdError).toBeInTheDocument();
    });

    test('Not entering any body displays en error message',()=>{
        /* Render the Form component */
        render(<Form />);

        /* User enter a valid title and a user id */
        const titleInputElement = screen.getByTestId('title');
        const userIdInputElement = screen.getByTestId('userId');
        const titleValue = '12345';
        const userIdValue = '1';

        userEvent.type(titleInputElement, titleValue);
        userEvent.type(userIdInputElement, userIdValue);

        /* User does NOT enter any body value & submits the form */
        const submitButtonElement = screen.getByTestId('Submit');
        userEvent.click(submitButtonElement);

        /* Error message is displayed */
        const bodyError = screen.getByText("Invalid: Post must contain a Body");
        expect(bodyError).toBeInTheDocument();
    });

    test('Entering valid inputs for each field does not display an error', ()=>{
        render(<Form />);
        
        /* User inputs all input fields with valid values and submits the form */
        const titleInputElement = screen.getByTestId('title');
        const userIdInputElement = screen.getByTestId('userId');
        const bodyInputElement = screen.getByTestId('body');
        
        userEvent.type(titleInputElement, '12345');
        userEvent.type(userIdInputElement, '1');
        userEvent.type(bodyInputElement, 'Hello World!');
        
        const submitButtonElement = screen.getByTestId('Submit');
        userEvent.click(submitButtonElement);

        /* No error messages are displayed.
         * In abscence, use '.queryByText' returns null while '.getByText' returns an error if the element is not found */
        const titleInputErrorMessage = screen.queryByText("Invalid: Title must be between 5 and 100 characters long");
        const userIdError = screen.queryByText("Invalid: Post must contain a User ID");
        const bodyError = screen.queryByText("Invalid: Post must contain a Body");

        expect(titleInputErrorMessage).not.toBeInTheDocument();
        expect(userIdError).not.toBeInTheDocument();
        expect(bodyError).not.toBeInTheDocument();
    });

});

