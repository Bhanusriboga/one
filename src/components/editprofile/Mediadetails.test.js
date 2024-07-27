// __tests__/Media.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Media from '../path/to/Media'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

// Mock URL.createObjectURL
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'http://example.com/fake-url');
});

// Test initial rendering
test('renders Media component with initial elements', () => {
  render(<Media />);
  
  // Check if the heading text is rendered
  expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();

  // Check if the "add" button is rendered
  expect(screen.getByLabelText(/add/i)).toBeInTheDocument();
});

// Test adding and rendering media files
test('adds and renders media files when selected', () => {
  render(<Media />);

  // Create a mock file
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

  // Simulate file input
  const input = screen.getByLabelText(/add/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Check if the file is rendered as an image
  const img = screen.getByAltText(/Media 1/i);
  expect(img).toBeInTheDocument();
  expect(global.URL.createObjectURL).toHaveBeenCalledWith(file); // Ensure URL.createObjectURL is called with the correct file
});

// Test removing a media item
test('removes media file when the close button is clicked', () => {
  render(<Media />);

  // Create a mock file and add it to the component
  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
  const input = screen.getByLabelText(/add/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Check if the file is rendered
  const img = screen.getByAltText(/Media 1/i);
  expect(img).toBeInTheDocument();

  // Click the close button
  const closeButton = screen.getByText(/x/i);
  fireEvent.click(closeButton);

  // Verify that the image is removed
  expect(screen.queryByAltText(/Media 1/i)).not.toBeInTheDocument();
});

// Test initial media state is empty
test('initial media state is empty', () => {
  render(<Media />);
  
  // Check that no media items are rendered initially
  expect(screen.queryByAltText(/Media/i)).not.toBeInTheDocument();
});

// Test non-image file handling
test('does not render non-image files', () => {
  render(<Media />);

  // Create a mock file of non-image type
  const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

  // Simulate file input
  const input = screen.getByLabelText(/add/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Check that no image preview is rendered
  expect(screen.queryByAltText(/Media/i)).not.toBeInTheDocument();
});

// Test handling multiple files
test('adds and renders multiple media files when selected', () => {
  render(<Media />);

  // Create mock files
  const files = [
    new File(['dummy content'], 'image1.png', { type: 'image/png' }),
    new File(['dummy content'], 'image2.png', { type: 'image/png' })
  ];

  // Simulate file input
  const input = screen.getByLabelText(/add/i);
  fireEvent.change(input, { target: { files } });

  // Check if both files are rendered as images
  files.forEach((file, index) => {
    const img = screen.getByAltText(`Media ${index + 1}`);
    expect(img).toBeInTheDocument();
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
  });
});

// Test handling no files
test('does not render any media if no files are selected', () => {
  render(<Media />);

  // Check that no media items are rendered
  expect(screen.queryByAltText(/Media/i)).not.toBeInTheDocument();
});
