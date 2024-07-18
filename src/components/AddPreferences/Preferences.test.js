import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import AddPreference from './AddPreference';


describe('AddPreference Component', () => {
  let {getByLabelText, getByText, getByRole}=screen;

  beforeEach(() => {
    const component = render(<AddPreference />);
    getByLabelText = component.getByLabelText;
    getByText = component.getByText;
    getByRole = component.getByRole;
  });

  test('renders form with all fields', () => {
    expect(getByLabelText(/Profile Created For/i)).toBeInTheDocument();
    expect(getByLabelText(/Min Age/i)).toBeInTheDocument();
    expect(getByLabelText(/Max age/i)).toBeInTheDocument();
    expect(getByLabelText(/Max Height/i)).toBeInTheDocument();
    expect(getByLabelText(/Min Height/i)).toBeInTheDocument();
    expect(getByLabelText(/Mother Tongue/i)).toBeInTheDocument();
    expect(getByLabelText(/Religion/i)).toBeInTheDocument();
    expect(getByLabelText(/Caste/i)).toBeInTheDocument();
    expect(getByLabelText(/Star/i)).toBeInTheDocument();
    expect(getByLabelText(/Dosham/i)).toBeInTheDocument();
    expect(getByLabelText(/Education/i)).toBeInTheDocument();
    expect(getByLabelText(/Occupation/i)).toBeInTheDocument();
    expect(getByLabelText(/Employment Type/i)).toBeInTheDocument();
    expect(getByLabelText(/Annual Income/i)).toBeInTheDocument();
    expect(getByLabelText(/City/i)).toBeInTheDocument();
    expect(getByLabelText(/State/i)).toBeInTheDocument();
    expect(getByLabelText(/Country/i)).toBeInTheDocument();
    expect(getByLabelText(/Marital Status/i)).toBeInTheDocument();
    expect(getByLabelText(/Disability/i)).toBeInTheDocument();
    expect(getByLabelText(/Drinking Habits/i)).toBeInTheDocument();
    expect(getByLabelText(/Smoking Habits/i)).toBeInTheDocument();
  });

  test('shows validation messages on blur', () => {
    fireEvent.blur(getByLabelText(/Profile Created For/i));
    expect(getByText(/Profile is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Min Age/i));
    expect(getByText(/minage is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Max age/i));
    expect(getByText(/maxage is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Max Height/i));
    expect(getByText(/maxHight is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Min Height/i));
    expect(getByText(/minHight is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Mother Tongue/i));
    expect(getByText(/motherTongue is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Religion/i));
    expect(getByText(/religion is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Caste/i));
    expect(getByText(/caste is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Star/i));
    expect(getByText(/star is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Dosham/i));
    expect(getByText(/dhosam is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Education/i));
    expect(getByText(/education is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Occupation/i));
    expect(getByText(/occupation is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Employment Type/i));
    expect(getByText(/employment is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Annual Income/i));
    expect(getByText(/annualIncome is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/City/i));
    expect(getByText(/city is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/State/i));
    expect(getByText(/state is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Country/i));
    expect(getByText(/country is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Marital Status/i));
    expect(getByText(/maritalStatus is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Disability/i));
    expect(getByText(/disability is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Drinking Habits/i));
    expect(getByText(/drinkingHabits is required/i)).toBeInTheDocument();

    fireEvent.blur(getByLabelText(/Smoking Habits/i));
    expect(getByText(/smokingHabits is required/i)).toBeInTheDocument();
  });

  test('handles field changes correctly', () => {
    fireEvent.change(getByLabelText(/Profile Created For/i), { target: { value: 'option1' } });
    expect(getByLabelText(/Profile Created For/i).value).toBe('option1');

    fireEvent.change(getByLabelText(/Min Age/i), { target: { value: '25' } });
    expect(getByLabelText(/Min Age/i).value).toBe('25');

    fireEvent.change(getByLabelText(/Max age/i), { target: { value: '35' } });
    expect(getByLabelText(/Max age/i).value).toBe('35');

    fireEvent.change(getByLabelText(/Max Height/i), { target: { value: 'option1' } });
    expect(getByLabelText(/Max Height/i).value).toBe('option1');

    fireEvent.change(getByLabelText(/Min Height/i), { target: { value: 'option2' } });
    expect(getByLabelText(/Min Height/i).value).toBe('option2');

    fireEvent.change(getByLabelText(/Mother Tongue/i), { target: { value: 'option3' } });
    expect(getByLabelText(/Mother Tongue/i).value).toBe('option3');
  });

  test('handles form submission with valid data', () => {
    fireEvent.change(getByLabelText(/Profile Created For/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Min Age/i), { target: { value: '25' } });
    fireEvent.change(getByLabelText(/Max age/i), { target: { value: '35' } });
    fireEvent.change(getByLabelText(/Max Height/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Min Height/i), { target: { value: 'option2' } });
    fireEvent.change(getByLabelText(/Mother Tongue/i), { target: { value: 'option3' } });
    fireEvent.change(getByLabelText(/Religion/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Caste/i), { target: { value: 'someCaste' } });
    fireEvent.change(getByLabelText(/Star/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Dosham/i), { target: { value: 'option2' } });
    fireEvent.change(getByLabelText(/Education/i), { target: { value: 'option3' } });
    fireEvent.change(getByLabelText(/Occupation/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Employment Type/i), { target: { value: 'option2' } });
    fireEvent.change(getByLabelText(/Annual Income/i), { target: { value: 'option3' } });
    fireEvent.change(getByLabelText(/City/i), { target: { value: 'someCity' } });
    fireEvent.change(getByLabelText(/State/i), { target: { value: 'someState' } });
    fireEvent.change(getByLabelText(/Country/i), { target: { value: 'someCountry' } });
    fireEvent.change(getByLabelText(/Marital Status/i), { target: { value: 'option1' } });
    fireEvent.change(getByLabelText(/Disability/i), { target: { value: 'option2' } });
    fireEvent.change(getByLabelText(/Drinking Habits/i), { target: { value: 'option3' } });
    fireEvent.change(getByLabelText(/Smoking Habits/i), { target: { value: 'option1' } });

    fireEvent.submit(getByRole('button'));

    // expect(getByText(/Form submitted successfully/i)).toBeInTheDocument();
  });

  test('shows validation messages on submit with invalid data', () => {
    fireEvent.submit(getByRole('button'));

    expect(getByText(/Profile is required/i)).toBeInTheDocument();
  });
});
