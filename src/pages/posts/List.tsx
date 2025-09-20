import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, type PaginationProps } from "antd";
import { useGlobalGetMutation } from "../../services/useGlobalMutation";
import { Field, Form, Formik } from "formik";
import Select from "react-select";

const List = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any>([]);
  const [tagsList, setTagsList] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(10);

  const [selectTags, setSelectTags] = useState<any>([]);
  console.log(selectTags);
  const { mutateAsync: fetchPosts } = useGlobalGetMutation("/posts", {
    onSuccess: (res: any) => {
      if (res.statusCode == 200) {
        setPosts(res.data.list);
        setPage(res.data.page.currentPage);
        setTotalPage(res.data.page.total);
        setPerPage(res.data.page.perPage);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const { mutateAsync: fetchTags } = useGlobalGetMutation("/tags/dropdown", {
    onSuccess: (res: any) => {
      if (res.statusCode == 200) {
        setTagsList(res.data);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const goToDetail = (item: any) => {
    navigate(`/post/${item.uuid}`);
  };

  const selectTagHandler = (values: any) => {
    if (values.length > 0) {
      const select = values.map((item: any) => item.label);
      setSelectTags(select);
      setPage(1);
    } else {
      setSelectTags([]);
    }
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPerPage(pageSize);
  };

  useEffect(() => {
    fetchPosts({ data: { page: page, perPage: perPage, query: selectTags } });
  }, [page, perPage,selectTags]);

  useEffect(() => {
    fetchTags({});
  }, []);

  return (
    <div className="p-8 h-screen pt-20">
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-900 font-bold">Posts</h1>
        <Formik onSubmit={() => {}} initialValues={{ tag: "" }}>
          <Form className="min-w-[200px] max-w-[400px]">
            <Select
              options={tagsList}
              isMulti
              onChange={selectTagHandler}
              placeholder="filter tags"
            />
          </Form>
        </Formik>
      </div>
      {posts.length > 0 ? (
        <div className="bg-blue-100 text-black px-4 py-2 mt-3 rounded-lg">
          {posts?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => goToDetail(item)}
                className={`${
                  index == posts.length - 1 ? "" : "border-b"
                } hover:text-blue-500 transition duration-200  border-white py-2 cursor-pointer`}
              >
                <div className="flex gap-1">
                  <h1 className="font-semibold">{item.title}</h1>
                  {item.tags.map((tag: any,index:number) => (
                    <div key={index} className="rounded-xl px-3 text-[12px] bg-blue-400 text-white ">
                      {tag.name}
                    </div>
                  ))}
                </div>
                <p>{item.postedBy}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="text-center font-semibold text-2xl">No Found Post</h2>
      )}
      <div className="flex justify-end mt-10">
        <Pagination
          current={page}
          onChange={(page: any) => {
            setPage(page);
          }}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={page}
          total={totalPage}
        />
      </div>
    </div>
  );
};

export default List;
