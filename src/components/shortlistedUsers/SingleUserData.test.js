import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SingleUserData from './SingleUserData';
import { users } from './Data';

// Mock data
const mockUser = {
  id: 1,
  name: 'John Doe',
  time_of_birth: '1990-01-01T12:00:00Z',
  religion: {
    religion_name: 'Hindu',
    caste: 'Brahmin',
    zodiac_sign: 'Capricorn'
  },
  mother_tongue: 'Hindi',
  language_proficiency: ['English', 'Spanish'],
  linkedin_id: 'john-doe',
  address: '123 Main St, Anytown, USA',
  citizenship: 'American',
  family_information: {
    family_status: 'Married',
    father_name: 'Father Doe',
    mother_name: 'Mother Doe',
    siblings: ['Sibling1', 'Sibling2']
  },
  personal_information: {
    complexion: 'Fair',
    body_type: 'Athletic',
    weight: '70kg',
    any_disability: 'None',
    height: '180cm',
    eating_habits: 'Vegetarian',
    drinking_habits: 'Occasionally',
    smoking_habits: 'Non-smoker',
    about_me: 'Passionate about technology and sports.'
  },
  professional_details: {
    highest_education: 'Masters',
    name_of_institute: 'XYZ University',
    year_of_passing: 2015,
    employ_status: 'Employed',
    employed_in: 'ABC Corp',
    occupation: 'Software Engineer',
    work_location: 'Remote',
    state: 'California',
    city: 'Los Angeles'
  }
};

// Mock `users` data
jest.mock('./Data', () => ({
  users: [mockUser]
}));

describe('SingleUserData Component', () => {
  test('renders user data correctly based on URL params', () => {
    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<SingleUserData />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Time of Birth: 1/1/1990, 12:00:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Religion: Hindu')).toBeInTheDocument();
    expect(screen.getByText('Caste: Brahmin')).toBeInTheDocument();
    expect(screen.getByText('Zodiac Sign: Capricorn')).toBeInTheDocument();
    expect(screen.getByText('Mother Tongue: Hindi')).toBeInTheDocument();
    expect(screen.getByText('Language Proficiency: English, Spanish')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn:')).toHaveAttribute('href', 'https://linkedin.com/in/john-doe');
    expect(screen.getByText('Address: 123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('Citizenship: American')).toBeInTheDocument();
    expect(screen.getByText('Family Status: Married')).toBeInTheDocument();
    expect(screen.getByText('Father Name: Father Doe')).toBeInTheDocument();
    expect(screen.getByText('Mother Name: Mother Doe')).toBeInTheDocument();
    expect(screen.getByText('Siblings: Sibling1, Sibling2')).toBeInTheDocument();
    expect(screen.getByText('Complexion: Fair')).toBeInTheDocument();
    expect(screen.getByText('Body Type: Athletic')).toBeInTheDocument();
    expect(screen.getByText('Weight: 70kg')).toBeInTheDocument();
    expect(screen.getByText('Any Disability: None')).toBeInTheDocument();
    expect(screen.getByText('Height: 180cm')).toBeInTheDocument();
    expect(screen.getByText('Eating Habits: Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Drinking Habits: Occasionally')).toBeInTheDocument();
    expect(screen.getByText('Smoking Habits: Non-smoker')).toBeInTheDocument();
    expect(screen.getByText('About Me: Passionate about technology and sports.')).toBeInTheDocument();
    expect(screen.getByText('Highest Education: Masters')).toBeInTheDocument();
    expect(screen.getByText('Name of Institute: XYZ University')).toBeInTheDocument();
    expect(screen.getByText('Year of Passing: 2015')).toBeInTheDocument();
    expect(screen.getByText('Employ Status: Employed')).toBeInTheDocument();
    expect(screen.getByText('Employed In: ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('Occupation: Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Work Location: Remote')).toBeInTheDocument();
    expect(screen.getByText('State: California')).toBeInTheDocument();
    expect(screen.getByText('City: Los Angeles')).toBeInTheDocument();
  });

  test('changes displayed image when image options are clicked', () => {
    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<SingleUserData />} />
        </Routes>
      </MemoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/dummy.jpg');

    const imageOptions = screen.getAllByRole('img');
    fireEvent.click(imageOptions[0]); // Click on the first image

    expect(image).toHaveAttribute('src', '/vite.svg');
    
    fireEvent.click(imageOptions[1]); // Click on the second image

    expect(image).toHaveAttribute('src', '/dummy.jpg');
  });
});
