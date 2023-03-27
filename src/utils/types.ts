export type IDType = string | number;

export interface ImageType {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    loading?: "lazy" | "eager";
}

export interface HeadingType {
    id: IDType;
    content: string;
}

export interface TextType {
    id: IDType;
    content: string;
}

export interface ButtonType {
    id: IDType;
    content: string;
    path?: string;
    icon?: string;
}

export interface SectionTitleType {
    title: string;
    subtitle?: string;
}

export interface AnchorType {
    id: IDType;
    path: string;
    content: string;
}

export interface VideoType {
    videoId: string;
}

export interface MottoType {
    text: string;
    path: string;
    pathText: string;
}

export interface ItemType {
    id: IDType;
    title: string;
    description: string;
    icon: string;
    path: string;
    pathText: string;
    suffix: string;
    counter: number;
    name: string;
    designation: string;
    rating: number;
    role: "admin" | "employee";
    headings: HeadingType[];
    texts: TextType[];
    images: ImageType[];
    motto: MottoType;
}

export interface SectionType {
    headings?: HeadingType[];
    texts?: TextType[];
    buttons?: ButtonType[];
    images?: ImageType[];
    anchors?: AnchorType[];
    section_title?: SectionTitleType;
    video?: VideoType;
    items?: ItemType[];
}

export type ListContentType = {
    text: string;
    type: "list" | "order-list";
    content: string[] | ListContentType[];
};

export interface IContent {
    id: IDType;
    text: string;
    type:
        | "text"
        | "heading"
        | "iframe"
        | "h3"
        | "h4"
        | "h5"
        | "list"
        | "order-list"
        | "blockquote";
    content:
        | string
        | { src: string; alt?: string }
        | string[]
        | ListContentType[];
}

export interface ReviewType {
    average: number;
    count: number;
    rating_details: {
        "5": number;
        "4": number;
        "3": number;
        "2": number;
        "1": number;
    };
    items: Array<{
        id: IDType;
        user: {
            name: string;
            avatar: ImageType;
        };
        rating: number;
        title: string;
        review: string;
    }>;
}

export interface ILesson {
    id: IDType;
    title: string;
    slug: string;
    path: string;
    chapter: IDType;
    type: "lesson" | "quiz";
    access: "free" | "paid";
    video?: string;
    duration?: string;
    content: string;
}

export interface IChapter {
    id: IDType;
    title: string;
    description: string;
    lessons: IDType[];
}

export interface ICurriculum extends Omit<IChapter, "lessons"> {
    lessons: ILesson[];
}

export interface ICourse {
    cc: string[];
    title: string;
    slug: string;
    path: string;
    published_at: string;
    category: string;
    thumbnail: ImageType;
    price: number;
    currency: string;
    total_lectures: number;
    total_students: number;
    language: string;
    instructor: IDType;
    duration: string;
    membership?: string[];
    isPopular?: boolean;
    excerpt?: string;
    description?: IContent[];
    reviews?: ReviewType;
    curriculum: IDType[];
}

export interface BlogMetaType {
    title: string;
    slug: string;
    path: string;
}

export interface IBlog {
    title: string;
    slug: string;
    path: string;
    postedAt: string;
    image: ImageType;
    category: BlogMetaType;
    tags: BlogMetaType[];
    views: number;
    author: IInstructor;
    content: string;
    excerpt: string;
}

export interface ISocial {
    label: string;
    icon: string;
    url: string;
}

export interface IInstructor {
    id: IDType;
    name: string;
    slug: string;
    path: string;
    url: string;
    image: ImageType;
    designation: string;
    bio: string;
    socials: ISocial[];
}

export type FieldType<T> = Array<keyof T> | "all";

export interface ILocation {
    venue: string;
    town: string;
    city: string;
    country: string;
    zip: string;
    latitude: number;
    longitude: number;
}

export interface ISpeaker {
    id: IDType;
    name: string;
    designation: string;
    image: ImageType;
}

export interface IEvent {
    title: string;
    slug: string;
    path: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    venue: string;
    location: ILocation;
    thumbnail: ImageType;
    total_slot: number;
    total_booked: number;
    price: number;
    currency: string;
    body: IContent[];
    speakers: ISpeaker[];
}

export interface IZoomMeeting {
    id: IDType;
    title: string;
    slug: string;
    path: string;
    host: string;
    thumbnail: ImageType;
    date: string;
    time: string;
    start_date: string;
    timezone: string;
    duration: number;
    category: string;
    meeting_id: string;
    links: string[];
    body: IContent[];
}

export type TSubMenu = {
    id: number;
    label: string;
    path: string;
    status?: string;
};

export type TMegaMenu = {
    id: number;
    title?: string;
    submenu?: TSubMenu[];
    banner?: {
        path: string;
        image: ImageType;
    };
};

export type TMenu = TSubMenu & {
    submenu?: TSubMenu[];
    megamenu?: TMegaMenu[];
};

export type TSection = {
    space?:
        | "top-bottom"
        | "top-bottom-2"
        | "top-bottom-3"
        | "top"
        | "top-2"
        | "bottom"
        | "bottom-2"
        | "bottom-3"
        | "none";
    bg?: string;
    titleSize?: "default" | "large";
    className?: string;
};
