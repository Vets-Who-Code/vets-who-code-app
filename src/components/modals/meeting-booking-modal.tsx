import { useState } from "react";
import dayjs from "dayjs";
import { Modal, ModalBody } from "@ui/modal";
import Input from "@ui/form-elements/input";
import Button from "@ui/button";
import { ImageType } from "@utils/types";

type TProps = {
    show: boolean;
    onClose: () => void;
    date: string;
    title: string;
    thumbnail: ImageType;
    remain_slot: number;
};

const MeetingBookingModal = ({
    show,
    onClose,
    date,
    title,
    thumbnail,
    remain_slot,
}: TProps) => {
    const [booked, setBooked] = useState(false);
    return (
        <Modal show={show} onClose={onClose}>
            <ModalBody className="tw-text-center tw-pt-8 tw-pb-10 tw-px-7.5">
                <p className="tw-font-medium tw-uppercase -tw-tracking-tightest tw-mb-1.5 tw-text-primary">
                    {dayjs(date).format("MMMM DD")}
                </p>
                <h3 className="tw-text-xl tw-mb-7">{title}</h3>
                <div className="tw-mb-7.5">
                    {thumbnail?.src && (
                        <img
                            src={thumbnail.src}
                            alt={thumbnail?.alt || title}
                            width="410"
                            className="tw-rounded"
                        />
                    )}
                </div>
                {booked ? (
                    <h4>You have booked this event</h4>
                ) : (
                    <form>
                        <div className="tw-flex tw-items-center tw-justify-start">
                            <label
                                htmlFor="event-count"
                                className="tw-mr-5 tw-text-heading tw-text-md tw-font-bold"
                            >
                                Quantity
                            </label>
                            <Input
                                id="event-count"
                                name="event-count"
                                type="number"
                                min="1"
                                max={remain_slot.toString()}
                                className="tw-min-h-[48px] tw-max-w-[110px]"
                            />
                        </div>
                        <Button
                            fullwidth
                            className="tw-mt-7.5"
                            onClick={() => setBooked(true)}
                        >
                            Book Now
                        </Button>
                    </form>
                )}
            </ModalBody>
        </Modal>
    );
};

export default MeetingBookingModal;
