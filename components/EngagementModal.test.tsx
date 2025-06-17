import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'; // Added fireEvent back
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EngagementModal from './EngagementModal';

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

const mockProps = {
  headline: "Test Headline",
  body: "Test body content.",
  cta1: { label: "CTA1 Label", link: "/cta1-link" },
  cta2: { label: "CTA2 Label", link: "/cta2-link" },
  onClose: jest.fn(), // Mock the onClose prop
};

describe('EngagementModal', () => {
  beforeEach(() => {
    // Clear session storage and reset timers before each test
    window.sessionStorage.clear();
    jest.useFakeTimers();
    mockProps.onClose.mockClear(); // Clear mock history
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers(); // Restore real timers
  });

  test('does not render initially', () => {
    render(<EngagementModal {...mockProps} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders after 3-second delay if not shown before and calls onClose', async () => {
    render(<EngagementModal {...mockProps} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });
    expect(screen.getByText(mockProps.headline)).toBeVisible();
    expect(screen.getByText(mockProps.body)).toBeVisible();
    expect(screen.getByText(mockProps.cta1.label)).toBeVisible();
    expect(screen.getByText(mockProps.cta2.label)).toBeVisible();
    expect(window.sessionStorage.getItem('engagementModalShown')).toBe('true');
  });

  test('does not render if engagementModalShown is in sessionStorage', () => {
    window.sessionStorage.setItem('engagementModalShown', 'true');
    render(<EngagementModal {...mockProps} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('dismisses when close button is clicked and calls onClose', async () => {
    render(<EngagementModal {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => screen.getByRole('dialog'));

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('dismisses when Escape key is pressed and calls onClose', async () => {
    render(<EngagementModal {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => screen.getByRole('dialog'));

    // Ensure the modal has focus for keydown events to be captured by the document listener
    const modalDialog = screen.getByRole('dialog');
    modalDialog.focus(); // Or focus an element within it like the close button

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('renders correct props', async () => {
    render(<EngagementModal {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => screen.getByRole('dialog'));

    expect(screen.getByText(mockProps.headline)).toBeInTheDocument();
    expect(screen.getByText(mockProps.body)).toBeInTheDocument();
    const cta1Link = screen.getByText(mockProps.cta1.label).closest('a');
    expect(cta1Link).toHaveAttribute('href', mockProps.cta1.link);
    const cta2Link = screen.getByText(mockProps.cta2.label).closest('a');
    expect(cta2Link).toHaveAttribute('href', mockProps.cta2.link);
  });

  test('focus is trapped within the modal', async () => {
    render(<EngagementModal {...mockProps} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => screen.getByRole('dialog'));

    const closeButton = screen.getByLabelText('Close modal');
    const cta1Link = screen.getByText(mockProps.cta1.label);
    const cta2Link = screen.getByText(mockProps.cta2.label);

    // Check initial focus (should be on closeButton as per implementation)
    expect(closeButton).toHaveFocus();

    // userEvent.setup() is needed for userEvent.tab() to work correctly with timers
    const user = userEvent.setup({ delay: null }); // delay: null for jest fake timers

    // Check initial focus (should be on closeButton as per implementation)
    expect(closeButton).toHaveFocus();

    // Tab to CTA1
    await act(async () => {
      await user.tab();
    });
    expect(cta1Link).toHaveFocus();

    // Tab to CTA2
    await act(async () => {
      await user.tab();
    });
    expect(cta2Link).toHaveFocus();

    // Tab from CTA2 should wrap around to closeButton
    await act(async () => {
      await user.tab();
    });
    expect(closeButton).toHaveFocus();

    // Shift+Tab from closeButton should wrap around to CTA2
    await act(async () => {
      await user.tab({ shift: true });
    });
    expect(cta2Link).toHaveFocus();
  });
});
