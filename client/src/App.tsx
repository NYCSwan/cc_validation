import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import './App.css';
import { VALIDATE_CREDIT_CARD } from './queries';

function App() {
  const [validateCreditCard, { error, client }] =
    useMutation(VALIDATE_CREDIT_CARD);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [isCardValid, setIsCardValid] = useState<boolean | undefined>(
    undefined,
  );

  const handleCardInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCreditCardNumber(event.target.value);
    if (creditCardNumber.length === 15) {
      console.log('creditCardNumber', creditCardNumber);
      const isValid = await validateCreditCard({
        variables: { creditCardNumber },
      });
      console.log(isValid, client);
      setIsCardValid(Boolean(isValid));
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('creditCardNumber', creditCardNumber);
    const isValid = await validateCreditCard({
      variables: { creditCardNumber },
    });
    console.log(isValid, client);
    setIsCardValid(Boolean(isValid));
  };

  return (
    <>
      <div>
        <h1>Credit Card Number Validation</h1>
        <div className="card">
          <input
            type="text"
            placeholder="Enter Card Number"
            minLength={15}
            maxLength={15}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleCardInputChange(event)
            }
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            check
          </button>
          {error && <p className="error">{error.message}</p>}
          {isCardValid && <p className="success">Card is valid!</p>}
          {isCardValid === false && (
            <p>Card is invalid. Please check for typos!</p>
          )}
          <p>Enter a number to see if it's a valid credit card number.</p>
        </div>
      </div>
    </>
  );
}

export default App;
