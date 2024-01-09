import Moment from "moment-timezone";
import { ArticleType } from "../types";

const Article = ({
  node: { nid, title, last_update, author_name, ImageStyle_thumbnail },
}: ArticleType) => {
  const formattedDate = Moment.unix(last_update)
    .tz("Asia/Kolkata")
    .format("MMM DD, YYYY hh:mm A zz");
  return (
    <div className="flex flex-wrap pb-4">
      <div className="w-full m-4 mb-0">
        <div className="bg-white p-4 shadow">
          <div className="flex flex-row">
            <img
              alt="article-img"
              src={ImageStyle_thumbnail}
              className="w-48 rounded-3xl"
            />
            <div className="flex-1 flex flex-col justify-between text-xl font-light ml-4">
              <p className="font-medium text-black">{title}</p>
              <p className="font-normal text-gray-600">- {author_name}</p>
              <p className="text-right uppercase text-sm text-gray-500 hover:text-black">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
