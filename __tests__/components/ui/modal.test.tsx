import { Modal, ModalBody, ModalClose, ModalHeader } from "@components/ui/modal";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("motion/react", () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    motion: {
        div: ({ children, ...rest }: React.ComponentProps<"div">) => (
            <div {...rest}>{children}</div>
        ),
    },
}));

const renderModal = (props: { labelledBy?: string; describedBy?: string; onClose: () => void }) =>
    render(
        <Modal show={true} {...props}>
            <ModalHeader>
                <h5 id="modal-title">Welcome to Vets Who Code</h5>
                <ModalClose onClose={props.onClose}>&times;</ModalClose>
            </ModalHeader>
            <ModalBody>
                <p id="modal-description">We help veterans transition into tech careers.</p>
            </ModalBody>
        </Modal>
    );

describe("Modal", () => {
    it("points aria-labelledby and aria-describedby at the ids it is given", async () => {
        renderModal({
            labelledBy: "modal-title",
            describedBy: "modal-description",
            onClose: vi.fn(),
        });

        const dialog = await screen.findByRole("dialog");

        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog.getAttribute("aria-labelledby")).toBe("modal-title");
        expect(dialog.getAttribute("aria-describedby")).toBe("modal-description");
    });

    it("omits the labelling attributes when no ids are passed", async () => {
        renderModal({ onClose: vi.fn() });

        const dialog = await screen.findByRole("dialog");

        expect(dialog.hasAttribute("aria-labelledby")).toBe(false);
        expect(dialog.hasAttribute("aria-describedby")).toBe(false);
    });

    it("exposes the close button by its accessible name", async () => {
        const onClose = vi.fn();
        renderModal({ onClose });

        await screen.findByRole("dialog");
        fireEvent.click(screen.getByRole("button", { name: "Close" }));

        expect(onClose).toHaveBeenCalled();
    });

    it("closes on Escape", async () => {
        const onClose = vi.fn();
        renderModal({ onClose });

        await screen.findByRole("dialog");
        fireEvent.keyDown(window, { key: "Escape" });

        expect(onClose).toHaveBeenCalled();
    });
});
