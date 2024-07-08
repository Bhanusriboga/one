## Example to do API call

```javascript
import networkCall from './networkCall';

const fetchData = async () => {
  const result = await networkCall('your-endpoint', 'GET');
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

