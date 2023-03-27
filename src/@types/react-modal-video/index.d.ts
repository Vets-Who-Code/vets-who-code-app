/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/naming-convention */
declare module "react-modal-video" {
    export default class ModalVideo extends React.Component<ModalProps, any> {}

    interface ModalProps {
        channel?: "youtube" | "vimeo" | "youku" | "custom";
        isOpen: boolean;
        youtube?: {
            autoplay?: 0 | 1;
            cc_load_policy?: 0 | 1;
            color?: null | string;
            controls?: 0 | 1;
            disablekb?: 0 | 1;
            enablejsapi?: 0 | 1;
            end?: null | string;
            fs?: 0 | 1;
            h1?: null | string;
            iv_load_policy?: 0 | 1;
            list?: null | string;
            listType?: null | string;
            loop?: 0 | 1;
            modestbranding?: null | string;
            origin?: null | string;
            playlist?: null | string;
            playsinline?: null | string;
            rel?: 0 | 1;
            showinfo?: 0 | 1;
            start?: 0;
            wmode?: "transparent";
            theme?: "light" | "dark";
            mute?: 0 | 1;
        };
        ratio?: string;
        vimeo?: {
            api: boolean;
            autopause: boolean;
            autoplay: boolean;
            byline: boolean;
            callback?: null | (() => void);
            color?: null | string;
            height?: null | string;
            loop?: boolean;
            maxheight?: null | string;
            maxwidth?: null | string;
            player_id?: null | string;
            portrait?: boolean;
            title?: boolean;
            width?: null | string;
            xhtml?: boolean;
        };
        youku?: {
            autoplay?: 0 | 1;
            show_related?: 0 | 1;
        };
        allowFullScreen?: boolean;
        animationSpeed?: number;
        classNames?: {
            modalVideoEffect?: string;
            modalVideo?: string;
            modalVideoClose?: string;
            modalVideoBody?: string;
            modalVideoInner?: string;
            modalVideoIframeWrap?: string;
            modalVideoCloseBtn?: string;
        };
        aria?: {
            openMessage?: string;
            dismissBtnMessage?: string;
        };
        videoId: string;
        onClose: () => void;
    }
}
