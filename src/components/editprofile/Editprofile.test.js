import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Editprofile from './Editprofile';
import { EditProfile } from '../../utils/constants';
import { FaArrowLeft } from "react-icons/fa6";

jest.mock('./Basicdetails', () => () => <div>Basicdetails Component</div>);
jest.mock('./Personaldetails', () => () => <div>Personaldetails Component</div>);
jest.mock('./Professionaldetails', () => () => <div>Professionaldetails Component</div>);
jest.mock('./Mediadetails', () => () => <div>Mediadetails Component</div>);

jest.mock('../../utils/constants', () => ({
  EditProfile: {
    editprofile: 'Edit Profile',
    save: 'Save',
  },
}));

describe('Editprofile Component', () => {
  test('renders the Editprofile component', () => {
    render(<Editprofile />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Basicdetails Component')).toBeInTheDocument();
    expect(screen.getByText('Personaldetails Component')).toBeInTheDocument();
    expect(screen.getByText('Professionaldetails Component')).toBeInTheDocument();
    expect(screen.getByText('Mediadetails Component')).toBeInTheDocument();
  });

  test('renders the back arrow icon', () => {
    render(<Editprofile />);
    const backArrow = screen.getByRole('img', { name: /leftarrow/i });
    expect(backArrow).toBeInTheDocument();
  });

  test('renders the save button', () => {
    render(<Editprofile />);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  test('back arrow and save button are clickable', () => {
    render(<Editprofile />);
    const backArrow = screen.getByRole('img', { name: /leftarrow/i });
    fireEvent.click(backArrow);
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  });
});
