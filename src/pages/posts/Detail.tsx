import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalGetMutation } from "../../services/useGlobalMutation";
import { useEffect, useState } from "react";

interface PostType {
  id: number;
  uuid: string;
  title: string;
  content: any;
  postedAt: Date;
  postedBy: string;
  tags: Object[];
}

const Detail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<PostType>();
  const navigate = useNavigate()

  const { mutateAsync: fetchPost } = useGlobalGetMutation(`/posts/${id}`, {
    onSuccess: (res: any) => {
      if (res.statusCode == 200) {
        setPostData(res.data);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  useEffect(() => {
    fetchPost({});
  }, []);

  return (
    <div className="p-8 h-screen pt-20 flex flex-col gap-3">
      <div className="w-8 cursor-pointer bg-blue-500 rounded-[50%]" onClick={() => navigate(-1)}>
        <svg className="p-1 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path fill="#ffffff" d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </svg>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-2xl">{postData?.title}</h1>
          <div className="flex gap-2">
            {postData?.tags?.map((item: any, index: number) => (
              <span
                key={index}
                className="bg-blue-200 px-3 py-0.5 rounded-xl font-semibold"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end text-sm">
          <p>
            โพสเมื่อวันที่ {dayjs(postData?.postedAt).format("DD/MM/YY HH:mm")}{" "}
            น.
          </p>
          <p>โดย {postData?.postedBy}</p>
        </div>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postData?.content }}
      />
    </div>
  );
};

export default Detail;
