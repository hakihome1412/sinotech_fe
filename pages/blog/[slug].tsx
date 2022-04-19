/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import { GetStaticProps, NextPage } from "next";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import PortableText from "react-portable-text";
import { BlogItem } from "../../models";
import { sanityClient } from "../../sanity";
import { Formik } from "formik";
import * as Yup from "yup";

type Props = {
  blogsNews: BlogItem[];
  blogMain: BlogItem;
};

type CommentForm = {
  title: string;
  name: string;
  email: string;
  comment: string;
};

const Blog: NextPage<Props> = (props: Props) => {
  const { blogsNews, blogMain } = props;
  const [commentSubmitted, setCommentSubmitted] = useState<boolean>(false);

  const INITIAL_VALUES: CommentForm = useMemo(
    () => ({
      title: "",
      name: "",
      email: "",
      comment: "",
      _id: blogMain._id,
    }),
    [blogMain._id]
  );

  const SCHEMA = useMemo(
    () =>
      Yup.object().shape({
        title: Yup.string().required("- Vui lòng nhập Tiêu đề"),
        name: Yup.string().required("- Vui lòng nhập Tên hiển thị"),
        email: Yup.string()
          .email("- Email không hợp lệ")
          .required("- Vui lòng nhập Email"),
        comment: Yup.string().required("- Vui lòng nhập Bình luận"),
      }),
    []
  );

  const handleSubmitForm = useCallback((values: CommentForm): void => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then(() => {
        setCommentSubmitted(true);
      })
      .catch(() => {
        setCommentSubmitted(false);
      });
  }, []);

  return useMemo(
    () => (
      <Container>
        <BlogsStyled>
          <h2>{blogMain.title}</h2>

          <div className="d-flex align-items-center">
            <img src="/favicon.ico" alt="img" width={50} height={50} />
            <span className="ms-3">
              Được đăng bởi <span className="text-bold">Sinotech Team</span> vào
              lúc {new Date(blogMain._createdAt).toLocaleString()}
            </span>
          </div>

          <div className="content mt-4">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={blogMain.description}
            />
          </div>

          <hr className="my-3" />

          <div className="comment-area-container">
            {commentSubmitted ? (
              <div className="submit-comment-container">
                <h3 className="text-bolder">
                  Cảm ơn bạn đã bình luận vào blog này!
                </h3>
                <span>Bình luận sẽ được duyệt và hiện ở bên dưới.</span>
              </div>
            ) : (
              <div>
                <h3>Vui lòng để lại bình luận bên dưới</h3>
                <Formik
                  initialValues={INITIAL_VALUES}
                  validationSchema={SCHEMA}
                  onSubmit={handleSubmitForm}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                  }): JSX.Element => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                          name="title"
                          placeholder="Nhập tiêu đề"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                          name="name"
                          placeholder="Nhập họ và tên"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          placeholder="Nhập email"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                          rows={5}
                          as="textarea"
                          name="comment"
                          placeholder="Nhập bình luận"
                          value={values.comment}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <div className="error-area">
                        {errors.title && <p>{errors.title}</p>}
                        {errors.name && <p>{errors.name}</p>}
                        {errors.email && <p>{errors.email}</p>}
                        {errors.comment && <p>{errors.comment}</p>}
                      </div>

                      <Button variant="primary" type="submit">
                        Xác nhận
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            <div className="accepted-comment-area mt-5">
              <h3>Bình luận</h3>
              <hr />

              {blogMain.comments.length > 0 ? (
                blogMain.comments.map((item, index) => (
                  <p key={index}>
                    <span className="comment-name-text me-4">{item.name}</span>
                    {item.comment}
                  </p>
                ))
              ) : (
                <span>Chưa có bình luận nào</span>
              )}
            </div>
          </div>
        </BlogsStyled>
      </Container>
    ),
    [
      INITIAL_VALUES,
      SCHEMA,
      blogMain._createdAt,
      blogMain.comments,
      blogMain.description,
      blogMain.title,
      commentSubmitted,
      handleSubmitForm,
    ]
  );
};

export default Blog;

export const getStaticPaths = async () => {
  const query = `*[_type == 'blog']{_id, slug{ current }}`;

  const blogs: BlogItem[] = await sanityClient.fetch(query);

  const paths = blogs.map((item: BlogItem) => ({
    params: {
      slug: item.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryMainBlog = `*[_type == 'blog' && slug.current == "${params?.slug}"][0]{
    _id,
    _createdAt,
    title,
    description,
    logo,
    slug,
    blurb,
    'comments' : *[_type == 'comment' && blog._ref == ^._id && approval == true]
  }`;
  const queryBlogNews = `*[_type == 'blog'][0...5]`;

  const blogsNews: BlogItem[] = await sanityClient.fetch(queryBlogNews);
  const blogMain: BlogItem = await sanityClient.fetch(queryMainBlog);

  if (!blogMain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogsNews,
      blogMain,
    },
  };
};

const BlogsStyled = styled.div`
  margin-top: 2rem;
  .content {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      font-family: "object-fit: cover;";
      margin-left: auto;
      margin-right: auto;
    }
  }

  .comment-area-container {
    .error-area {
      color: red;
    }
    .accepted-comment-area {
      .comment-name-text {
        color: #fe4e16;
        font-weight: bolder;
      }
    }

    .submit-comment-container {
      background-color: #fe4e16;
      padding: 1rem;
      color: white;
      .text-bolder {
        font-weight: bolder;
      }
    }
  }
`;
