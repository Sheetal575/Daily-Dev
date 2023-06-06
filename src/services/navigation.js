import { BookMark } from "../icons/bookmark";
import { FeedBackIcon } from "../icons/feedback";
import { Link } from "../icons/link";
import { People } from "../icons/people";
import { Popular } from "../icons/popular";
import Search from "../icons/search";
import { UpVote } from "../icons/upvote";

export const NavigationService = [
  {
    id: 2,
    title: "Search",
    url: "/search",
    icon: <Search color="#ffff" size={19} strokeWidth={1.7} />,
  },
  {
    id: 1,
    title: "Popular",
    url: "/popular",
    icon: <Popular color="#ffff" size={18} strokeWidth={0} />,
  },
  {
    id: 3,
    title: "Bookmark",
    url: "/bookmark",
    icon: <BookMark color="#fff" size={22} fill="none" strokeWidth={1.7} />,
  },
  {
    id: 1,
    title: "Most Upvoted",
    url: "/most-upvoted",
    icon: <UpVote fill="none" color="#ffff" size={18} strokeWidth={1.7} />,
  },
  {
    id: 0,
    title: "Suggest New Source",
    url: "suggest-new-source",
    showModal: true,
    icon: <Link color="#ffff" size={22} strokeWidth={1.7} />,
  },

  {
    id: 4,
    title: "Feedback",
    url: "/feedback",
    icon: <FeedBackIcon color="#fff" size={18} strokeWidth={1.7} />,
  },
  {
    id: 4,
    title: "Invite People",
    url: "invite-people",
    icon: <People color="#ffff" size={18} strokeWidth={0} />,
  },
];
