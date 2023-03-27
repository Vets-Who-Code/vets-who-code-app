import Anchor from "@ui/anchor";
import { Modal, ModalHeader, ModalClose, ModalBody } from "@ui/modal";
import { useUser } from "@contexts/user-context";

type TProps = {
    show: boolean;
    onClose: () => void;
};

const EnrollModal = ({ show, onClose }: TProps) => {
    const { isLoggedIn } = useUser();
    return (
        <Modal show={show} onClose={onClose}>
            <ModalHeader>
                <h4 className="tw-mb-0">Course Enrolled</h4>
                <ModalClose onClose={onClose}>x</ModalClose>
            </ModalHeader>
            <ModalBody className="tw-p-14 tw-text-center">
                <i className="far fa-lock tw-text-8xl tw-text-primary tw-mb-7.5" />
                <h5>You have enrolled in this course.</h5>
                {!isLoggedIn && (
                    <p>
                        Please,{" "}
                        <Anchor
                            className="tw-text-primary"
                            path="/login-register"
                        >
                            log in
                        </Anchor>{" "}
                        to get access to free lesson
                    </p>
                )}
                {isLoggedIn && <p>Now, you can access the free lesson</p>}

                <p>
                    Thanks for being with us{" "}
                    <Anchor className="tw-text-primary" path="/courses/grid-01">
                        Browse More Course
                    </Anchor>
                </p>
            </ModalBody>
        </Modal>
    );
};

export default EnrollModal;
