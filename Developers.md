## Example to do API call

```javascript
import networkCall from './networkCall';
import { endPoints } from './config/config';

const fetchData = async () => {
  const result = await networkCall(endPoints.auth, 'GET');//end points are need to take from config file if not exist then mention and take those
  if (result.error) {
    console.error(result.error);
  } else {
    console.log(result.response);
  }
};
```

## Usage Guidelines for Developers

### Validation Functions

Developers are encouraged to use the following validation functions provided in `validation.js` for consistent data validation:

- **Email Validation**: `validateEmail(email)`
- **Password Validation**: `validatePassword(password)`
- **Phone Number Validation**: `validatePhoneNumber(phoneNumber)`

These functions ensure standard validation criteria are met for email addresses, passwords, and phone numbers.

### Local Storage Security

For storing and retrieving sensitive data securely, developers should utilize the functions in `Storage.js`:

- **Save to Local Storage**: `saveToLocalStorage(key, value)`
- **Retrieve from Local Storage**: `getFromLocalStorage(key)`
- **Remove from Local Storage**: `removeFromLocalStorage(key)`

It's recommended to avoid implementing custom encryption or decryption methods and rely on the provided secure storage functions for data safety.

Please adhere to these guidelines to maintain consistency and security across the application.

## Using Constants Instead of Direct Text

To ensure consistency and maintainability, developers are required to use constants instead of direct text in the project. Follow these steps:

1. **Create Constants File**: 
   - Create a new file under the `utils` folder, named `constants.js`.

2. **Define Constants**:
   - Define all text constants in the `constants.js` file as follows:

     ```javascript
     // utils/constants.js
     export const messages = {
         greeting: "Hello, World!",
         error: "An error occurred.",
         // Add more constants as needed
     };
     ```

3. **Import Constants**:
   - In any file where text is needed, import the constants from `constants.js`:

     ```javascript
     // Example usage in your files
     import { messages } from './utils/constants.js';

     console.log(messages.greeting); // Outputs: Hello, World!
     console.error(messages.error); // Outputs: An error occurred.
     ```

4. **Usage**:
   - Replace direct text with the corresponding constant from `constants.js` throughout the codebase.

5. **Benefits**:
   - **Consistency**: Ensures consistent messaging.
   - **Maintainability**: Facilitates easier updates and maintenance.
   - **Scalability**: Supports scalability by centralizing text content.

Integrate these practices into your development workflow to improve code quality and readability.