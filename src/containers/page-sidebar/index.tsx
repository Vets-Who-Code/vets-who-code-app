import SidebarMenu from "@components/menu/sidebar-menu";
import RecentCoursesWidget from "@widgets/recent-courses-widget";
import menu from "@data/sidebar-menu";
import { ICourse } from "@utils/types";

type TProps = {
    recentCourses: ICourse[];
};

const PageSidebar = ({ recentCourses }: TProps) => {
    return (
        <>
            <SidebarMenu menu={menu} className="tw-mb-[45px]" />
            <RecentCoursesWidget recentCourses={recentCourses} />
        </>
    );
};

export default PageSidebar;
